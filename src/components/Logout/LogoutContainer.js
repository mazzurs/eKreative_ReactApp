import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../../actions'
import { logout } from '../../actions/main'
import Logout from './Logout'

const mapStateToProps = ({main: {userToken}}, ownProps) => {
  return {
    userToken,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({changeStateProp, logout}, dispatch)
  }
}

const LogOutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout)

export default LogOutContainer