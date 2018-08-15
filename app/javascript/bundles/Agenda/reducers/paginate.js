// import union from 'lodash/union'
import { combineReducers } from 'redux'

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
const paginate = ({ types, mapActionToKey }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.')
  }

  const [
    requestType,
    successType,
    failureType,
  ] = types

  const updatePagination = (pages = {}, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...pages,
          [action.response.page]: {
            ids: [],
            fetching: true,
          },
        }
      case successType:
        return {
          ...pages,
          [action.response.page]: {
            // ids: action.response.results.filter(item => item.id),
            ids: action.response.results,
            fetching: false,
          },
          // ids: union(state.ids, action.response.result),
          // nextPageUrl: action.response.nextPageUrl,
          // pageCount: state.pageCount + 1,
        }
      case failureType:
        return {
          ...pages,
          isFetching: false,
        }
      default:
        return pages
    }
  }

  const currentPage = (currentPage = 1, action = {}) =>
    action.type === requestType ? action.response.page : currentPage

  const pages = (state = {}, action) => {
    // Update pagination by key
    switch (action.type) {
      case requestType:
      case successType:
      case failureType: {
        const key = mapActionToKey(action)
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.')
        }
        return {
          ...state,
          [key]: updatePagination(state[key], action),
        }
      }
      default:
        return state
    }
  }

  return combineReducers({
    pages,
    currentPage,
  })
}

export default paginate