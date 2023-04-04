import React from 'react'
import queryString from 'query-string'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Coba = ({location}) => {


  const {search} = useLocation()
  console.log(search);
  useEffect(() => {
    
  const { name, room } = queryString.parse(search)
  console.log(name);
  console.log(room);
  }, [location?.search]);

  return (
    <div>Coba</div>
  )
}

export default Coba