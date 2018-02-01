import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../../actions'
import { addMarker, removeMarker, editMarker, editLat, editLng, replaceMarkers } from '../../actions/main'
import Map from './Map'

const mapStateToProps = ({main: {userToken, markers}}, ownProps) => {
  return {
    userToken,
    markers,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    ...bindActionCreators({changeStateProp, addMarker, removeMarker, editMarker, editLat, editLng, replaceMarkers}, dispatch),

    changeStateProp: function (prop, value, reducer) {

      changeStateProp(prop, value, reducer)(dispatch)
      return null
    },

    addMarker: function (lat, lng, title, description) {
      addMarker(lat, lng, title, description)(dispatch)
      return null
    },

    removeMarker: function (markers, id) {
      removeMarker(markers, id)(dispatch)
      return null
    },

    editMarker: function (type, value, id) {
      editMarker(type, value, id)(dispatch)
      return null
    },

    editLat: function (lat, markerId) {
      editLat(lat, markerId)(dispatch)
      return null
    },

    editLng: function (lng, idMarker) {
      editLng(lng, idMarker)(dispatch)
      return null
    },

    replaceMarkers: function (oldIndex, newIndex, oldMarker, newMarker) {
      replaceMarkers(oldIndex, newIndex, oldMarker, newMarker)(dispatch)
      return null
    }
  }
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer