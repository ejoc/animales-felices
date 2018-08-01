import { combineReducers } from 'redux'
import { HELLO_WORLD_NAME_UPDATE } from '../actions/helloWorldConstants'

export const initialState = {
  events: {},
  pagination: {},
}

const name = (state = '', action) => {
  switch (action.type) {
    case HELLO_WORLD_NAME_UPDATE:
      return action.text
    default:
      return state
  }
}

const agendaReducer = combineReducers({ name })

export default agendaReducer
