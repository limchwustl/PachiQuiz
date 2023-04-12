import React, {useState,useEffect} from 'react'
import axios from "axios"
import "../style/leaderboard.css"
const Leaderboard = () => {
  const [scores,setScores] = useState({})
  useEffect(()=>{
    async function fetchData(){
        const res = await axios.get("http://localhost:9000/leaderboard/getAll")
        
        const sortedData = res.data.sort((x,y)=> y.score - x.score)
   
        setScores(sortedData)
       
    }
    fetchData()
   
  },[])
  return (
    <div className = "friends-container" style={{"background": "#00DDFF"}}>
         <div style={{"width":"60%"}}>
          <h2 style={{"color":"#fffffe", "textAlign":"center" , "fontSize": "2rem"}}>Leaderboard</h2>
          <table style={{"width":"100%"}}>
           
          <thead>
            <tr style={{"color":"#fffffe", "textAlign":"center"}}>
                <th style={{"color":"#fffffe", "textAlign":"center"}}> Player </th>
                <th style={{"color":"#fffffe", "textAlign":"center"}}> Score </th>
            </tr>
            </thead>
       
          
          {scores? Object.entries(scores).map((score,i)=>
           
           <React.Fragment key = {score[1].username + "frag"}>
            <tbody>
            <tr style={{"borderBottom": "1px solid white"}}>
             
            <td key = {score[1].username} style={{"color":"#fffffe", paddingLeft:"6rem", "borderBottom": "1px solid white"}}>{score[1].username}
            {i == 0 ? <img style={{"width":"8%", "height": "8%"}} src={require("../assets/images/crown.png")}/>: null}
            </td>
            <td className="score-td" key = {score[1].username + "score"} style={{"color":"#fffffe", "textAlign":"center"}}>{score[1].score}</td>

          
            
            </tr>
          
            </tbody>
            </React.Fragment>
            ) : null}
           
        </table>
        </div>
    </div>
  )
}

export default Leaderboard