import React, { Component } from 'react'
import Map from './map'
import Player from './player'
import tiles from '../data/maps/1'
import { ADD_TILES } from '../actions'


class World extends Component {
  componentDidMount(){
    const { store } = this.context
  }
  render(){
  const { store } = this.context
  store.dispatch({ type: ADD_TILES, payload: {
    tiles,
  }})
  return (
    <div
      style={{
        position: 'relative',
        width: '800px',
        height: '400px',
        margin: '20px auto',
      }}
    >
      <Map/>
      <Player/>
    </div>
  )
  }
}

World.contextTypes = {
  store: React.PropTypes.object
}




export default World
