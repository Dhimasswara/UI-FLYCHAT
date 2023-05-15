import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
  const navigate = useNavigate()

  useEffect(() => {
    if(!localStorage?.getItem('token') || localStorage?.getItem('token') === 'null') return navigate('/login')
  }, [])
  return children
}

export default PrivateRoute