//@flow
import React from "react"
import marked from "marked"
import Styles from "./Styles"
import highlightjs from 'highlight.js';

marked.setOptions({
  tables: true,
  breaks: true,
  sanitize: true,
  smartLists: true,
  smartypants: true,
  gfm: true,
  highlight: code => highlightjs.highlightAuto(code).value
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



export default Renderer
