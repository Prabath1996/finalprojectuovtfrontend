import React from 'react'

const FormattedText = ({ text }) => {
  const parseInlineFormatting = (content, key) => {
    const elements = []
    let lastIndex = 0

    // Handle all inline markdown patterns: **bold**, __bold__, ~~strikethrough~~
    const inlineRegex = /\*\*(.*?)\*\*|__(.*?)__|~~(.*?)~~/g
    let match

    while ((match = inlineRegex.exec(content)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        elements.push(
          <span key={`${key}-text-${lastIndex}`}>
            {content.substring(lastIndex, match.index)}
          </span>
        )
      }

      // Add the formatted text
      const formattedContent = match[1] || match[2] || match[3]
      if (match[0].includes('~~')) {
        elements.push(
          <span
            key={`${key}-strikethrough-${match.index}`}
            className="line-through"
          >
            {formattedContent}
          </span>
        )
      } else {
        elements.push(
          <span
            key={`${key}-bold-${match.index}`}
            className="font-semibold"
          >
            {formattedContent}
          </span>
        )
      }

      lastIndex = inlineRegex.lastIndex
    }

    // Add remaining text
    if (lastIndex < content.length) {
      elements.push(
        <span key={`${key}-text-end`}>
          {content.substring(lastIndex)}
        </span>
      )
    }

    return elements.length > 0 ? elements : [content]
  }

  const parseText = (content) => {
    const lines = content.split('\n')

    return lines.map((line, lineIndex) => {
      // Skip empty lines
      if (!line.trim()) {
        return <div key={lineIndex} className="mb-2" />
      }

      // Check if line starts with # or ## or ### (heading)
      const headingMatch = line.match(/^(#{1,4})\s+(.*)$/)
      if (headingMatch) {
        const headingLevel = headingMatch[1].length
        const headingText = headingMatch[2]
        const headingClasses =
          headingLevel === 1
            ? 'font-bold text-lg mt-3 mb-2'
            : headingLevel === 2
              ? 'font-bold text-base mt-2.5 mb-1.5'
              : 'font-bold text-base mt-2 mb-1'

        return (
          <div key={lineIndex} className={headingClasses}>
            {parseInlineFormatting(headingText, `${lineIndex}-heading`)}
          </div>
        )
      }

      // Check if line starts with - or * (list item)
      if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
        const listItemText = line.replace(/^[\s-*]+/, '').trim()
        return (
          <div key={lineIndex} className="flex gap-2 ml-4 mb-1">
            <span className="flex-shrink-0">•</span>
            <span className="flex-1">
              {parseInlineFormatting(listItemText, `${lineIndex}-list`)}
            </span>
          </div>
        )
      }

      // Check if line starts with a number (numbered list)
      const numberedMatch = line.match(/^\d+\.\s+(.*)$/)
      if (numberedMatch) {
        const itemText = numberedMatch[1]
        return (
          <div key={lineIndex} className="flex gap-2 ml-4 mb-1">
            <span className="flex-shrink-0">{line.match(/^\d+\./)[0]}</span>
            <span className="flex-1">
              {parseInlineFormatting(itemText, `${lineIndex}-numbered`)}
            </span>
          </div>
        )
      }

      // Regular paragraph with inline formatting
      return (
        <div key={lineIndex} className="mb-1 leading-relaxed">
          {parseInlineFormatting(line, `${lineIndex}-para`)}
        </div>
      )
    })
  }

  return <div className="space-y-1">{parseText(text)}</div>
}

export default FormattedText
