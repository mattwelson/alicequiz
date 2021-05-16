import React from "react"
import { Helmet } from "react-helmet"
import styled from "styled-components"

const LayoutStyles = styled.div`
  width: 90%;
  max-width: ${({ narrow }) => (narrow ? "20rem" : "40rem")};
  display: grid;
  margin: 2rem auto 0;
`

export default function Layout({ children }) {
  return (
    <LayoutStyles>
      <Helmet>
        <title>Alice's Adventuring Quiz</title>
      </Helmet>
      {children}
    </LayoutStyles>
  )
}
