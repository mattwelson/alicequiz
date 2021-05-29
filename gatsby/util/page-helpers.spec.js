const {
  filterPostsWithMatchingTags,
  filterAnswersBasedOnPosts,
  findQuestions
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

const fakeSlugs = (slugs) => slugs.map(current => ({ slug: { current } }))
describe('findQuestions', () => {
  const questions = [{
    answers: fakeSlugs(['north-island', 'south-island'])
  },
  {
    answers: fakeSlugs(['day-walk', 'overnight'])
  },
  {
    answers: fakeSlugs(['easy', 'hard'])
  },
  {
    answers: fakeSlugs(['lakes', 'mountains'])
  }]
  const posts = [
    {
      tags: fakeSlugs(['north-island', 'day-walk', 'easy', 'lakes'])
    },
    {
      tags: fakeSlugs(['north-island', 'overnight', 'easy', 'lakes'])
    },
    {
      tags: fakeSlugs(['north-island', 'day-walk', 'easy', 'mountains'])
    },
    {
      tags: fakeSlugs(['north-island', 'day-walk', 'hard', 'lakes'])
    },
    {
      tags: fakeSlugs(['north-island', 'day-walk', 'hard', 'mountains'])
    },
    {
      tags: fakeSlugs(['south-island', 'day-walk', 'hard', 'lakes'])
    },
    {
      tags: fakeSlugs(['south-island', 'day-walk', 'hard', 'mountains'])
    },
  ]

  it('Selects first question if no answers yet', () => {
    const result = findQuestions(questions, [], posts)
    expect(result.question.answers[0].slug.current).toBe('north-island')
    expect(result.posts).toHaveLength(7)
  })

  it('Selects second question if first chosen', () => {
    const result = findQuestions(questions, ['north-island'], posts)
    expect(result.question.answers[0].slug.current).toBe('day-walk')
    expect(result.posts).toHaveLength(5)
  })

  it('Returns match posts and no questions', () => {
    const result = findQuestions(questions, ['north-island', 'day-walk', 'lakes'], posts)
    expect(result.question).toBeUndefined()
    expect(result.posts).toHaveLength(2)
  })

  it('Can skip a question', () => {
    const result = findQuestions(questions, ['north-island', 'easy'], posts)
    expect(result.question.answers[0].slug.current).toBe('lakes')
  })
})
