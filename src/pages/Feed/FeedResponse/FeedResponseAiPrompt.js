export function getPrompt(feed, responses) {
  const resultArr = []
  for (let i = 0; i < responses.length; i++) {
    resultArr.push(getTextForRes(responses[i], i))
  }

  const resultText = `
*This is my feed*:
\`\`\`
Title: ${feed.title}
Text: ${feed.text}
\`\`\`

*Summarize all of the following responses into a single brief summary*:
\`\`\`
${resultArr.join('\n').trim()}
\`\`\`
`

  return resultText.trim()
}

function getTextForRes(response, i) {
  const resultText = `
id: ${i + 1}
created at: ${response.created_at}
text: ${response.text}
  `
  return resultText
}
