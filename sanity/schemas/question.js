import { MdQuestionAnswer as icon } from "react-icons/md"

export default {
  name: "question",
  title: "Question",
  type: "document",
  icon,
  fields: [
    {
      name: "title",
      tile: "Title",
      type: "string",
      description: "Text for question (add question mark)",
    },
    {
      name: "answers",
      title: "Answers",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "answer",
            },
          ],
        },
      ],
      options: {
        layout: "tags",
      },
    },
  ],
}
