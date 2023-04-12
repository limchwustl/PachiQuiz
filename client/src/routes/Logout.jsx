import React, {useEffect, useContext} from 'react'
import {UserAuth} from "../UserAuth"
import {Link, Routes, Route, useNavigate,} from 'react-router-dom';
const Logout = () => {
  const navigate = useNavigate()
  const {auth, setAuth} = useContext(UserAuth)
  useEffect(()=>{
    setAuth((prev)=> ({...prev, isLoggedIn:false, username: "guest"}))
    localStorage.removeItem("token")
    navigate('/')
  },[])
  return (
    <div>Logout</div>
  )
}

export default Logout