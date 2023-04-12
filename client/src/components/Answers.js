import React from 'react';
import PropTypes from 'prop-types'
import '../style/Question.css'
const Answers = props => {
    const correctChoice = () => {
        console.log("Correct!")
        props.handleCorr()
        props.handleNext()
    }

    const incorrectChoice = () => {
        console.log("Incorrect!")
        props.handleNext()
    }

    const randomize = (array) => {
      let currentIndex = array.length,  randomIndex;
    
      // While there remain elements to shuffle.
      while (currentIndex != 0) {
    
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
    
      return array;
    }

    const makeChoices = () => {
      let choices = props.choices
      let list = choices.map((element, index) => {
          if (index == 0) {
              return <button className = 'choices' key={index} onClick={correctChoice}><img src={element}/></button>
          } else {
              return <button className = 'choices' key={index} onClick={incorrectChoice}><img src={element}/></button>
          }
         
        })
      
      return list

  }

  let list = makeChoices()
  let random = randomize(list)

  return (
    <div>
      {random}
    </div>
  )
}

Answers.propTypes = {}

export default Answers