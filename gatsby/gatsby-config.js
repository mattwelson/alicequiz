const dotenv = require("dotenv")

dotenv.config()

module.exports = {
  siteMetadata: {
    title: "quiz.aliceadventuring.com",
  },
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: process.env.SANITY_PROJECTID,
        dataset: process.env.SANITY_DATASET,
        token: process.env.SANITY_TOKEN,
        watchMode: !!process.env.SANITY_TOKEN,
        overlayDrafts: !!process.env.SANITY_TOKEN,
      },
    },
    {
      resolve: "gatsby-plugin-sanity-image",
      options: {
        projectId: process.env.SANITY_PROJECTID,
        dataset: process.env.SANITY_DATASET,
      },
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-EESBPWDYR3",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `util/typography`,
      },
    },
  ],
}
