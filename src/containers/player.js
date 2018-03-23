import React from 'react'
import { connect } from 'react-redux'
import handleMovement from '../helpers/movement.js'

const Player = (props) => {
  return (
  <div style={{
    position: 'absolute',
    top: props.position[1],
    left: props.position[0],
    backgroundImage: `url('../public/sprites/player_walk.png')`,
    backgroundPosition: props.spriteLocation,
    width: '40px',
    height: '40px',
  }}>
  </div>
)
}

function mapStateToProps(state){
  return {
    ...state.player,
  }
}

export default connect(mapStateToProps)(handleMovement(Player))