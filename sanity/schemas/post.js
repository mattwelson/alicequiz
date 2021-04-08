import { MdLibraryBooks as icon } from 'react-icons/md'

export default {
  name: 'post',
  title: 'Posts',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      tile: 'Title',
      type: 'string',
      description: 'Title of the blog post',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
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
