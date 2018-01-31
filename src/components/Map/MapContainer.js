import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../../actions'
import { addMarker } from '../../actions/main'
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

    ...bindActionCreators({changeStateProp, addMarker}, dispatch),

    changeStateProp: function (prop, value, reducer) {

      changeStateProp(prop, value, reducer)(dispatch)
      return null
    },

    addMarker: function (lat, lng, title, description) {
      console.log(lat, lng, title, description)
      addMarker(lat, lng, title, description)(dispatch)
      return null
    }
  }
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer