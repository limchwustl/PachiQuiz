import React, {useState, useEffect, useContext} from 'react'
import axios from "axios"
import "../style/Friends.css"
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import {UserAuth} from "../UserAuth"

const Friends = () => {
    let {auth, setAuth} = useContext(UserAuth)
    let [users, setUsers] = useState({})
    let [friends, setFriends] = useState([])
    let [loading, setLoading] = useState(true)
    useEffect(()=>{
     
        

        async function fetchFriends(){
          await axios.get("http://localhost:9000/signin/isUserAuth",{ headers: {"token":localStorage.getItem("token")}})
          .then(async (res)=>{
            await axios.get("http://localhost:9000/friends/getAll/" + res.data.username).then( async (res1)=>{
              //console.log(res.data)
              setFriends(res1.data[0].friends)
              await axios.get("http://localhost:9000/users/getAll/").then((users)=>{
             
                  const filters = [...res1.data[0].friends, res.data.username]
                 
                  const filteredUsers = users.data.filter((user)=> !filters.includes(user.username))
                  setUsers(filteredUsers)
              })
  
             }).catch((err)=>console.log(err))
           
          })
          
      
            
           
        }
        fetchFriends()
        
        setLoading(false)
    


    },[])
    const navigate = useNavigate()
      
    const post = (e)=>{
       
       
       
  
        let friendname = e
       
        axios.put("http://localhost:9000/friends/add", {username:auth.username, friend:friendname})
        .then(async(res)=> {
      
            await axios.get("http://localhost:9000/friends/getAll/" + auth.username).then( async (res)=>{
            //console.log(res.data)
            setFriends(res.data[0].friends)
            await axios.get("http://localhost:9000/users/getAll/").then((users)=>{
           
                const filters = [...res.data[0].friends, auth.username]
                const filteredUsers = users.data.filter((user)=> !filters.includes(user.username))
                setUsers(filteredUsers)
            })

           }).catch((err)=>console.log(err))
          
        })

       
        
  
    }
  
    if (loading) {
      return (
        <div className = "friends-container">
          <div>
            <h2 style={{"color":"white", "textAlign":"center"}}>Your Friends</h2>
            Loading....
          </div>
          <div>
            <h2 style={{"color":"white","textAlign":"center"}}>User List</h2>
            Loading...
          </div>
        </div>
      )
    } else {
      return(
        <div className = "friends-container">
         
        <div>
         <h2 style={{"color":"white", "textAlign":"center"}}>Your Friends</h2>
         <nav>
           <ul style= {{"listStyle": "none" , "columns": "2"}}>
         
         {friends? friends.map((friend,i)=>
    
           <li key = {friend} style={{"color":"white"}} className ="friend-li">{friend}</li>
           ) : null}
           </ul>
       </nav>
       </div>
       <div>
       <h2 style={{"color":"white","textAlign":"center"}}>User List</h2>
         <nav>
           
         <ul style= {{"listStyle": "none"}}>
         {users? Object.entries(users).map(users=>
           
           <React.Fragment key = {users[1].username + "frag"}>
           <div className="user-request-container">
           <li key = {users[1].username + "name"} style={{"color":"white", "fontSize": "1rem", "marginTop": "0.2rem"}} className ="friend-li">{users[1].username}</li>
           
 
           <button key ={users[1].username + "btn"} className="request-btn" onClick={()=>post(users[1].username)}>Add User</button>
           
           </div>
           </React.Fragment>
         
         
           ) 
           
           
           : null}
       </ul>
       </nav>

       </div>
          
     </div>
      )
    }
  }
  


export default Friends