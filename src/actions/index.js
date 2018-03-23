export const ADD_TILES = 'add_tiles'

export function addTiles(tiles){
  return {
    type: ADD_TILES,
    payload: tiles,
  }
} 