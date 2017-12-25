// @flow
import React from "react"
import styled from "styled-components"
import { graphql, compose } from "react-apollo"
import { CircularProgress } from "material-ui/Progress"
import { cyan } from "material-ui/colors"
import Typography from "material-ui/Typography"
import { GET_CATEGORIES } from "./../../apollo/queries"
import { CategoryItem, Link } from "./../../components"
import { SEEK, closeArtemis } from "./../../store/actions/artemis"
import { connect } from "react-redux"

const mapStateToProps = state => ({
  path: state.routing.location.pathname
})

const mapDispatchToProps = dispatch => ({
  close: type => dispatch(closeArtemis(type))
})

const withCategories = graphql(GET_CATEGORIES)
const enhance = compose(withCategories, connect(mapStateToProps, mapDispatchToProps))

type Props = {
  active: string
}

const Categories = (props: Props) => (
  <Container>
    {props.data.loading ? (
      <CircularProgress />
    ) : (
        <Content>
          <AllContainer>
            <Link to="/app/projects">
              <SelectAll active={props.path === "/app/projects" ? "1" : ""} style={{ fontSize: 18 }}>
                All Categories
             </SelectAll>
            </Link>
          </AllContainer>
          {props.data.Categories.map(category => (
            <CategoryItem
              key={category.id}
              {...category}
            />
          ))}
        </Content>
      )}
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
`

const Content = styled.div``

const SelectAll = styled(Typography) `
  :hover {
    color: ${cyan[500]};
    text-decoration: underline;
  }
  color: ${props => props.active && cyan[500]};
  cursor: pointer;
`

const AllContainer = styled.div`
  margin-bottom: 20px;
  margin-left: 6px;
  display: inline-flex;
`

export default enhance(Categories)
