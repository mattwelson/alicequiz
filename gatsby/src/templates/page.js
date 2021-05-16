import React from "react"
import { graphql, Link } from "gatsby"

import {
  filterPostsWithMatchingTags,
  filterAnswersBasedOnPosts,
} from "../../util/page-helpers"
import PostDisplay from "../components/PostDisplay"
import Layout from "../components/Layout"

export default function QuestionPage({ data, pageContext }) {
  console.log({ pageContext, data })
  const [settings] = data.settings.nodes
  const question = settings.questions[pageContext.tags.length]
  const pageTags = pageContext.tags

  // filter posts on page tag
  const pagePosts = filterPostsWithMatchingTags(data.posts.nodes, pageTags)
  console.log({ pagePosts })

  // if no current question then show the posts that match the filters!
  // filter posts down and show results!
  if (!question)
    // TODO: Display slightly differently if more than one?
    // TODO: What if there's none?!
    return (
      <Layout>
        {pagePosts.map((post) => (
          <PostDisplay {...post} key={post.title}></PostDisplay>
        ))}
      </Layout>
    )

  // determine which answers still have posts at the end
  const filteredAnswers = filterAnswersBasedOnPosts(question.answers, pagePosts)

  // TODO: if only one then redirect to that answer
  console.log({ filteredAnswers })

  return (
    <Layout>
      <h2>{question.title}</h2>
      {filteredAnswers.map(({ slug, title }) => (
        <Link to={slug.current} key={slug.current}>
          <h3>{title}</h3>
        </Link>
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query QUERY_PAGE {
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
    posts: allSanityPost {
      nodes {
        title
        tags {
          slug {
            current
          }
        }
        image {
          ...ImageWithPreview
        }
        url
        _rawDescription(resolveReferences: { maxDepth: 5 })
      }
    }
  }
`
