import React, {useState} from "react";
import Question from "../components/Question";

export const GenerateQuiz = () => {
    const [quiz, setQuiz] = useState([])

    const getRandomInt= (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const generate = async () => {
        let share = []

        while(quiz.length !== 10) {
          let answers = new Set()
          while(answers.size !== 4) {
            answers.add(getRandomInt(1,151))
          }
          answers = [...answers]
          share.push(answers)
        }
        console.log(share)

    }

    const populate = (quizId) => {
        let quiz = []
        quizId.forEach(element => {
            const cryyy = new Audio('https://pokequiz-cries.s3.us-east-1.amazonaws.com/cries/old/' + element[0] + '.ogg')
            let answerpics = element.map((index) => {return ('https://pokequiz-cries.s3.us-east-1.amazonaws.com/pictures/' + index + '.png')})
            quiz.push({audio: cryyy, choices: answerpics})
        });

        setQuiz(quiz)

    }


  return (
    <div className="quiz">
        <button onClick={generate}>Generate</button>
        <Question quiz={quiz}/>
    </div>
  )
}

export default Quiz