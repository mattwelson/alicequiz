import { MdLibraryBooks as icon } from "react-icons/md"

export default {
  name: "post",
  title: "Posts",
  type: "document",
  icon,
  fields: [
    {
      name: "title",
      tile: "Title",
      type: "string",
      description: "Title of the blog post",
    },
    {
      name: "url",
      title: "URL",
      type: "url",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "tags",
      title: "Tags",
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
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
}
