import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn"
import Home from "./routes/Home";
import Logout from "./routes/Logout"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Nav from './components/Nav'
import Quiz from './routes/Quiz';
import Pokedex from "./routes/Pokedex"
import Leaderboard from "./routes/Leaderboard"
import {UserAuth} from "./UserAuth"
import Friends from "./routes/Friends"
import SharedQuiz from "./routes/SharedQuiz";
import Stats from "./routes/Stats";

import './style/App.css'
function App() {

 
  const [auth,setAuth] = useState(
    {
      isLoggedIn:false,
      username:"guest",

    }
  )
 
  useEffect(()=>{
    axios.get("http://localhost:9000/signin/isUserAuth",{ headers: {"token":localStorage.getItem("token")}})
    .then(res=>{
    
      setAuth((prev)=> ({...prev, isLoggedIn:true, username: res.data.username}))

    })
    },[])

  return (
    <div className="container" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/tile.jpg'})`}}>
      <Router>
        <UserAuth.Provider value = {{auth,setAuth}}>
          <Nav />
          
        
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/quiz" element={<Quiz/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/pokedex" element={<Pokedex/>} />
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/leaderboard" element={<Leaderboard/>}/>
          <Route path="/friends" element={<Friends/>}/>
          <Route path="/shared/:id" element={<SharedQuiz/>}/>
          <Route path="/stats" element ={<Stats/>}/>
        </Routes>
        </UserAuth.Provider>
      </Router>
      
    </div>
  
  );
}

export default App;