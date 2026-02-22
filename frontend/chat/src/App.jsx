import React from 'react'
import {Route, Routes} from 'react-router'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

const App = () => {
  return (
    <Routes>
      <Route index element={<ChatPage/>}/>
      <Route path = '/login' element={<LoginPage/>}/>
      <Route path = '/signup' element={<SignUpPage/>}/>
    </Routes>
      
    
  )
}

export default App
