import { SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH } from '../config/constants'
import store from '../config/store'
import { ADD_TILES, CHANGE_TILE } from '../actions'

export default function handleMovement(player) {

  function getNewPosition(oldPos, direction) {
    switch(direction) {
      case 'WEST':
        return [ oldPos[0]-SPRITE_SIZE, oldPos[1] ]
      case 'EAST':
        return [ oldPos[0]+SPRITE_SIZE, oldPos[1] ]
      case 'NORTH':
        return [ oldPos[0], oldPos[1]-SPRITE_SIZE ]
      case 'SOUTH':
        return [ oldPos[0], oldPos[1]+SPRITE_SIZE ]
    }
  }

  function getSpriteLocation(direction, walkIndex) {
    switch(direction) {
      case 'SOUTH':
        return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*0}px`
      case 'EAST':
        return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*1}px`
      case 'WEST':
        return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*2}px`
      case 'NORTH':
        return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*3}px`
    }
  }

  function getNextTile(oldPos, newPos){
    const tiles = store.getState().map.tiles
    const y = newPos[1] / SPRITE_SIZE
    const x = newPos[0] / SPRITE_SIZE
    const nextTile = tiles[y][x]
    return nextTile
  }

  function getWalkIndex() {
    const walkIndex = store.getState().player.walkIndex
    return walkIndex >= 7 ? 0 : walkIndex + 1
  }

  function observeBoundaries(oldPos, newPos) {
    return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
           (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
  }

  function observeImpassable(oldPos, newPos) {
    let nextTile = getNextTile(oldPos, newPos)
    return nextTile < 5
  }

  function enemyEncountered(oldPos, newPos){
    
    let nextTile = getNextTile(oldPos, newPos)
    if(typeof nextTile === 'object'){
      return nextTile
    } else {
      return false
    }
  }

  function dispatchMove(direction, newPos) {
    const walkIndex = getWalkIndex()
    const level = store.getState().player.level
    store.dispatch({
      type: 'MOVE_PLAYER',
      payload: {
        position: newPos,
        direction,
        walkIndex,
        spriteLocation: getSpriteLocation(direction, walkIndex),
        level,
      }
    })
  }

  function attemptMove(direction) {
    const oldPos = store.getState().player.position
    const newPos = getNewPosition(oldPos, direction)

    if(enemyEncountered(oldPos, newPos)){
      const damage = store.getState().player.level
      let enemy = enemyEncountered(oldPos, newPos)
      enemy.health = enemy.health - damage
      if(enemy.health <= 0){
        enemy = 0
        const tiles = store.getState().map.tiles
        const y = newPos[1] / SPRITE_SIZE
        const x = newPos[0] / SPRITE_SIZE
        store.dispatch({
          type: 'CHANGE_TILE',
          payload: {
            enemy,
            y,
            x,
          }
        })
        dispatchMove(direction, newPos)
      }
      console.log("Spider health", enemy.health)

      // store.dispatch({
      //   type: 'ENEMY_HEALTH_DECREASE',
      //   payload: {
      //     damage: damage
      //   }
      // })
    }

    if(observeBoundaries(oldPos, newPos) && observeImpassable(oldPos, newPos))
      dispatchMove(direction, newPos)
  }

  function handleKeyDown(e) {
    e.preventDefault()

    switch(e.keyCode) {
      case 37:
        return attemptMove('WEST')

      case 38:
        return attemptMove('NORTH')

      case 39:
        return attemptMove('EAST')

      case 40:
        return attemptMove('SOUTH')

      default:
        console.log(e.keyCode)
    }
  }

  window.addEventListener('keydown', (e) => {
    handleKeyDown(e)
  })

  return player
}