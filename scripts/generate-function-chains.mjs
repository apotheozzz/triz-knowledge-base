import fs from "fs"
import path from "path"

const contentDir = "content"
const startMarker = "<!-- AUTO-FCHAIN:START -->"
const endMarker = "<!-- AUTO-FCHAIN:END -->"
const hiddenSourceOpen = '<div class="fchain-source" hidden aria-hidden="true">'
const hiddenSourceClose = "</div>"

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

function esc(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
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

function textWidth(value, minWidth = 120, maxWidth = 220) {
  const longestWord = Math.max(...String(value || "").split(/\s+/).map((word) => word.length), 0)
  const byTextLength = String(value || "").length * 8 + 34
  const byWordLength = longestWord * 9 + 34

  return Math.max(minWidth, Math.min(maxWidth, Math.max(byTextLength, byWordLength)))
}

function makeTextLines(value, x, y, className, maxLength, lineHeight = 18) {
  return wrapWords(value, maxLength)
    .slice(0, 4)
    .map(
      (line, index, lines) =>
        `    <text x="${x}" y="${y - ((lines.length - 1) * lineHeight) / 2 + index * lineHeight}" text-anchor="middle" class="${className}">${esc(line)}</text>`
    )
    .join("\n")
}

function parsePipeLine(line) {
  const parts = line.split("|").map((part) => part.trim())
  if (parts.length !== 3 || parts.some((part) => !part)) return null

  return {
    left: parts[0],
    action: parts[1],
    right: parts[2],
  }
}

function isLikelyRussianVerb(word) {
  return /(?:ает|яет|ует|ирует|ывает|ивает|еет|ит|ет|ют|ут|ят|ат)$/i.test(word)
}

function parsePlainLine(line) {
  const words = line.trim().split(/\s+/).filter(Boolean)
  const actionIndex = words.findIndex((word, index) => index > 0 && isLikelyRussianVerb(word))

  if (actionIndex <= 0 || actionIndex >= words.length - 1) return null

  return {
    left: words.slice(0, actionIndex).join(" "),
    action: words[actionIndex],
    right: words.slice(actionIndex + 1).join(" "),
  }
}

function parseFchain(raw) {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => parsePipeLine(line) || parsePlainLine(line))
    .filter(Boolean)
}

function makeChain(links) {
  if (!links.length) return []

  const chain = [links[0].left]

  for (const link of links) {
    chain.push(link.right)
  }

  return chain
}

function hashString(value) {
  let hash = 5381

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index)
  }

  return (hash >>> 0).toString(36)
}

function makeFchainSvg(links, idSuffix) {
  const objects = makeChain(links)
  const boxHeight = 58
  const top = 40
  const objectY = top + 58
  const labelY = top + 22
  const marginX = 24
  const gap = 74
  const widths = objects.map((object) => textWidth(object))
  const height = 132
  const contentWidth = widths.reduce((sum, width) => sum + width, 0) + gap * links.length
  const width = contentWidth + marginX * 2
  const arrowId = `fchain-arrow-${idSuffix}`

  let cursor = marginX
  const boxes = []
  const arrows = []

  for (let index = 0; index < objects.length; index += 1) {
    const object = objects[index]
    const boxWidth = widths[index]
    const x = cursor
    const centerX = x + boxWidth / 2

    boxes.push(`    <rect x="${x}" y="${objectY - boxHeight / 2}" width="${boxWidth}" height="${boxHeight}" class="fchain-box"></rect>`)
    boxes.push(makeTextLines(object, centerX, objectY + 5, "fchain-object", 16))

    if (index < links.length) {
      const nextX = cursor + boxWidth + gap
      const startX = cursor + boxWidth
      const endX = nextX
      const midX = (startX + endX) / 2

      arrows.push(`    <line x1="${startX}" y1="${objectY}" x2="${endX - 8}" y2="${objectY}" class="fchain-arrow" marker-end="url(#${arrowId})"></line>`)
      arrows.push(`    <text x="${midX}" y="${labelY}" text-anchor="middle" class="fchain-action">${esc(links[index].action)}</text>`)
    }

    cursor += boxWidth + gap
  }

  return `<div class="functional-chain" style="max-width: ${width}px; margin: 24px 0; overflow-x: auto;">
<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Функциональная цепочка" style="display: block; max-width: 100%; height: auto;">
  <defs>
    <marker id="${arrowId}" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
      <path d="M 0 0 L 8 4 L 0 8 z" fill="#1f1f1f" />
    </marker>
  </defs>
  <style>
    .fchain-box { fill: #f7f7f2; stroke: #1f1f1f; stroke-width: 1.5; }
    .fchain-arrow { stroke: #1f1f1f; stroke-width: 2; stroke-linecap: square; }
    .fchain-object { font: 700 15px Arial, sans-serif; fill: #1f1f1f; }
    .fchain-action { font: 700 14px Arial, sans-serif; fill: #1f1f1f; }
  </style>
${arrows.join("\n")}
${boxes.join("\n")}
</svg>
</div>`
}

