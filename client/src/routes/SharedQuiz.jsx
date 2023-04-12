import React, {useState, useEffect} from "react";
import Question from "../components/Question";
import Checkbox from "../components/Checkbox";
import _ from "lodash";
import axios from "axios"
import {
    useParams
  } from "react-router-dom";

export const SharedQuiz = () => {
    const [quiz, setQuiz] = useState([])

    const [shareId, setShareId] = useState()

    const [message, setMessage] = useState("Loading!")
    
    const {id} = useParams();

    useEffect(() => {
        async function fetchData(){
            const res = await axios.get("http://localhost:9000/quiz/find/" + id)

            if(res.data.length === 0) {
                setMessage("Quiz Expired!")
            } else {
                populate(res.data[0].pokemon_arr)

                setShareId(id)
            }
        }

        fetchData()
    }, []);

  const populate = (quizId) => {
      let quiz = []
      console.log(quizId)
      quizId.forEach(element => {
          const cryyy = new Audio('https://pokequiz-cries.s3.us-east-1.amazonaws.com/cries/old/' + element[0] + '.ogg')
          let answerpics = element.map((index) => {return ('https://pokequiz-cries.s3.us-east-1.amazonaws.com/pictures/' + index + '.png')})
          quiz.push({audio: cryyy, choices: answerpics})
      });

      setQuiz(quiz)
  }

  if (quiz.length == 0) {
    return (
      <div className="quiz">
            <h2>{message}</h2>
      </div>
    )
  } else {
    return (
      <div className="quiz">
          <Question quiz={quiz} shareId={shareId}/>
      </div>
    )
  }


}

export default SharedQuiz