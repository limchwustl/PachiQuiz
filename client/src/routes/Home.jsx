import React, {useState, useEffect,useContext} from 'react'
import axios from 'axios'
import '../style/App.css'
import {UserAuth} from '../UserAuth'
import {Link} from "react-router-dom"
import GenerateQuiz from "../components/generateQuiz"
const Home = () => {
  const {auth, setAuth} = useContext(UserAuth)
  const [sharedLinks, setSharedLinks] = useState([])
  useEffect(()=>{
    
    
    const get = async ()=>{
      await axios.get("http://localhost:9000/signin/isUserAuth",{ headers: {"token":localStorage.getItem("token")}})
      .then(async (res)=>{
       
        setAuth((prev)=> ({...prev, isLoggedIn:true, username: res.data.username}))
       
        await axios.get("http://localhost:9000/sharedLinks/get/" + res.data.username).then((res1)=>{
      
          setSharedLinks(res1.data[0].links)
      })
      .catch((err)=>console.log(err))
      })
      
       
      

  }
  get()
  

  },[])



  return (
    <div className="home-container">

    <div style={{"width": "32%"}}>
     
    </div>

    <div className="home-center-container" style={{"width": "33%"}}>
    <h2 style={{"color":"#373e98", "justifySelf": "center", "marginLeft": "1.5em"}}>Are you a Pokemon fanatic? Challenge yourself to find out!</h2>
       
        <Link to = "/quiz" style={{ textDecoration: 'none', color:"white" }}>

          <button className ="quiz-btn">
              <p>Take Me to Quiz!</p>
          </button>
      
    </Link>
    </div>
    
    <div style={{"width": "33%"}}>
    {auth.isLoggedIn ? 
      <div className="notification-container">
      <React.Fragment>
      <h2 style={{textAlign:"center"}}className="user-stat">Notifications</h2>
      <div className="share-link-container">
      
         
      
     
      {sharedLinks.map((links)=>
        
        
       
        <a key={links[1]} style={{textAlign:"center"}} href={links[1]}>{links[0]} sent you a link!</a> 
      
      )}
      </div>
    
    </React.Fragment>
    </div>
    : null}
    </div>
    
    
   
    
    
    

    </div>
    
  )
}

export default Home