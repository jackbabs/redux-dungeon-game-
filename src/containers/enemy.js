import React from 'react'
import { connect } from 'react-redux'
import { SPRITE_SIZE } from '../config/constants'

const Enemy = (props) => {
  return (
    <div 
      className={props.tileType}
      style={{
        height: SPRITE_SIZE,
        width: SPRITE_SIZE,
      }}
      >
    </div>
  )
}

export default Enemy