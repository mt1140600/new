import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/login';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import Callout from '../components/Callout';
import Logo from '../components/Logo';


FocusStyleManager.isActive();

class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      showCallout: false,
      calloutText:""
    };
  }

  goBack = () => {
      this.props.dispatch(push('/'));
  }

  handleFieldUpdate = (field, event) => {
    this.setState({[`${field}`]:event.target.value});
  }

  validateEmail = (email)  =>{
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  handleReset= () => {
    if (this.state.email == '') {
      this.setState({showCallout:true, calloutText:"Please fill all the fields"});
    } else {
      if (!this.validateEmail(this.state.email)) {
        this.setState({showCallout:true, calloutText:"Please enter valid email"});
      } else {
        this.setState({showCallout:false});
        this.props.actions.handleReset(this.state.email);
      }
    }

  }

  handleEnter = (event) =>{
    if(event.keyCode == 13) this.handleReset();
  }

  componentWillReceiveProps(nextProps){
    this.setState({showCallout: nextProps.userData.showCallout, calloutText: nextProps.userData.calloutText});
  }

  render() {
    return(
      <div className="container">

        <div className="col" style={{textAlign:"center", minWidth:"300px", paddingTop:"20px"}}>

          <Logo/>
          <br/>
          <div className="pt-control-group pt-vertical item">
          <span  className="item" style={{color:"grey", marginBottom:"5px"}}>Input your email to reset your password</span>

            <div className="pt-input-group pt-large " >
              <input type="text" className="pt-input" placeholder="Email ID" value={this.state.email} onChange={this.handleFieldUpdate.bind(this, "email")} onKeyUp={this.handleEnter} />
            </div>
          </div>
          <br/>
          <Button className="pt-intent-primary pt-button-height-large item" onClick={this.handleReset} >Send</Button>
          <Callout text={this.state.calloutText} visible={this.state.showCallout} />
          <br/>
          <Button onClick={this.goBack} className="pt-intent-warning item">Go Back</Button>
          <br/>
          <p style={{marginTop:"15px", fontSize:"12px"}} className="item pt-text-muted">© 2016 Cerise Internet Technologies Pvt. Ltd.</p>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);