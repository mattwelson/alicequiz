export function filterPostsWithMatchingTags(posts, pageTags = []) {
  // filter posts on page tag
  return pageTags.length
    ? posts.filter((post) =>
      pageTags.every((tag) => post.tags.some((t) => t.slug.current === tag))
    )
    : posts
}

export function filterAnswersBasedOnPosts(answers, posts) {
  // determine which answers still have posts at the end
  return answers.filter((answer) =>
    // filter filtered posts on this answers slug too
    posts.some((p) =>
      p.tags.some((t) => t.slug.current === answer.slug.current)
    )
  )
}

export function findQuestions(questions, tags, posts) {
  if (tags.length === 0) return { question: questions[0], posts }

  const pagePosts = filterPostsWithMatchingTags(posts, tags)
  const latestAnswer = [...tags].pop()
  const currentQuestion = questions.findIndex(q => q.answers.some(a => a.slug.current === latestAnswer))

  // find the next question with more than one valid answer 
  const nextQuestion = questions.slice(currentQuestion + 1).find(q => filterAnswersBasedOnPosts(q.answers, pagePosts).length > 1)

  return { question: nextQuestion, posts: pagePosts }
}