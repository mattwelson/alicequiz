import { MdHome as icon } from "react-icons/md"

export default {
  name: "setting",
  title: "Home",
  type: "document",
  icon,
  fields: [
    {
      name: "questions",
      title: "Question Order",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "question",
            },
          ],
        },
      ],
    },
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
    },
  ],
}
