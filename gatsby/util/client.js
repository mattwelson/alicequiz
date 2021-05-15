const client = require('@sanity/client')({
  projectId: process.env.SANITY_PROJECTID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
})
