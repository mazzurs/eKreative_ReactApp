export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const ADD_MARKER = 'ADD_MARKER'
export const REMOVE_MARKER = 'REMOVE_MARKER'
export const EDIT_MARKER = 'EDIT_MARKER'
export const EDIT_LAT = 'EDIT_LAT'
export const EDIT_LNG = 'EDIT_LNG'
export const REPLACE_MARKERS = 'REPLACE_MARKERS'
export const RE_MARKERS = 'RE_MARKERS'
export const RE_TITLE = 'RE_TITLE'
export const UPDATE_MARKERS = 'UPDATE_MARKERS'

export function increment () {
  return dispatch => {
    dispatch({
      type: INCREMENT
    })
  }
}

export function decrement () {
  return dispatch => {
    dispatch({
      type: DECREMENT
    })
  }
}

export function login (userToken) {
  return dispatch => {
    dispatch({
      type: LOGIN,
      data: userToken
    })
  }
}

export function logout () {
  return dispatch => {
    dispatch({
      type: LOGOUT
    })
  }
}

export function addMarker (markers) {
  return dispatch => {
    dispatch({
      type: ADD_MARKER,
      data: markers
    })
  }
}

export function removeMarker (markers, id) {
  return dispatch => {
    dispatch({
      type: REMOVE_MARKER,
      data: {markers, id}
    })
  }
}

export function editMarker (type, value, id) {
  return dispatch => {
    dispatch({
      type: EDIT_MARKER,
      data: {type, value, id}
    })
  }
}

export function editLat (lat, markerId) {
  return dispatch => {
    dispatch({
      type: EDIT_LAT,
      data: {lat, markerId}
    })
  }
}

export function editLng (lng, idMarker) {
  return dispatch => {
    dispatch({
      type: EDIT_LNG,
      data: {lng, idMarker}
    })
  }
}

export function replaceMarkers (oldIndex, newIndex, oldMarker, newMarker) {
  return dispatch => {
    dispatch({
      type: REPLACE_MARKERS,
      data: {oldIndex, newIndex, oldMarker, newMarker}
    })
  }
}

export function reMarkers (newState) {
  return dispatch => {
    dispatch({
      type: RE_MARKERS,
      data: {newState}
    })
  }
}

export function reTitle (newTitle, idTitle) {
  return dispatch => {
    dispatch({
      type: RE_TITLE,
      data: {newTitle, idTitle}
    })
  }
}

export function updateMarkers (oldIndex, newIndex, markers) {
  return dispatch => {
    dispatch({
      type: UPDATE_MARKERS,
      data: {oldIndex, newIndex, markers}
    })
  }
}