import React from "react"
import { Helmet } from "react-helmet"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"

const LayoutStyles = styled.div`
  width: 90%;
  max-width: ${({ narrow }) => (narrow ? "20rem" : "40rem")};
  display: grid;
  margin: 2rem auto 0;
`

const theme = {
  color: {
    bg: "#111827",
    text: "white",
    link: "#DBEAFE",
  },
}

const GlobalStyles = createGlobalStyle`
body {
  background: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
}

a {
  color: ${({ theme }) => theme.color.link};
}
`

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <LayoutStyles>
        <Helmet>
          <title>Alice's Adventuring Quiz</title>
        </Helmet>
        {children}
      </LayoutStyles>
    </ThemeProvider>
  )
}
