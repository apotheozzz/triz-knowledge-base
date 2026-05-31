import fs from "fs"
import path from "path"
import { parse } from "yaml"

const contentDir = "content"

function walk(dir) {
  let files = []
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) files = files.concat(walk(full))
    else if (full.endsWith(".md")) files.push(full)
  }
  return files
}

function normalizeYamlValue(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeYamlValue).filter(Boolean).join(", ")
  }

  if (value == null) return ""

  return String(value).trim()
}

function esc(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function conjugateRussianVerb(word) {
  const lower = word.toLowerCase()
  let result = ""

  if (lower.endsWith("ировать")) result = `${lower.slice(0, -7)}ирует`
  else if (lower.endsWith("овать")) result = `${lower.slice(0, -5)}ует`
  else if (lower.endsWith("ить")) result = `${lower.slice(0, -3)}ит`
  else if (
    lower.endsWith("ать") ||
    lower.endsWith("ять") ||
    lower.endsWith("еть")
  ) {
    result = `${lower.slice(0, -2)}ет`
  } else {
    return word
  }

  return /^[А-ЯЁ]/.test(word) ? result[0].toUpperCase() + result.slice(1) : result
}

function actionVerb(value) {
  return String(value || "").replace(/[А-Яа-яЁё-]+/g, conjugateRussianVerb)
}

function capitalizeFirstWord(value) {
  const text = String(value || "").trim().toLowerCase()
  return text ? text[0].toUpperCase() + text.slice(1) : ""
}

function wrapWords(value, maxLength) {
  const words = String(value || "").trim().split(/\s+/).filter(Boolean)
  const lines = []

  for (const word of words) {
    const last = lines[lines.length - 1]

    if (!last || `${last} ${word}`.length > maxLength) {
      lines.push(word)
    } else {
      lines[lines.length - 1] = `${last} ${word}`
    }
  }

  return lines.length ? lines : [""]
}

function wrappedText(value, x, y, className, maxLength, lineHeight = 34) {
  const lines = wrapWords(value, maxLength)

  return lines
    .map(
      (line, index) =>
        `  <text x="${x}" y="${y + index * lineHeight}" text-anchor="middle" class="${className}">${esc(line)}</text>`
    )
    .join("\n")
}

function makeVepolSvg(data) {
  const action = actionVerb(data.action)
  const fieldOut = capitalizeFirstWord(data.field_out)
  const fieldIn = capitalizeFirstWord(data.field_in)
  const objectText = wrappedText(capitalizeFirstWord(data.object), 220, 292, "vepol-object", 14)
  const toolText = wrappedText(capitalizeFirstWord(data.tool), 570, 292, "vepol-object", 14)

  return `<div class="functional-vepol" style="max-width: 1040px; margin: 24px 0;">
<svg viewBox="0 0 1120 360" width="100%" role="img" aria-label="Вепольно-функциональная формула эффекта" style="display: block; max-width: 100%; height: auto;">
  <defs>
    <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="0" refY="2" orient="auto" markerUnits="strokeWidth">
      <path d="M 0 0 L 4 2 L 0 4 z" fill="#333" />
    </marker>
  </defs>
  <style>
    .vepol-field { font: 700 32px Georgia, "Times New Roman", serif; fill: #1f1f1f; }
    .vepol-sub { font: 26px Georgia, "Times New Roman", serif; fill: #1f1f1f; }
    .vepol-object { font: 700 30px Georgia, "Times New Roman", serif; fill: #1f1f1f; }
    .vepol-verb { font: italic 20px Georgia, "Times New Roman", serif; fill: #1f1f1f; }
  </style>
  <text x="360" y="70" text-anchor="middle" class="vepol-field">${esc(fieldOut)}</text>
  <text x="360" y="106" text-anchor="middle" class="vepol-sub">поле взаимодействия</text>
  <text x="790" y="70" text-anchor="middle" class="vepol-field">${esc(fieldIn)}</text>
  <text x="790" y="106" text-anchor="middle" class="vepol-sub">поле взаимодействия</text>
${objectText}
${toolText}
  <line x1="302" y1="117" x2="232" y2="237" stroke="#333" stroke-width="6" stroke-linecap="butt" stroke-linejoin="miter" marker-end="url(#arrowhead)"></line>
  <text x="238" y="178" text-anchor="middle" transform="rotate(-60 238 178)" class="vepol-verb">${esc(action)}</text>
  <line x1="500" y1="258" x2="430" y2="138" stroke="#333" stroke-width="6" stroke-linecap="butt" stroke-linejoin="miter" marker-end="url(#arrowhead)"></line>
  <text x="492" y="190" text-anchor="middle" transform="rotate(60 492 190)" class="vepol-verb">производит</text>
  <line x1="722" y1="117" x2="652" y2="237" stroke="#333" stroke-width="6" stroke-linecap="butt" stroke-linejoin="miter" marker-end="url(#arrowhead)"></line>
  <text x="662" y="178" text-anchor="middle" transform="rotate(-60 662 178)" class="vepol-verb">воздействует</text>
</svg>
</div>`
}

function makeVepolBlock(data) {
  return `<!-- AUTO-VEPOL:START -->

## Вепольно-функциональная формула эффекта

${makeVepolSvg(data)}

<!-- AUTO-VEPOL:END -->
`
}

for (const file of walk(contentDir)) {
  const text = fs.readFileSync(file, "utf8")

  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!fm) continue

  const yaml = parse(fm[1]) || {}

  const data = {
    tool: normalizeYamlValue(yaml.tool),
    action: normalizeYamlValue(yaml.action),
    object: normalizeYamlValue(yaml.object),
    field_in: normalizeYamlValue(yaml.field_in),
    field_out: normalizeYamlValue(yaml.field_out),
  }

  if (!data.tool || !data.action || !data.object || !data.field_in || !data.field_out) continue

  const block = makeVepolBlock(data)

  let next = text.replace(
    /<!-- AUTO-VEPOL:START -->[\s\S]*?<!-- AUTO-VEPOL:END -->\n?/,
    ""
  )

  const trizSection = next.match(/^##\s+ТРИЗ-анализ\s*$/m)

if (trizSection) {
  const sectionStart = trizSection.index + trizSection[0].length

  const afterTriz = next.slice(sectionStart)

  const nextHeading = afterTriz.search(/^##\s+/m)

  let insertPos

  if (nextHeading !== -1) {
    insertPos = sectionStart + nextHeading
  } else {
    insertPos = next.length
  }

  next = next.slice(0, insertPos).trimEnd() + "\n\n" + block + "\n" + next.slice(insertPos).trimStart()
} else {
  next = next.slice(0, fm[0].length) + block + "\n" + next.slice(fm[0].length)
}

  fs.writeFileSync(file, next, "utf8")
  console.log("Функциональный веполь обновлён:", file)
}
