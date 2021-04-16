exports.generatePageInfoFromQuestions = function (sortedQuestions) {
  if (!sortedQuestions?.length > 0) return []

  const answerTree = generateAnswerMapFromList(
    generateAnswerListFromQuestions(sortedQuestions)
  )

  // do some looping or whiling here
  return answerTree.map((tags) => ({ url: arrayToUrl(tags), tags }))
}

function generateAnswerListFromQuestions(sortedQuestions) {
  if (!sortedQuestions?.length > 0) return []

  return sortedQuestions.map(({ answers }) =>
    answers.map(({ slug: { current } }) => current)
  )
}

exports.generateAnswerListFromQuestions = generateAnswerListFromQuestions

function generateAnswerMapFromList(nodes) {
  if (!nodes?.length) return []
  let result = [],
    previousNodes = [[]]
  nodes.forEach((answers) => {
    let tempNodes = []
    answers.forEach((a) =>
      previousNodes.forEach((p) => tempNodes.push([...p, a]))
    )
    previousNodes = tempNodes
    result.push(...previousNodes)
  })
  return result
}

exports.generateAnswerMapFromList = generateAnswerMapFromList

function arrayToUrl(parts) {
  return `/${parts.join("/")}`
}

exports.arrayToUrl = arrayToUrl
