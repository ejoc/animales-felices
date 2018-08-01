import { combineReducers } from 'redux'
import merge from 'lodash/merge'
import paginate from './paginate'
import * as ActionTypes from '../actions'

// Updates an entity cache in response to any action with response.entities.
const initialState = {
  services: {},
  specialists: {},
  appointments: {},
}

const entities = (state = initialState, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

// Updates error message to notify about the failed fetches.
// const errorMessage = (state = null, action) => {
//   const { type, error } = action

//   if (type === ActionTypes.RESET_ERROR_MESSAGE) {
//     return null
//   } else if (error) {
//     return error
//   }

//   return state
// }

// Updates the pagination data for different actions.
const pagination = combineReducers({
  appointments: paginate({
    mapActionToKey: action => action.specialists,
    types: [
      ActionTypes.APPOINTMENTS_REQUEST,
      ActionTypes.APPOINTMENTS_SUCCESS,
      ActionTypes.APPOINTMENTS_FAILURE,
    ],
  }),
})

const rootReducer = combineReducers({
  entities,
  pagination,
  // errorMessage,
})

export default rootReducer
