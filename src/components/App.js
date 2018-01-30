/* global FB, myMap, google, myMap */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'
// components
import ComponentAContainer from '../components/ComponentsA/ComponentAContainer'
import ComponentBContainer from '../components/ComponentsB/ComponentBContainer'
// router
import { Route, Switch } from 'react-router'
import { HashRouter, Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Route render={({staticContext}) => {
      if (staticContext) { staticContext.status = 404 }
      return (<div>
        <h1>Sorry, can’t find that.</h1>
      </div>)
    }}
    />
  )
}

class App extends Component {
  constructor (props) {
    super(props)

    this.checkLoginState = this.checkLoginState.bind(this)
    this.testAPI = this.testAPI.bind(this)
    this.initMap = this.initMap.bind(this)
  }

  componentDidMount () {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '385192911908319',
        cookie: true,  // enable cookies to allow the server to access
        // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.11' // use version 2.1
      })

      FB.getLoginStatus(function (response) {
        this.statusChangeCallback(response)
      }.bind(this))
    }.bind(this);

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.11&appId=385192911908319&autoLogAppEvents=1'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  }

  testAPI () {
    console.log('Welcome!  Fetching your information.... ')
    FB.api('/me', function (response) {
      console.log('Successful login for: ' + response.name)
    })
  }

  statusChangeCallback (response) {
    console.log('statusChangeCallback')
    console.log(response)
    if (response.status === 'connected') {
      this.testAPI()
      this.initMap()
    }
  }

  checkLoginState () {
    FB.getLoginStatus(function (response) {
      this.statusChangeCallback(response)
    }.bind(this))
  }

  handleClick () {
    FB.login(this.checkLoginState())
  }

  initMap () {
    let element = document.getElementById('map')
    let options = {
      zoom: 14,
      center: {lat: 49.444185, lng: 32.059224}
    }
    let myMap = new google.maps.Map(element, options)
  }

  render () {
    return (
      <HashRouter>
        <div className='App'>
          <div className='App-header'>
            <div id="status"></div>
            <div className="fb-login-button" data-max-rows="1" data-size="small" data-button-type="login_with"
                 data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false"></div>
          </div>

          <div>
            <div className="map" id="map"></div>
            <ul>
              <li><Link to={`/`}>AppContainer (Home)</Link></li>
              <li><Link to={`/componentA`}>ComponentAContainer</Link>
              </li>
              <li><Link to={`/componentB`}>ComponentBContainer</Link>
              </li>
            </ul>
          </div>

          <div>
            <Switch>
              <Route exact path='/' render={() => {
                return (
                  <div>
                    <h2>Welcome to App</h2>
                    <p className='App-intro'>
                      <code>src/components/App.js</code>
                    </p>
                    <p>
                      Value: {this.props.value}
                    </p>
                    <p>
                      <button
                        onClick={() => this.props.changeStateProp('value', 0, 'main')}>
                        Reset to "0"
                      </button>
                    </p>
                  </div>
                )
              }}/>
              <Route path='/componentA'
                     component={ComponentAContainer}/>
              <Route path='/componentB'
                     component={ComponentBContainer}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
      </HashRouter>
    )
  }
}

App.propTypes = {
  value: PropTypes.number.isRequired,
  changeStateProp: PropTypes.func.isRequired,
  myCustomPropsFunc: PropTypes.func
}

App.defaultProps = {
  value: 0,
  changeStateProp: () => {},
  myCustomPropsFunc: () => {}
}

export default App
