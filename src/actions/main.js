export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const ADD_MARKER = 'ADD_MARKER'

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