import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LayoutChat from '../pages/chat'
import Login from '../pages/Login'
import Register from '../pages/Register'

const Router = () => {
  return (
    <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<LayoutChat/>}></Route> 
                <Route path={'/login'} element={<Login/>}></Route> 
                <Route path={'/register'} element={<Register/>}></Route> 
            </Routes>
    </BrowserRouter>
  )
}

export default Router