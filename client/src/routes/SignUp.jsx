import React, {useState, useEffect} from 'react'
import axios from "axios"
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import '../style/SignUp.css'
const SignUp = () => {
    const [data, setData] = useState({})
    const [err, setErr] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
      async function fetchData(){
          const res = await axios.get("http://localhost:9000/pokedex/getAll")
          setData(res.data)
         
      }
      fetchData()
     
     
      
  },[])
    
    const post = (e)=>{
        e.preventDefault()
  
        let target = e.target
        let email = target[0].value
        let username = target[1].value
        let password = target[2].value
        axios.post("http://localhost:9000/signup", {email:email, username:username, password:password})
        .then(res=>{
        
        navigate('/signin')
    })
    .catch((err)=>{
     
      setErr(err.response.data.message)
    })

    }
    
    
  return (
    <div className = "signup-container" >
        <h1 className="signup-header" style={{"textAlign":"center", "color": "#00DDFF"}}>Register</h1>
        <form onSubmit={post} className="signup-form">

            <label htmlFor="email">email</label>
            <input id="email"/>

            <label htmlFor="username">username</label>
            <input id="username"/>

            <label htmlFor="password">password</label>
            <input type="password" id="password"/>

            
            <button id="signup-btn" type="submit">Register!</button>
            <p style={{marginLeft: "2rem", justifySelf:"center", color:"red"}}>{err}</p>
        </form>
   
   


    </div>
  )
}

export default SignUp