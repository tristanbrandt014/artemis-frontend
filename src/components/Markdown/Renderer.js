//@flow
import React from "react"
import marked from "marked"
import styled from "styled-components"

marked.setOptions({
  tables: true,
  breaks: true,
  sanitize: true,
  gfm: true
})

type Props = {
  markdown: string
}

const Renderer = (props: Props) => (
  <Styles
    dangerouslySetInnerHTML={{
      __html: marked(props.markdown)
    }}
  />
)

const Styles = styled.div`
  * {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }
`

export default Renderer
