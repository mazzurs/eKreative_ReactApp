/* global myMap, google, Polygon */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polygon } from 'google-maps-react'
import './Map.css'
var ReactDragList = require('react-drag-list');

class MapContainer extends Component {

  constructor (props) {
    super(props)
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.remove = this.remove.bind(this)
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

  onChange = (e, type, id) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
    console.log(this.state)

    this.props.editMarker(e.currentTarget.attributes.name.value, e.target.value, id)
  }

  onMouseoverMarker (props, marker, e) {
    let target = document.getElementById(props.id)
    target.classList.add('target')
  }

  onMouseout (props, marker, e) {
    let target = document.getElementById(props.id)
    target.classList.remove('target')
  }

  onMouseUp (map, mapProps, markerProps) {
    this.props.editLat(markerProps.latLng.lat(), map.id)
    this.props.editLng(markerProps.latLng.lng(), map.id)
  }

  remove (e) {
    this.props.removeMarker(this.props.markers, e.target.parentElement.getAttribute('id'))
    const state = this.props.markers
    this.setState({markers: state})
  }

  onListUpdate (event) {
    this.props.replaceMarkers(event.oldIndex, event.newIndex, this.props.markers[event.oldIndex], this.props.markers[event.newIndex])
    this.setState(this.state)
  }

  render () {
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
                position={{lat: element.lat, lng: element.lng}}
                onMouseover={this.onMouseoverMarker}
                onMouseout={this.onMouseout}
                onMouseup={this.onMouseUp.bind(this)}
                draggable/>)
            })}
          </Map>

          <ReactDragList
            onUpdate={this.onListUpdate.bind(this)}
            dataSource={this.props.markers}
            row={(record, index) => <div id={index} className="item">

              <input
                value={this.props.markers[index].title}
                placeholder="Заголовок:"
                name="title"
                onChange={(e)=>{this.onChange(e, name, index)}}
                className="input-title"
                type='text'
              />
              <input
                value={this.props.markers[index].description}
                placeholder="Описание:"
                name="description"
                onChange={(e)=>{this.onChange(e, name, index)}}
                className="description-title"
                type='text'
              />
              <input onClick={this.remove.bind(this)} type="button" className="delete" value="Удалить"></input>

            </div>}
          />
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
