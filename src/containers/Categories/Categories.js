// @flow
import React, { Component } from "react"
import styled from "styled-components"
import { Typography, Paper, TextField, Button } from "material-ui"
import List from "material-ui/List"
import { graphql, compose } from "react-apollo"
import { GET_CATEGORIES } from "./../../apollo/queries"
import { CircularProgress } from "material-ui/Progress"
import CategoryItem from "./CategoryItem"
import { FloatingButton } from "./../../components"
import EditCategory from "./EditCategory"
import { breakpoints } from "./../../styles"
import { connect } from "react-redux"

const mapStateToProps = state => ({
  window: state.window
})

const withState = connect(mapStateToProps, null)

const withCategories = graphql(GET_CATEGORIES)

const enhance = compose(withCategories, withState)

type State = {
  filter: string,
  modal: boolean
}

class Categories extends Component<{}, State> {
  state = {
    filter: "",
    modal: false
  }
  toggleModal = (open: boolean) => {
    this.setState({ modal: !!open })
  }
  render() {
    return (
      <Container>
        {this.props.window.width > breakpoints.mobile && (
          <Header>
            {/* $FlowFixMe */}
            <Typography type="display1">Categories</Typography>
          </Header>
        )}
        <Body>
          <ListContainer>
            {this.props.window.width <= breakpoints.mobile && (
              <Typography
                style={{ paddingLeft: 19, paddingTop: 16 }}
                type="title"
              >
                Categories
              </Typography>
            )}
            <SearchContainer>
              <FieldContainer>
                <TextField
                  id="search"
                  label="Search"
                  type="search"
                  margin="normal"
                  fullWidth
                  value={this.state.filter}
                  onChange={e => this.setState({ filter: e.target.value })}
                />
              </FieldContainer>
              <ButtonContainer>
                {/* $FlowFixMe */}
                <Button onClick={() => this.setState({ filter: "" })}>
                  Clear
                </Button>
              </ButtonContainer>
            </SearchContainer>
            {this.props.data.loading ? (
              <ProgressContainer>
                <CircularProgress />
              </ProgressContainer>
            ) : (
              <List>
                {this.props.data.Categories.filter(
                  category =>
                    !this.state.filter ||
                    category.name
                      .toLowerCase()
                      .indexOf(this.state.filter.toLowerCase()) > -1
                ).map(category => (
                  <CategoryItem key={category.id} {...category} />
                ))}
              </List>
            )}
          </ListContainer>
        </Body>
        <FloatingButton
          type="add"
          color="primary"
          onClick={() => this.toggleModal(true)}
        />
        <EditCategory
          open={this.state.modal}
          close={() => this.toggleModal(false)}
        />
      </Container>
    )
  }
}

const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-flow: column nowrap;
  min-height: 100%;
`

const Header = styled.div`
  flex: 0 0 auto;
`

const Body = styled.div`
  flex: 1 1 100%;
  display: flex;
  justify-content: center;
  @media (min-width: ${breakpoints.mobile + 1}px) {
    padding: 30px;
  };
`

const ListContainer = styled(Paper)`
  flex: 0 1 400px;
  display: flex;
  flex-flow: column nowrap;
  padding: 10px;
  justify-content: flex-start;
  > * {
    flex: 0 0 auto;
  }
`

const SearchContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding-left: 20px;
`

const ButtonContainer = styled.div`
  flex: 0 0 auto;
  margin-top: 8px;
`

const FieldContainer = styled.div`
  flex: 1 1 100%;
`

const ProgressContainer = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
`

export default enhance(Categories)
