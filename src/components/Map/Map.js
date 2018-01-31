/* global myMap, google, Polygon */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polygon } from 'google-maps-react'
import './Map.css'

class MapContainer extends Component {

  constructor (props) {
    super(props)
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.state = {
      title: '',
      description: ''
    }
  }

  onMarkerClick (props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  mapDidMount () {

  }

  mapClicked (mapProps, map, clickEvent) {
    let markers = []
    markers = this.props.markers
    markers.push({
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng(),
      title: '',
      description: ''
    })
    this.props.addMarker(markers)

    this.setState(this.state)
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
    console.log(this.state)
  }

  render () {
    const {title} = this.state.title
    const {description} = this.state.description
    if (this.props.userToken === '') {
      return ''
    } else {
      return (
        <div>
          <Map className='map'
               google={this.props.google}
               zoom={13}
               style={{height: '35%', width: '60%', position: 'static', float: 'left'}}
               initialCenter={{
                 lat: 49.444185,
                 lng: 32.059224
               }}
               onReady={this.mapDidMount}
               onClick={this.mapClicked.bind(this)}>

            {this.props.markers.map((element, index) => {
              return (<Marker
                key={index}
                id={index}
                title={element.title}
                name={element.description}
                position={{lat: element.lat, lng: element.lng}}/>)
            })}
          </Map>
          {this.props.markers.map((element, index) => {
            return (<div key={index} className="item">
              <input
                placeholder="Заголовок:"
                name="title"
                onChange={this.onChange}
                className="input-title"
                type='text'
              />
              <input
                placeholder="Описание:"
                name="description"
                onChange={this.onChange}
                className="description-title"
                type='text'
              />
            </div>)
          })}
        </div>)
    }
  }
}

MapContainer.propTypes = {
  changeStateProp: PropTypes.func.isRequired,
  addMarker: PropTypes.func.isRequired
}

MapContainer.defaultProps = {
  changeStateProp: () => {},
  addMarker: () => {}
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBRXasroqhwwn5Ie7cC0fGp4fpjYM1a0NU'),
})(MapContainer)
