const { generatePageInfoFromQuestions } = require("./util/gatsby-helpers")
const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        settings: allSanitySetting {
          nodes {
            questions {
              id
            }
          }
        }
        questions: allSanityQuestion {
          nodes {
            id
            answers {
              id
              slug {
                current
              }
            }
          }
        }
      }
    `
  )

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const sortedQuestions = result.data.settings.nodes[0].questions.map(
    ({ id }) =>
      result.data.questions.nodes.find((question) => question.id === id)
  )

  const pageTemplate = path.resolve("src/templates/page.js")
  const pagesToBuild = generatePageInfoFromQuestions(sortedQuestions)

  reporter.info(`Building ${pagesToBuild.length} filter pages`)

  pagesToBuild.forEach(({ url, tags }) => {
    createPage({
      path: url,
      component: pageTemplate,
      context: {
        tags,
      },
    })
  })

  // might need to change this to a start page and different URL to begin!
  createPage({
    path: "/",
    component: pageTemplate,
    context: {
      tags: [],
    },
  })
  reporter.info(`Filter pages built`)
}
