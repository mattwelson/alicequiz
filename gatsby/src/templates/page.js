import React from "react"
import { graphql, Link } from "gatsby"

export default function QuestionPage({ data, pageContext }) {
  console.log({ pageContext, data })
  const [settings] = data.settings.nodes
  const question = settings.questions[pageContext.tags.length]
  const pageTags = pageContext.tags

  // filter posts on page tag
  const pagePosts = !!pageContext.tags.length
    ? data.posts.nodes.filter((post) =>
        // a filtered post needs every single page tag
        pageTags.every((tag) => post.tags.some((t) => t.slug.current === tag))
      )
    : data.posts.nodes

  // if no question then show the posts that match the filters!
  // filter posts down and show results!
  if (!question) return <div>DONE!</div>

  // determine which answers still have posts at the end
  const filteredAnswers = question.answers.filter((answer) => {
    // filter filtered posts on this answers slug too
    const answerPosts = pagePosts.filter((p) =>
      p.tags.some((t) => t.slug.current === answer.slug.current)
    )
    // return length of this array
    return answerPosts.length
  })
  console.log({ filteredAnswers })

  // if only one then redirect to that answer

  return (
    <div>
      <h2>{question.title}</h2>
      {question.answers.map(({ slug, title }) => (
        <Link to={slug.current} key={slug.current}>
          <h3>{title}</h3>
        </Link>
      ))}
    </div>
  )
}

export const pageQuery = graphql`
  query QUERY_PAGE($tags: [String]!) {
    settings: allSanitySetting {
      nodes {
        questions {
          title
          answers {
            title
            slug {
              current
            }
          }
        }
      }
    }
    posts: allSanityPost(
      filter: { tags: { elemMatch: { slug: { current: { in: $tags } } } } }
    ) {
      nodes {
        title
        tags {
          slug {
            current
          }
        }
      }
    }
  }
`
