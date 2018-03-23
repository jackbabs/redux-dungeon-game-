const initialState = {
  health: 50,
}

function enemyReducer(state=initialState, action){
  switch(action.type){
    case 'ENEMY_HEALTH_DECREASE':
      return {
        health: state.health - action.payload.damage
      }
    default: 
      return state
  }
}

export default enemyReducer