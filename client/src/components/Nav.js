import React, {useEffect, useState, useContext} from 'react'
import '../style/Nav.css'
import logo from '../assets/images/pachirisu.png'
import {Link} from "react-router-dom"
import axios from 'axios'
import {UserAuth} from "../UserAuth"
const Nav = () => {
    const {auth, setAuth} = useContext(UserAuth)

    
  return (
    <div className="nav-container">
    <div className="title-container">
    <Link to ="/" style={{ textDecoration: 'none' }}>
        <h1 className="title">PACHIQUIZ!</h1>
        
        
    </Link>
    <img className ="logo" src={logo} alt="pachirisu"/>
    </div>
    <div className="right-container">
    {auth.isLoggedIn ? <h3 className ="welcome-message">Welcome {auth.username}! </h3> : null}

    <div className="sub-links-container">

        <Link to = "/quiz" style={{ textDecoration: 'none', color:"#00DDFF" }}>
            Quiz
        </Link>
        {auth.isLoggedIn ? null : 
        <Link to = "/SignUp" style={{ textDecoration: 'none' , color:"#00DDFF"}}>
            SignUp
        </Link>}
        
       
        {auth.isLoggedIn ?  <Link to = "/logout" style={{ textDecoration: 'none' , color:"#00DDFF"}}>
            Logout
        </Link>  :<Link to = "/signin" style={{ textDecoration: 'none' , color:"#00DDFF"}}>
            SignIn
        </Link>}
        {auth.isLoggedIn ? <Link to = "/stats" style={{ textDecoration: 'none' , color:"#00DDFF"}}>
            Stats
        </Link> : null}
        

        
        <Link to = "/pokedex" style={{ textDecoration: 'none' , color:"#00DDFF"}}>
            PokeDex
        </Link>
        <Link to = "/leaderboard" style={{ textDecoration: 'none' , color:"#00DDFF"}}>
            Leaderboard
        </Link>
        <Link to = "/friends" style={{ textDecoration: 'none' , color:"#00DDFF"}}>
            Friends
        </Link>
        

    </div>
    
            </div>


    </div>
  )
}

export default Nav