function makeFchainBlock(links, idSuffix) {
  return `${startMarker}
${makeFchainSvg(links, idSuffix)}
${endMarker}
`
}

function replaceFchainBlocks(text, file) {
  const fenceRegex = /(^|\r?\n)(?:<div class="fchain-source" hidden aria-hidden="true">\r?\n)?(?<opening>(?<indent>[ \t]*)(?<fence>`{3,}|\.{3,})fchain[^\r\n]*\r?\n)(?<body>[\s\S]*?)\r?\n(?<closing>\k<indent>\k<fence>[ \t]*)(?:\r?\n<\/div>)?(?=\r?\n|$)/g
  let result = ""
  let cursor = 0
  let changed = false
  let count = 0

  for (const match of text.matchAll(fenceRegex)) {
    const links = parseFchain(match.groups.body)
    const blockEnd = match.index + match[0].length
    const sourceBlock = `${match.groups.opening}${match.groups.body}\n${match.groups.closing}`
    const hiddenSourceBlock = `${match[1]}${hiddenSourceOpen}\n${sourceBlock}\n${hiddenSourceClose}`

    result += text.slice(cursor, match.index) + hiddenSourceBlock
    cursor = blockEnd
    if (hiddenSourceBlock !== text.slice(match.index, blockEnd)) changed = true

    if (!links.length) {
      console.warn(`Функциональная цепочка пропущена: нет корректных строк в ${file}`)
      continue
    }

    const autoBlock = makeFchainBlock(links, hashString(`${file}:${count}:${JSON.stringify(links)}`))
    const after = text.slice(cursor)
    const leadingBreak = after.match(/^\r?\n*/)
    const afterLeadingBreakIndex = cursor + (leadingBreak ? leadingBreak[0].length : 0)
    const restAfterBreak = text.slice(afterLeadingBreakIndex)
    const existingMatch = restAfterBreak.match(new RegExp(`^${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:\\r?\\n)*`))

    if (existingMatch) {
      const replacement = `\n${autoBlock}\n`
      result += replacement
      const oldAutoBlock = text.slice(cursor, afterLeadingBreakIndex + existingMatch[0].length)
      cursor = afterLeadingBreakIndex + existingMatch[0].length
      if (replacement !== oldAutoBlock) changed = true
    } else {
      result += "\n" + autoBlock
      changed = true
    }

    count += 1
  }

  result += text.slice(cursor)

  const boundaryFixed = result.replace(
    new RegExp(`${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\r?\\n(?!\\r?\\n)`, "g"),
    `${endMarker}\n\n`,
  )
  if (boundaryFixed !== result) changed = true

  return { text: boundaryFixed, changed, count }
}

for (const file of walk(contentDir)) {
  const text = fs.readFileSync(file, "utf8")
  const next = replaceFchainBlocks(text, file)

  if (!next.count) continue
  if (!next.changed && next.text === text) continue

  fs.writeFileSync(file, next.text, "utf8")
  console.log("Функциональная цепочка обновлена:", file)
}
