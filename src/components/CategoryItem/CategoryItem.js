//@flow
import React from "react"
import styled from "styled-components"
import { Typography } from "material-ui"
import Link from "./../Link/Link"
import { cyan } from "material-ui/colors"
import { connect } from "react-redux"
import { includes, get } from "lodash"

type Props = {
  name: string,
  color: string,
  id: string,
  active: boolean,
  onClick: Function
}

const mapStateToProps = state => ({
  path: get(state, "routing.location.pathname")
})

const enhance = connect(mapStateToProps, null)

const CategoryItem = (props: Props) => {
  const isActive = includes(props.path, props.id)
  return (
    <Container onClick={props.onClick}>
      <Color color={props.color} />
      <Link to={`/app/projects/category/${props.id}`}>
        <Name active={isActive ? "true" : ""} style={{ fontSize: "18px" }}>
          {props.name}
        </Name>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const Color = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  margin-left: 5px;
  margin-right: 10px;
  background-color: ${props => props.color};
`

const Name = styled(Typography) `
  ${props =>
    props.active === "true" && `color: ${cyan[300]} !important;`} 
    :hover {
      color: ${cyan[500]};
      text-decoration: underline;
    }
  cursor: pointer;
`

export default enhance(CategoryItem)
