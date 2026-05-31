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

function makeVepolSvg(data) {
  return `<div class="functional-vepol" style="max-width: 920px; margin: 24px 0;">
<svg viewBox="0 0 960 360" width="100%" role="img" aria-label="Функциональный веполь" style="display: block; max-width: 100%; height: auto;">
  <defs>
    <marker id="vepol-arrow" markerWidth="28" markerHeight="28" refX="24" refY="14" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M4,4 L24,14 L4,24 Z" fill="#2f2f2f" />
    </marker>
  </defs>
  <style>
    .vepol-title { font: 700 34px Georgia, "Times New Roman", serif; fill: #1f1f1f; }
    .vepol-sub { font: 28px Georgia, "Times New Roman", serif; fill: #1f1f1f; }
    .vepol-value { font: 28px Georgia, "Times New Roman", serif; fill: #1f1f1f; }
    .vepol-arrow { stroke: #303030; stroke-width: 7; stroke-linecap: square; marker-end: url(#vepol-arrow); }
    .vepol-label { font: italic 24px Georgia, "Times New Roman", serif; fill: #c71818; }
    .vepol-prod-label { font: italic 24px Georgia, "Times New Roman", serif; fill: #1f1f1f; }
  </style>
  <text x="315" y="56" text-anchor="middle" class="vepol-title">П2</text>
  <text x="315" y="96" text-anchor="middle" class="vepol-sub">поле взаимодействия</text>
  <text x="315" y="132" text-anchor="middle" class="vepol-value">(${esc(data.field_out)})</text>
  <text x="770" y="56" text-anchor="middle" class="vepol-title">П1</text>
  <text x="770" y="96" text-anchor="middle" class="vepol-sub">поле взаимодействия</text>
  <text x="770" y="132" text-anchor="middle" class="vepol-value">(${esc(data.field_in)})</text>
  <text x="120" y="292" text-anchor="middle" class="vepol-title">В1</text>
  <text x="120" y="330" text-anchor="middle" class="vepol-sub">(изделие)</text>
  <text x="120" y="356" text-anchor="middle" class="vepol-value">${esc(data.object)}</text>
  <text x="505" y="292" text-anchor="middle" class="vepol-title">В2</text>
  <text x="505" y="330" text-anchor="middle" class="vepol-sub">(инструмент)</text>
  <text x="505" y="356" text-anchor="middle" class="vepol-value">${esc(data.tool)}</text>
  <line x1="210" y1="160" x2="155" y2="242" class="vepol-arrow"></line>
  <text x="183" y="210" text-anchor="middle" transform="rotate(-58 183 210)" class="vepol-label">${esc(data.action)}</text>
  <line x1="505" y1="240" x2="455" y2="158" class="vepol-arrow"></line>
  <text x="525" y="198" text-anchor="middle" transform="rotate(58 525 198)" class="vepol-prod-label">производит</text>
  <line x1="655" y1="160" x2="585" y2="242" class="vepol-arrow"></line>
  <text x="625" y="207" text-anchor="middle" transform="rotate(-50 625 207)" class="vepol-label">воздействие</text>
</svg>
</div>`
}

function makeVepolBlock(data) {
  return `<!-- AUTO-VEPOL:START -->

## Функциональный веполь

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
