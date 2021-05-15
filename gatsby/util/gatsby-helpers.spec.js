import {
  generateAnswerListFromQuestions,
  generateAnswerMapFromList,
  generatePageInfoFromQuestions,
} from "./gatsby-helpers"

describe("generatePageInfoFromQuestions", () => {
  it("returns [] for empty array", () => {
    const result = generatePageInfoFromQuestions([])
    expect(result).toEqual([])
  })

  it("returns page info if one question and one answer", () => {
    const result = generatePageInfoFromQuestions([
      {
        answers: [
          {
            slug: {
              current: "south",
            },
          },
        ],
      },
    ])

    expect(result[0]).toMatchObject({
      url: "/south",
    })
  })
})

describe("generateAnswerListFromQuestions", () => {
  it("returns [] for empty array", () => {
    const result = generateAnswerListFromQuestions([])
    expect(result).toEqual([])
  })

  it("returns page info if one question and one answer", () => {
    const result = generateAnswerListFromQuestions([
      {
        answers: [
          {
            slug: {
              current: "south",
            },
          },
        ],
      },
    ])

    expect(result).toEqual([["south"]])
  })

  it("returns page info for complex question and answer list", () => {
    const result = generateAnswerListFromQuestions([
      {
        answers: [
          {
            slug: {
              current: "north",
            },
          },
          {
            slug: {
              current: "south",
            },
          },
        ],
      },
      {
        answers: [
          {
            slug: {
              current: "short",
            },
          },
          {
            slug: {
              current: "long",
            },
          },
        ],
      },
    ])

    expect(result).toEqual([
      ["north", "south"],
      ["short", "long"],
    ])
  })
})

describe("generateAnswerMapFromList", () => {
  it("handles single item", () => {
    expect(generateAnswerMapFromList([["south"]])).toEqual([["south"]])
  })

  it("handles 2x2", () => {
    expect(
      generateAnswerMapFromList([
        ["north", "south"],
        ["short", "long"],
      ])
    ).toEqual([
      ["north"],
      ["south"],
      ["north", "short"],
      ["south", "short"],
      ["north", "long"],
      ["south", "long"],
    ])
  })

  it("handles 3x2", () => {
    expect(
      generateAnswerMapFromList([
        ["north", "south"],
        ["short", "long"],
        ["easy", "hard"],
      ])
    ).toEqual([
      ["north"],
      ["south"],
      ["north", "short"],
      ["south", "short"],
      ["north", "long"],
      ["south", "long"],
      ["north", "short", "easy"],
      ["south", "short", "easy"],
      ["north", "long", "easy"],
      ["south", "long", "easy"],
      ["north", "short", "hard"],
      ["south", "short", "hard"],
      ["north", "long", "hard"],
      ["south", "long", "hard"],
    ])
  })
})
