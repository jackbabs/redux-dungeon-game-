import React from 'react'
import { connect } from 'react-redux'
import { SPRITE_SIZE } from '../config/constants'
import Enemy from './enemy.js'

function getTileSprite(type){
  switch(type){
    case 0: 
      return 'grass'
    case 3: 
      return 'tree'
    case 4:
      return 'chest'
    case 5: 
      return 'rock'
    case 6:
      return 'tree'
    case 11:
      return 'spider'
  }
}

const MapTile = (props) => {
  const { playerPos, i, j } = props
  const [ playerX, playerY ] = props.playerPos
  const distanceFromPlayer = (Math.abs((playerY/ 40) - i) + Math.abs((playerX/ 40) - j))
  let tileType;
  if(distanceFromPlayer > 3){
    tileType = "tile fog"
  } else if(typeof props.tile === 'number'){
    tileType = `tile ${getTileSprite(props.tile)}`
  } else if(typeof props.tile === 'object'){
    tileType = 'tile spider'
  }
  if(tileType < 10) {
    return <div 
    className={tileType}
    style={{
      height: SPRITE_SIZE,
      width: SPRITE_SIZE,
    }}
    >
    </div>
  } else {
    return (
      <Enemy
        tileType={tileType}
      />
    )
  }
  }
  

const MapRow = (props) => {
  return (
    <div
      className="row"
      style={{ height: SPRITE_SIZE }}
    >
    {
      props.tiles.map( (tile, j) => 
        <MapTile tile={tile} i={props.i} j={j} playerPos={props.playerPos}/>)
    }
    </div>
  )
}

const Map = (props) => {
  return (
    <div
      style={{
        position: 'relative',
        top: '0px',
        left: '0px',
        width: '800px',
        height: '480px',
        border: '4px solid white',
      }}
    >
    {
      props.tiles.map((row, i) => 
        <MapRow tiles={row} i={i} playerPos={props.playerPosition} />)
    }
    </div>
  )
}

function mapStateToProps(state){
  return {
    tiles: state.map.tiles,
    playerPosition: state.player.position,
  }
}

export default connect(mapStateToProps)(Map)