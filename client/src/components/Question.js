import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types'
import Answers from './Answers'
import axios from 'axios'
import Cry from './Cry'
import '../style/Cry.css'
import {UserAuth} from "../UserAuth"
import Modal from 'react-modal'


const customStyles = {
    overlay: {
        backgroundColor: 'papayawhip'
    },
    content: {
      top: '50%',
      left: '50%',
    //   right: 'auto',
    //   bottom: 'auto',
    //   marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      fontFamily: 'Acre',
      color: '#373e98',
    },
  };

const Question = props => {
    const {auth, setAuth} = useContext(UserAuth)
    const [score, setScore] = useState(0)
    const [currIndex, setCurrIndex] = useState(0)
    let [friends, setFriends] = useState([])

    useEffect(()=>{
        
        async function fetchFriends(){
           await axios.get("http://localhost:9000/friends/getAll/" + auth.username).then( async (res)=>{
            console.log("friends", res.data[0].friends)
            setFriends(res.data[0].friends)


           }).catch((err)=>console.log(err))
        }
        fetchFriends()
    },[])

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        console.log('here')
    }

    function closeModal() {
        setIsOpen(false);
    }

    const onShare = (e) => {
        let friend = e.target.id
        async function sendData(){

            const res = await axios.put("http://localhost:9000/sharedLinks/add/", {sender: auth.username, receiver: friend, link: link})
       
            console.log(res.data)
         
           
        }
        
        sendData()
        alert('Succesfully shared!')
    }

    const handleNext = () => {
        setCurrIndex(currIndex + 1)
        
        console.log(score)
    }

    const handleCorr = () => {
        setScore(score + 1)
    }

    const makeQuestions = (questionsInfo) => {
        let questionsList = questionsInfo.map((object, index) => {
            return (
                <div key={index + 1}>
                    <h2>Question {index + 1}</h2>
                    <Cry audio={object.audio} />
                    <br/>
                    <Answers choices={object.choices} handleNext={handleNext} handleCorr={handleCorr}/>
                </div>
            )
        })

        return questionsList
    }

    const reset = () => {
        setScore(0)
        setCurrIndex(0)
    }

    const hardReset = () => {
        reset()
        props.handleNew([])
    }

    let questList = makeQuestions(props.quiz)

    let link = 'http://localhost:3000/shared/' + props.shareId

    if (currIndex == questList.length && questList.length !== 0) {
        const post =  ()=>{
          
            axios.put("http://localhost:9000/stats/add", {username:auth.username, stat:score})
       
            axios.put("http://localhost:9000/leaderboard/update", {username:auth.username, score: score}).then((res)=>{
              
                //setShareId(res.data)
            })
            .catch((err)=>console.log(err))


        }
       
        post()
        
        return (
            <div>
                <h2>Congratulations!</h2> 
                <div style={{fontFamily: 'Acre'}}>
                You got {score} / 10 correct!
                </div>
                <div>
                    <br/>
                    <button className="cry-btn" onClick={reset}>Retry?</button>
                    <button className="cry-btn" onClick={hardReset}>New Quiz?</button>
                    <button className="cry-btn" onClick={openModal}>Share!</button>
                    <Modal 
                        ariaHideApp={false}
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        style={customStyles}
                    >
                        <div>
                        <button className="cry-btn" onClick={closeModal}>Close</button>
                        </div>
                        <br/>
                        <div>Click on a friend to share it with them!</div>
                        <ul style= {{"listStyle": "none" , "columns": "2"}}>
          
                            {friends ? friends.map((friend,i)=>
                                <li key = {friend}  className ="friend-li" onClick={onShare} id={friend}>{friend}</li>) : null}
                        </ul>
                        Send this link to your friends: 
                        <br/>
                        {link}
                    </Modal>
                   

                </div>
            </div>
        )

    } else {
        return (
            <div>
                {questList[currIndex]}
            </div>
        )
    }
}

Question.propTypes = {}

export default Question