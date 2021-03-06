import { Link } from "gatsby"
import SanityImage from "gatsby-plugin-sanity-image"
import React from "react"
import styled from "styled-components"

const TextStyles = styled.h3`
  font-family: "Pacifico";
  font-weight: normal;

  background-color: #059669;
  transition: background-color 0.2s linear;
  padding: 1rem;
  margin: 0;
  text-align: center;

  a:hover & {
    background-color: #10b981;
  }
`

const StyledLink = styled((props) => <Link {...props} />)`
  text-decoration: none;

  display: grid;
  margin-bottom: 1rem;
`

export default function AnswerDisplay({ title, slug, image }) {
  return (
    <StyledLink to={slug.current}>
      <TextStyles>{title}</TextStyles>
      {image && <SanityImage {...image} width={500} height={300} alt={title} />}
    </StyledLink>
  )
}
