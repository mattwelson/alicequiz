import { MdFeedback as icon } from 'react-icons/md'

export default {
  name: 'answer',
  title: 'Answer',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      tile: 'Title',
      type: 'string',
      description: 'Text for answer',
    },
    {
      name: 'slug',
      title: 'Slug fragment',
      type: 'slug',
      description: 'Used to build a URL for combinations of answers',
      options: {
        source: 'title',
        maxLength: 20,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
