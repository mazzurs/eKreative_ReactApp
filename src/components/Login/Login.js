/* global FB */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Login extends Component {
  constructor (props) {
    super(props)

    this.checkLoginState = this.checkLoginState.bind(this)
    this.logIn = this.logIn.bind(this)
  }
  checkLoginState () {
    FB.getLoginStatus(response => {
      if (response.status === 'connected') {
        this.props.login(response.authResponse.accessToken)
      }
    })
  }
  logIn () {
    FB.login(this.checkLoginState)
    // setTimeout(()=> {
    //   this.checkLoginState()
    // },10000)
  }

  render () {
    console.log(this)
    if (this.props.userToken !== '') {
      return ''
    } else {
      return (
        <div className='ComponentA'>
          <button onClick={this.logIn}>login</button>
        </div>
      )
    }
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

Login.defaultProps = {
  logIn: () => {}
}

export default Login