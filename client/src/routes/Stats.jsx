import React, {useState, useEffect, useContext} from 'react'
import axios from "axios"
import "../style/Friends.css"
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import {UserAuth} from "../UserAuth"

const Stats = () => {
    let {auth, setAuth} = useContext(UserAuth)
    let [users, setUsers] = useState({})
    let [stats, setStats] = useState([])
    let [loading, setLoading] = useState(true)
    useEffect(()=>{
     
        

        async function fetchStats(){
          await axios.get("http://localhost:9000/signin/isUserAuth",{ headers: {"token":localStorage.getItem("token")}})
          .then(async (res)=>{
            await axios.get("http://localhost:9000/stats/getAll/" + res.data.username).then( async (res1)=>{
              console.log(res1.data)
              setStats(res1.data[0].stats)
              
  
             }).catch((err)=>console.log(err))
           
          })
          
      
            
           
        }
        fetchStats()
        
        
        setLoading(false)
    


    },[])
  return (

    
    <div className = "friends-container">
         
        <div>
         <h2 style={{"color":"white", "textAlign":"center"}}>Your Stats</h2>
         <nav>
           <ul style= {{"listStyle": "none" , "columns": "1"}}>
         
         {stats? stats.map((stat,i)=>
            i % 2 ?
           <li key = {i} style={{"color":"white"}} className ="friend-li">{"Score: " + stat[0] + " / 10  Date: " + stat[1]}</li>:null
           ) : null}
           </ul>
       </nav>
       </div>
       
          
     </div>
  )
}

export default Stats