import React, {useState, useEffect} from 'react'
import axios from "axios"
import '../style/Pokedex.css'
import Cry from '../components/Cry'
import logo from '../assets/images/pachirisu.png'
import rd3 from 'react-d3-library'



const Pokedex = () => {
    const [data, setData] = useState({})
    const [curPokemon, setCurPokemon] = useState({

        id:1,
        name:"Bulbasaur",
    })
    const [filter, setFilter] = useState("")
  
    useEffect(() => {
        async function fetchData(){
            const res = await axios.get("http://localhost:9000/pokedex/getAll")
            setData(res.data)
           
        }
        fetchData()
       
       
        
    },[])

    const handleFilter = (e)=>{
    
        async function fetchData(){

            const res = await axios.get("http://localhost:9000/pokedex/getFilter/" + e.target.value)
       
            setData(res.data)
         
           
        }
        if (e.target.value !== ""){
            fetchData()
        }
       
       
        
    
    }
   
  return (
    <div className="pokedex-container">
        
        <div className="screen">
    
            <h1 className = "pokedex-name">{curPokemon.name}</h1>
            <img className = "pokedex-pokemon-img" src={'https://pokequiz-cries.s3.us-east-1.amazonaws.com/pictures/' + String(curPokemon.id) + '.png'} alt ="pokemon" />
        </div> 
        <div style={{marginTop:"8rem"}}>
        <Cry className = "pokedex-cry-btn" audio={new Audio('https://pokequiz-cries.s3.us-east-1.amazonaws.com/cries/' + String(curPokemon.id) + '.ogg')}/>

        </div>
        
        <div className="scrollScreen">
        <input id="search-bar" onChange={handleFilter} placeholder="search pokemon!" />
        <nav>
            <ul>
         
                {data ? Object.entries(data).map(item=> <h2 style={{color: "white"}} key= {item[1].id} onClick=
                {
                    ()=>{
                     
                    setCurPokemon((prev)=> ({...prev, id:parseInt(item[1].id), name: item[1].name.english}))
                    }
                }
                >{"No." + (parseInt(item[1].id)) + " " + item[1].name.english}</h2>) : null}
                

            </ul>
        </nav>
        </div>
      
    
    </div>
  )
}

export default Pokedex