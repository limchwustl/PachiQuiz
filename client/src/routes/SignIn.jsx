import React, {useEffect,useState, useContext} from 'react'
import axios from "axios"
import "../style/SignIn.css"
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import {UserAuth} from "../UserAuth"
const SignIn = () => {

  let {auth, setAuth} = useContext(UserAuth)
  let [alert,setAlert] = useState("")
  const navigate = useNavigate()
    
  const post = (e)=>{
      e.preventDefault()
     
      let target = e.target

      let username = target[0].value
      let password = target[1].value
      axios.post("http://localhost:9000/signin", {username:username, password:password})
      .then(res=> {
        console.log(res)
        if (res){
          localStorage.setItem("token", res.data.token)
        setAuth((prev)=> ({...prev, isLoggedIn:true, username: res.data.username}))
        setAlert("")
        console.log("logged in")
        navigate('/')

        }
       
        
        
      }).catch((err)=>{
        console.log("wrong username!")
        setAlert("wrong username!")
      })

  }

  
  return (

    <div className = "signin-container">
        <h1 className="signin-header" style={{"textAlign":"center"}}>Log In!</h1>
         <form className="signin-form" onSubmit={post}>

        <label htmlFor="username">username</label>
        <input id="username"/>

        <label htmlFor="password">password</label>
        <input type="password" id="password"/>
        <button id="signin-btn" type="submit">Sign In</button>
        <p style={{marginLeft: "2rem", justifySelf:"center", color:"red"}}>{alert}</p>
        </form>
        


    </div>
  )
}

export default SignIn