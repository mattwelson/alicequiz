exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    SanityAnswer: {
      posts: {
        type: ['SanityPost'],
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            type: 'SanityPost',
            query: {
              filter: {
                tags: {
                  elemMatch: {
                    _id: {
                      in: [source._id],
                    },
                  },
                },
              },
            },
          })
        },
      },
    },
  })
}
