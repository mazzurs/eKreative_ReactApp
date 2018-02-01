/* global title, description */

import update from 'immutability-helper'
import { CHANGE_STATE_PROP } from '../actions'
import {
  DECREMENT,
  INCREMENT,
  LOGIN,
  LOGOUT,
  ADD_MARKER,
  REMOVE_MARKER,
  EDIT_MARKER,
  EDIT_LAT,
  EDIT_LNG
} from '../actions/main'
import { REPLACE_MARKERS } from '../actions/main'

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
        userToken: '',
        markers: []
      }
    case ADD_MARKER:
      return {
        ...state,
        markers: action.data
      }
    case REMOVE_MARKER:
      action.data.markers.splice(action.data.id, 1)
      return {
        ...state,
        markers: action.data.markers
      }
    case EDIT_MARKER:
      let {type, value, id} = action.data
      return update(state, {markers: {[id]: {[type]: {$set: value}}}})
    case EDIT_LAT:
      let {lat, markerId} = action.data
      return update(state, {markers: {[markerId]: {'lat': {$set: lat}}}})
    case EDIT_LNG:
      let {lng, idMarker} = action.data
      return update(state, {markers: {[idMarker]: {'lng': {$set: lng}}}})
    case REPLACE_MARKERS:
      let {oldIndex, newIndex, oldMarker, newMarker} = action.data
      return update(state, {markers: {[oldIndex]: {$set: newMarker}, [newIndex]: {$set: oldMarker}}})

    case REDUCER + CHANGE_STATE_PROP:
      return update(state, {
        [action.state.prop]: {$set: action.state.value}
      })
    default:
      return state
  }
}
