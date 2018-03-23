import { ADD_TILES } from '../actions'

const initialState = {
  tiles: [],
}

const mapReducer = (state=initialState, action) => {
  switch(action.type){
    case ADD_TILES:
      return {
        ...action.payload
      }
    case 'CHANGE_TILE':
    let newTiles = state.tiles
    newTiles[action.payload.y][action.payload.x] = action.payload.enemy
      return {
        tiles: newTiles
      }
    default: 
      return state
  }
}

export default mapReducer