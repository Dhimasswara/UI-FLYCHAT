import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LayoutChat from '../pages/chat'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ColumnGroup from '../components/ColumnGroup/ColumnGroup'
import PrivateRoute from '../middleware/PrivateRoot'

const Router = () => {
  return (
    <BrowserRouter>
            <Routes>
                <PrivateRoute>
                  <Route path={'/'} element={<LayoutChat/>}></Route>
                </PrivateRoute> 

                <PrivateRoute>
                  <Route path={'/chatroom'} element={<ColumnGroup/>}></Route> 
                </PrivateRoute> 
                
                <Route path={'/login'} element={<Login/>}></Route> 
                <Route path={'/register'} element={<Register/>}></Route>

            </Routes>
    </BrowserRouter>
  )
}

export default Router