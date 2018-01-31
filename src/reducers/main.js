import update from 'immutability-helper'
import { CHANGE_STATE_PROP } from '../actions'
import { DECREMENT, INCREMENT, LOGIN, LOGOUT, ADD_MARKER } from '../actions/main'

const REDUCER = 'MAIN'
const defaultState = {
  value: 0,
  userToken: '',
  markers: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + 1
      }
    case DECREMENT:
      return {
        ...state,
        value: state.value - 1
      }
    case LOGIN:
      return {
        ...state,
        userToken: action.data
      }
    case LOGOUT:
      return {
        ...state,
        userToken: ''
      }
    case ADD_MARKER:
      return {
        ...state,
        markers: action.data
      }
    case REDUCER + CHANGE_STATE_PROP:
      return update(state, {
        [action.state.prop]: {$set: action.state.value}
      })
    default:
      return state
  }
}
