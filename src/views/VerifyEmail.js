import React, {Component} from 'react';
import Header from '../components/Header';
import ViewNameBar from '../components/ViewNameBar';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {handleLogout} from "../actions/login";

class VerifyEmail extends Component{

  waitAndRedirect = () => {
    localStorage.removeItem('token'); //These 2 are required because the logout action takes places only after 4 seconds.the user can change url to /registration before those 4 seconds and he will break the system
    localStorage.removeItem('user_id');
    console.log("Will be redirected in 4 seconds");
    setTimeout(
      this.props.handleLogout,
      4000
    );
  }

  render(){
    return(
      <div>
        <Header/>
        <div style={{marginTop: 50}}>
          {ViewNameBar("Account Settings")}
          <div className="tabs col" style={{ fontSize: "x-large", fontWeight: 100, justifyContent: "space-around"}}>
            <span style={{textAlign: "center"}}>
              An Email has been sent to your registered Email Id. <br/>
              Please verify to proceed.
            </span>
            {this.waitAndRedirect()}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({handleLogout},dispatch);
}

export default connect(null, mapDispatchToProps)(VerifyEmail);
