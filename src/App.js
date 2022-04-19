import React from 'react'
import ListItems from './ListItems'
import { Container } from 'react-bootstrap'

const App = () => {
  console.log('App');
  return (
    <>
      <Container>
        <ListItems />
      </Container>
    </>
  )
}

export default App