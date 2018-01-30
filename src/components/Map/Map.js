/* global myMap, google */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import './Map.css'

class MapContainer extends Component {

  constructor (props) {
    super(props)
    this.onMarkerClick = this.onMarkerClick.bind(this)
  }

  onMarkerClick (props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  renderMarkers (map, maps) {
    let marker = new maps.Marker({
      position: {},
      map,
      title: 'Hello World!'
    })
  }

  style = {
    width: '100%',
    height: '400px'
  }

  mapDidMount () {

  }

  mapClicked (mapProps, map, clickEvent) {

  }

  render () {
    console.log(this.props)
    if (this.props.userToken === '') {
      return ''
    } else {
      return (
        <Map className='map'
             google={this.props.google}
             zoom={13}
             style={this.style}
             initialCenter={{
               lat: 49.444185,
               lng: 32.059224
             }}
             onReady={this.mapDidMount}
             onClick={this.mapClicked}>
          <Marker
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={{lat: 49.444155,
              lng: 32.053224}} />
          <Marker
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={{lat: 49.444355,
              lng: 32.053224}} />
        </Map>
      )
    }
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBRXasroqhwwn5Ie7cC0fGp4fpjYM1a0NU'),
})(MapContainer)
