import { useState } from 'react'
import Create from './componenents/Create'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditModal from './componenents/EditModal'
import AllData from './componenents/AllData'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Create />}/>
        <Route path='/allData' element={<AllData />}/>
        <Route path='/editModal' element={<EditModal />}/>
          
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
