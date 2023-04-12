import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
  const navigate = useNavigate()

  useEffect(() => {
    if(!localStorage.getItem('token', null || undefined)) {
        navigate('/login')
    } else {
        navigate('/')
    }
  }, [])
  return children
}

export default PrivateRoute