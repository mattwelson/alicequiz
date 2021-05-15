const {
  filterPostsWithMatchingTags,
  filterAnswersBasedOnPosts,
} = require('./page-helpers')

describe('filterPostsWithMatchingTags', () => {
  const examplePostArray = [
    {
      tags: [
        {
          slug: {
            current: 'north-island',
          },
        },
        {
          slug: {
            current: 'day-walk',
          },
        },
      ],
    },
  ]

  it('returns all posts if tags array is empty', () => {
    const result = filterPostsWithMatchingTags(examplePostArray, [])

    expect(result).toHaveLength(1)
  })

  it('returns no post if pag tag contains tags not in post', () => {
    const result = filterPostsWithMatchingTags(examplePostArray, [
      'south-island',
    ])

    expect(result).toHaveLength(0)
  })
})

describe('filterAnswersBasedOnPosts', () => {
  it('includes matching answer', () => {
    const result = filterAnswersBasedOnPosts(
      [
        {
          slug: {
            current: 'north',
          },
        },
      ],
      [
        {
          tags: [
            {
              slug: {
                current: 'north',
              },
            },
          ],
        },
      ]
    )

    expect(result).toHaveLength(1)
  })

  it('excludes non-matching answer', () => {
    const result = filterAnswersBasedOnPosts(
      [
        {
          slug: {
            current: 'north',
          },
        },
      ],
      [
        {
          tags: [
            {
              slug: {
                current: 'south',
              },
            },
          ],
        },
      ]
    )

    expect(result).toHaveLength(0)
  })
})
