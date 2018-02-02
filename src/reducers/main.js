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
  EDIT_LNG,
  UPDATE_MARKERS
} from '../actions/main'

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
    // case RE_MARKERS:
    //   console.log(action.data.newState)
    //   return {
    //     ...state,
    //     markers: action.data.newState
    //   }

    // case RE_TITLE:
    //   let {newTitle, idTitle} = action.data
    //   return update(state, {markers: {[idTitle]: {'title': {$set: newTitle}}}})

    case REDUCER + CHANGE_STATE_PROP:
      return update(state, {
        [action.state.prop]: {$set: action.state.value}
      })

    case UPDATE_MARKERS:
      const {oldIndex, newIndex, markers} = action.data
      const clone = markers.slice(0)
      const tmp = clone[oldIndex]
      clone.splice([oldIndex], 1)
      clone.splice([newIndex], 0, tmp)
      return update(state, {markers: {$set: clone}})
    default:
      return state
  }
}
