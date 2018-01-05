// @flow
import React, { Component } from "react"
import styled from "styled-components"
import { Typography, Paper, TextField, Button } from "material-ui"
import List from 'material-ui/List'
import { graphql } from "react-apollo"
import { GET_CATEGORIES } from "./../../apollo/queries"
import { CircularProgress } from 'material-ui/Progress'
import CategoryItem from "./CategoryItem"
import { FloatingButton } from "./../../components"
import EditCategory from "./EditCategory"

const withCategories = graphql(GET_CATEGORIES)

const enhance = withCategories

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
        <Header>
          {/* $FlowFixMe */}
          <Typography type="display1">Categories</Typography>
        </Header>
        <Body>
          <ListContainer>
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
            {
              this.props.data.loading
                ? <CircularProgress />
                : <List>
                  {
                    this.props.data.Categories.filter(category =>
                      !this.state.filter || category.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1
                    ).map(category =>
                      <CategoryItem key={category.id} {...category} />
                      )
                  }

                </List>
            }
          </ListContainer>
        </Body>
        <FloatingButton
          type="add"
          color="primary"
          onClick={() => this.toggleModal(true)}
        />
        <EditCategory open={this.state.modal} close={() => this.toggleModal(false)} />
      </Container>
    )
  }
}


const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
`

const Header = styled.div`
  flex: 0 0 auto;
`

const Body = styled.div`
  flex: 1 1 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
`

const ListContainer = styled(Paper) `
  flex: 0 0 40%;
  display: flex;
  flex-flow: column nowrap;
  padding: 10px
`

const SearchContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding-left: 20px;
`

const ButtonContainer = styled.div`
  flex: 0 0 auto;
  margin-top: 8px
`

const FieldContainer = styled.div`
  flex: 1 1 100%;
`

export default enhance(Categories)