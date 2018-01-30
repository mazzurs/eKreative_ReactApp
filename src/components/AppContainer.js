import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../actions'
import App from './App'

const mapStateToProps = ({main: {userToken}}, ownProps) => {
  return {
    userToken,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    ...bindActionCreators({changeStateProp}, dispatch),

    changeStateProp: function (prop, value, reducer) {
      console.log(prop, value, reducer)

      changeStateProp(prop, value, reducer)(dispatch)
      return null
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
