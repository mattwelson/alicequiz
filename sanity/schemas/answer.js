import { MdFeedback as icon } from "react-icons/md"

export default {
  name: "answer",
  title: "Answer",
  type: "document",
  icon,
  fields: [
    {
      name: "title",
      tile: "Title",
      type: "string",
      description: "Text for answer",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
}
