import PropTypes from "prop-types"
import SanityImage from "gatsby-plugin-sanity-image"
import React from "react"
import { Link } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"

export default function PostDisplay({ title, image, url, _rawDescription }) {
  return (
    <div key={title}>
      <a href={url} target='_blank' rel='noreferrer nofollow'>
        <h1>{title}</h1>
      </a>
      <SanityImage {...image} width={500} height={300} alt={title} />
      {_rawDescription && <BlockContent blocks={_rawDescription} />}
      <a href={url} target='_blank' rel='noreferrer nofollow'>
        Read post
      </a>
      <Link to='/'>Start again</Link>
    </div>
  )
}

PostDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  url: PropTypes.string.isRequired,
}
