import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LayoutChat from '../pages/chat'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ColumnGroup from '../components/ColumnGroup/ColumnGroup'
import PrivateRoute from '../middleware/PrivateRoot'

const Router = () => {
  return (
    
      <Routes>
        <Route path={'/'} element={
          <PrivateRoute>
            <LayoutChat />
          </PrivateRoute>}>
        </Route>

        <Route path={'/chatroom'} element={
          <PrivateRoute>
            <ColumnGroup />
          </PrivateRoute>
        }>

        </Route>

        <Route path={'/login'} element={<Login />}></Route>
        <Route path={'/register'} element={<Register />}></Route>

      </Routes>
  )
}

export default Router