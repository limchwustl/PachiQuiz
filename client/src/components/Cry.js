import React from "react";
import PropTypes from 'prop-types'
import pokeball from '../assets/images/pokaball2.png'

const Cry = props => {
    const play = () => {
        props.audio.play()
    }
    
    return (
        <div>
        <img src={pokeball} onClick={play} width="128"/>
        </div>

    )
    
}

Cry.propTypes = {}

export default Cry