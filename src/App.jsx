import React from 'react'
import Search from './components/Search'
import Modal from './components/Modal'
import Meals from './components/Meals'
import Favorites from './components/Favorites'
import { useGlobalContext } from './Context'

function App() {
  const { showModal, favorites } = useGlobalContext()
  return (
    <>
      <Search />
      {favorites.length > 0 && <Favorites />}
      <Meals />
      {showModal && <Modal />}

    </>
  )
}

export default App
