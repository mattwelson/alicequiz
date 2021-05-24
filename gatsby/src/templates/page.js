import React from "react"
import { graphql } from "gatsby"
import { Redirect } from "@reach/router"
import {
  filterPostsWithMatchingTags,
  filterAnswersBasedOnPosts,
} from "../../util/page-helpers"
import PostDisplay from "../components/PostDisplay"
import Layout from "../components/Layout"
import AnswerDisplay from "../components/AnswerDisplay"

export default function QuestionPage({ data, pageContext, location }) {
  //console.log({ pageContext, data })
  const [settings] = data.settings.nodes
  const question = settings.questions[pageContext.tags.length]
  const pageTags = pageContext.tags

  // filter posts on page tag
  const pagePosts = filterPostsWithMatchingTags(data.posts.nodes, pageTags)
  //console.log({ pagePosts })

  // if no current question then show the posts that match the filters!
  // filter posts down and show results!
  if (!question)
    // TODO: Display slightly differently if more than one?
    // TODO: What if there's none?! Shouldn't be possible but untested
    return (
      <Layout>
        {pagePosts.map((post) => (
          <PostDisplay {...post} key={post.title}></PostDisplay>
        ))}
      </Layout>
    )

  // determine which answers still have posts at the end
  const filteredAnswers = filterAnswersBasedOnPosts(question.answers, pagePosts)

  // TODO: change this so the redirect is not needed - flashes at the moment
  // if only one then redirect to that answer
  //console.log({ filteredAnswers })
  if (filteredAnswers.length === 1) {
    return (
      <Redirect
        to={`${location.pathname}/${filteredAnswers[0].slug.current}`}
      />
    )
  }

  return (
    <Layout narrow>
      <h2>{question.title}</h2>
      {filteredAnswers.map((answer) => (
        <AnswerDisplay {...answer} key={answer.slug.current} />
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
            image {
              ...ImageWithPreview
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
