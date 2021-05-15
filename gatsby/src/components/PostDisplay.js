import React from 'react'

export default function PostDisplay({ post }) {
  return (
    <div key={post.title}>
      <h1>{post.title}</h1>
    </div>
  )
}
