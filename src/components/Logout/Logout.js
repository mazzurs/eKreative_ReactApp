/* global FB */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class logOut extends Component {
  constructor (props) {
    super(props)

    // this.checkLoginState = this.checkLoginState.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  logOut () {
    FB.logout(response => {
      console.log('log out')// user is now logged out
      // console.log(this)// user is now logged out
      this.props.logout()
    })
  }

  render () {
    console.log(this.props.userToken)
    if (this.props.userToken !== '') {
      return (
        <div className='ComponentA'>
          <button onClick={this.logOut}>logOut</button>
        </div>
      )
    } else return ''
  }
}

logOut.propTypes = {
  logOut: PropTypes.func.isRequired
}

logOut.defaultProps = {
  logOut: () => {}
}

export default logOut