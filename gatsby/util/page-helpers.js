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
