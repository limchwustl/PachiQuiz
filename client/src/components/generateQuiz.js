import React from 'react'
import axios from 'axios'
const generateQuiz = () => {


    const get = (quiz)=>{
       
        axios.get("http://localhost:9000/sharedLinks/get/" + "limch").then((res)=>{
            console.log(res)
        })
        .catch((err)=>console.log(err))

       
        
  
    }
    const send = (data)=>{
        
        async function sendData(){

            const res = await axios.put("http://localhost:9000/sharedLinks/add/", {sender:data.sender, receiver:data.receiver, link:data.link})
       
            console.log(res.data)
         
           
        }
        
        sendData()
        
    }
  
    
  return (
    <div>
        

        <button onClick={()=>get()}>  to generate! </button>
        <button onClick={()=>send()}>  find! </button>
    </div>

   
  )
}

export default generateQuiz