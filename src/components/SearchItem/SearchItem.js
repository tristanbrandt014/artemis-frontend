// @flow
import React from "react"
import styled from "styled-components"
import { Typography } from "material-ui"

type Props = {
  onClick: Function,
  title: string,
  color: string,
  isArchived: boolean,
  small: boolean
}

const SearchItem = (props: Props) =>
  <Wrapper onClick={props.onClick}>
    <Container style={props.isArchived ? { opacity: 0.4 } : {}}>
      <Color color={props.color} />
      <Body>
        <Typography style={props.small ? {fontSize: 16} : {}} type="headline">{props.title}</Typography>
      </Body>
    </Container>
  </Wrapper>

const Wrapper = styled.div`
  &:hover {
    background-color: #ccc;
  }
`

const Container = styled.div`
  display: flex;
  height: 60px;
  cursor: pointer;
`

const Body = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
  justify-content: center;
  padding-left: 20px;
`

const Color = styled.div`
  background-color: ${props => props.color};
  flex: 0 0 20px;
`

export default SearchItem