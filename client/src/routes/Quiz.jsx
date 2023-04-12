import React, {useState} from "react";
import Question from "../components/Question";
import Checkbox from "../components/Checkbox";
import _ from "lodash";
import axios from "axios"

export const Quiz = () => {
    const [quiz, setQuiz] = useState([])

    const [shareId, setShareId] = useState()

    const [gen1, setGen1] = useState(false)

    const post = (quiz)=>{
       
      axios.post("http://localhost:9000/quiz/add", {quiz:quiz}).then((res)=>{
          console.log(res)
          setShareId(res.data)
      })
      .catch((err)=>console.log(err))

     

  }

    const handleGen1 = () => {
      setGen1(!gen1)
    }

    const [gen2, setGen2] = useState(false)

    const handleGen2 = () => {
      setGen2(!gen2)
    }

    const [gen3, setGen3] = useState(false)

    const handleGen3 = () => {
      setGen3(!gen3)
    }

    const [gen4, setGen4] = useState(false)

    const handleGen4 = () => {
      setGen4(!gen4)
    }

    const [gen5, setGen5] = useState(false)

    const handleGen5 = () => {
      setGen5(!gen5)
    }

    const [gen6, setGen6] = useState(false)

    const handleGen6 = () => {
      setGen6(!gen6)
    }

    // const [state, setState] = React.useState({
    //   gen1: true,
    //   gen2: false,
    //   gen3: false,
    // });
  
    // const handleChange = (event) => {
    //   let option = event.target.name
    //   console.log(event.target.checked)
    //   setState({
    //     ...state,
    //     [option]: !state[option],
    //   });
    // };

    const getRandomInt= (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const generate = () => {
      let share = []

      let dexNum = []

      if (gen1) {
        console.log('yo')
        dexNum = dexNum.concat(_.range(1, 152))
      }
      if (gen2) {
        dexNum = dexNum.concat(_.range(151, 252))
      }
      if (gen3) {
        dexNum = dexNum.concat(_.range(252, 387))
      }
      if (gen4) {
        dexNum = dexNum.concat(_.range(387, 494))
      }
      if (gen5) {
        dexNum = dexNum.concat(_.range(494, 650))
      }
      if (gen6) {
        dexNum = dexNum.concat(_.range(650, 722))
        console.log(dexNum)
      }
      if (dexNum.length == 0) {
        dexNum = dexNum.concat(_.range(1, 152))
        alert("Defaulted to Gen 1 quiz!")
      }

      console.log(dexNum)
      
      console.log(dexNum)
      while(share.length !== 10) {
        let answers = new Set()
        while(answers.size !== 4) {
          answers.add(dexNum[_.random(0, dexNum.length-1)])
        }
        answers = [...answers]
        console.log(answers)
        share.push(answers)
      }

      post(share)

      return share
  }

  const populate = (quizId) => {
      let quiz = []
      console.log(quizId)
      quizId.forEach(element => {
          const cryyy = new Audio('https://pokequiz-cries.s3.us-east-1.amazonaws.com/cries/' + element[0] + '.ogg')
          let answerpics = element.map((index) => {return ('https://pokequiz-cries.s3.us-east-1.amazonaws.com/pictures/' + index + '.png')})
          quiz.push({audio: cryyy, choices: answerpics})
      });

      setQuiz(quiz)

  }

  const generateNew = () => {
    let quizNotP = generate()
    populate(quizNotP)
  }

  if (quiz.length == 0) {
    return (
      <div className="quiz">
          <h2>Choose which generations you want in your quiz!</h2>
          <Checkbox label="Gen 1" value={gen1} onChange={handleGen1} name="gen 1"/>
          <Checkbox label="Gen 2" value={gen2} onChange={handleGen2} name="gen 2"/>
          <Checkbox label="Gen 3" value={gen3} onChange={handleGen3} name="gen 3"/>
          <Checkbox label="Gen 4" value={gen4} onChange={handleGen4} name="gen 4"/>
          <Checkbox label="Gen 5" value={gen5} onChange={handleGen5} name="gen 5"/>
          <Checkbox label="Gen 6" value={gen6} onChange={handleGen6} name="gen 6"/>
          <br/>
          <button className="quiz-btn" onClick={generateNew}>Generate</button>
      </div>
    )
  } else {
    return (
      <div className="quiz">
          <Question quiz={quiz} shareId={shareId} handleNew={setQuiz}/>
      </div>
    )
  }


}

export default Quiz