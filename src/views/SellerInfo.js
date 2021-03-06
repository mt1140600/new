import React, {Component} from 'react';
import { Button, FocusStyleManager, Spinner } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledSelect from '../components/LabelledSelect';
import CheckboxWrapper from '../components/CheckboxWrapper';
import PlainSelect from '../components/PlainSelect';
import LabelledCheckboxGroup from '../components/LabelledCheckboxGroup';
import * as constants from '../constants';
import * as fieldValidations from '../utils/fieldValidations';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateSellerInfo, updateTabValidation} from '../actions/registration';
import {actionTabChange} from '../actions/registration';
import {storeSubForm} from '../utils';
import * as _ from 'lodash';
import {prevActionTabChange} from '../actions/registration';

FocusStyleManager.onlyShowFocusOnTabs();

class SellerInfo extends Component {

  constructor(props) {
    super(props);
    this.pincodeToAddress = this.pincodeToAddress.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.updateOperationalHours = this.updateOperationalHours.bind(this);
    this.state = { copyAddress: false, showSpinner: false };
  }

  updateInfo(field, value, vState) {
      if(field == "pincode" && value.length === 6)
        this.pincodeToAddress(value);
      // this.validationState = Object.assign({},this.validationState,{[`${field}`]:vState});
      this.props.updateSellerInfo(field, value, vState);
  }

  updateOperationalHours(field, value) {
    let newOperationalHours = [...this.props.sellerInfo.value.operationalHours];
    newOperationalHours[field] = value;
    this.updateInfo("operationalHours",newOperationalHours,true);
  }

  fillCityState(obj){
    this.props.updateSellerInfo("city", _.startCase(_.toLower(obj.districtname)), true);
    this.props.updateSellerInfo("state", _.startCase(_.toLower(obj.statename)), true);
  }

  pincodeToAddress(pincode) {
    console.log("Getting address corresponding to pincode: "+pincode);
    var getAddress = new XMLHttpRequest();
    var url = constants.pincodeToAddress+pincode;
    console.log(url);
    // var url = fileUrl;
    getAddress.open("GET", url, true); //!!Note if you don't add http:// to the url, it will append the current url to the begining of the string eg. http://localhost:3000
    getAddress.onload = () => {
      if(getAddress.status === 200){
        // console.log(getAddress.response);  //returns a string, parse to json
        console.log(JSON.parse(getAddress.response));
        this.fillCityState(JSON.parse(getAddress.response));
      }
      else{
        console.log("Something went wrong; Status: "+getAddress.status);
      }
    }
    getAddress.send(null);
  }

  copyAddress = () => {
    this.props.updateSellerInfo("wadd1", this.props.sellerInfo.value.add1, this.props.sellerInfo.vState.add1);
    this.props.updateSellerInfo("wadd2", this.props.sellerInfo.value.add2, this.props.sellerInfo.vState.add2);
    this.props.updateSellerInfo("wstate", this.props.sellerInfo.value.state, this.props.sellerInfo.vState.state);
    this.props.updateSellerInfo("wcity", this.props.sellerInfo.value.city, this.props.sellerInfo.vState.city);
    this.props.updateSellerInfo("wpincode", this.props.sellerInfo.value.pincode, this.props.sellerInfo.vState.pincode);
  }

  componentWillUnmount(){
    this.props.prevActionTabChange(this.props.currentTab);
  }

  handleCopyAddress = () => {
    if(!this.state.copyAddress){
      console.log("copying address");
      this.copyAddress();
    }
    this.setState({copyAddress: !this.state.copyAddress});
  }

  handleContinue = () => {
    this.setState({showSpinner: true});
    const mapToDbObj = {
      store_name: this.props.sellerInfo.value.storeName,
      business_type: this.props.sellerInfo.value.businessType,
      product_category: this.props.sellerInfo.value.category,
      address_pincode:  this.props.sellerInfo.value.pincode,
      address_address_l1: this.props.sellerInfo.value.add1,
      address_address_l2: this.props.sellerInfo.value.add2,
      address_city: this.props.sellerInfo.value.city,
      address_state:  this.props.sellerInfo.value.state,
      warehouse_pincode:  this.props.sellerInfo.value.wpincode,
      warehouse_address_l1: this.props.sellerInfo.value.wadd1,
      warehouse_address_l2: this.props.sellerInfo.value.wadd2,
      warehouse_city: this.props.sellerInfo.value.wcity,
      warehouse_state:  this.props.sellerInfo.value.wstate,
      warehouse_active_days:  this.props.sellerInfo.value.workingDays,
      warehouse_active_hours: this.props.sellerInfo.value.operationalHours
    };

      const successHandler = () => { //When passing this function as an argument to another function, although arrow function does not set context, this fucntion's context is the SellerInfo component class?
        console.log("successHandler");
        console.log(this.props.updateTabValidation);
        this.setState({showSpinner: false});
        this.props.updateTabValidation(1, true);
        this.props.actionTabChange(2);
      }
      const failureHandler = (response) => {
        this.setState({showSpinner: false});
        console.log("failureHandler");
        console.log(response);
      }

      const subFormValid = storeSubForm(this.props.sellerInfo, this.props.updateSellerInfo, this.props.updateTabValidation.bind(null, 1, false), mapToDbObj, constants.saveForm, successHandler, failureHandler);

      if(!subFormValid) this.setState({showSpinner: false});
  }

  render() {
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Tell us about your business </h2>
            <br/>

            <LabelledTextInput
              value={this.props.sellerInfo.value.storeName}
              onChange={this.updateInfo.bind(this,"storeName")}
              validationState={this.props.sellerInfo.vState.storeName}
              validate={fieldValidations.validateMandatoryString}
              helpText={"Name of business is mandatory"}>
              Name of business
            </LabelledTextInput>

            <LabelledSelect
              options={["Choose Type", ...constants.businessType]}
              value={this.props.sellerInfo.value.businessType}
              onChange={this.updateInfo.bind(this,"businessType")}
              validationState={this.props.sellerInfo.vState.businessType}
              validate={fieldValidations.validateSelect.bind(null,"Choose Type")}
              helpText={"Choose a valid type"}>
              Type of business
            </LabelledSelect>

            <LabelledSelect
              options={["Choose Primary Category", ...constants.productCategories]}
              value={this.props.sellerInfo.value.category}
              onChange={this.updateInfo.bind(this,"category")}
              validationState={this.props.sellerInfo.vState.category}
              validate={fieldValidations.validateSelect.bind(null,"Choose Primary Category")}
              helpText={"Choose a valid category"}>
              Product Category
            </LabelledSelect>
            <br/>

            <h4>Enter your address</h4>

            <LabelledTextInput
              value={this.props.sellerInfo.value.pincode}
              onChange={this.updateInfo.bind(this,"pincode")}
              validationState={this.props.sellerInfo.vState.pincode}
              validate={fieldValidations.validatePincode}
              helpText={"Pincode must be a valid 6 digit number"}>
              Pin Code
            </LabelledTextInput>

            <LabelledTextInput
              value={this.props.sellerInfo.value.add1}
              onChange={this.updateInfo.bind(this,"add1")}
              validationState={this.props.sellerInfo.vState.add1}
              validate={fieldValidations.validateMandatoryString}
              helpText={"Address Line 1 is mandatory"}>
              Address Line 1
            </LabelledTextInput>

            <LabelledTextInput
              value={this.props.sellerInfo.value.add2}
              onChange={this.updateInfo.bind(this,"add2")}
              validationState={this.props.sellerInfo.vState.add2}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Address Line 2
            </LabelledTextInput>

            <LabelledSelect
              options={["Choose State", ...constants.states]}
              value={this.props.sellerInfo.value.state}
              onChange={this.updateInfo.bind(this,"state")}
              validationState={this.props.sellerInfo.vState.state}
              validate={fieldValidations.validateSelect.bind(null,"Choose State")}
              helpText={"Choose a valid state"}>
              State
            </LabelledSelect>
            <br/>

            <LabelledTextInput
              value={this.props.sellerInfo.value.city}
              onChange={this.updateInfo.bind(this,"city")}
              validationState={this.props.sellerInfo.vState.city}
              validate={fieldValidations.validateMandatoryString}
              helpText={"City is mandatory"}>
              City
            </LabelledTextInput>

            <CheckboxWrapper
              value={this.state.copyAddress}
              onChange={this.handleCopyAddress}
              style={{margin:"auto"}}>My warehouse address is same as above</CheckboxWrapper>
            <br/>

            <h2>Warehouse Details</h2>
            <br/>

            <LabelledTextInput
              value={this.props.sellerInfo.value.wpincode}
              onChange={this.updateInfo.bind(this,"wpincode")}
              validationState={this.props.sellerInfo.vState.wpincode}
              validate={fieldValidations.validatePincode}
              helpText={"Pincode must be a valid 6 digit number"}>
              Pin Code
            </LabelledTextInput>

            <LabelledTextInput
              value={this.props.sellerInfo.value.wadd1}
              onChange={this.updateInfo.bind(this,"wadd1")}
              validationState={this.props.sellerInfo.vState.wadd1}
              validate={fieldValidations.validateMandatoryString}
              helpText={"Address Line 1 is mandatory"}>
              Warehouse Address Line 1
            </LabelledTextInput>

            <LabelledTextInput
              value={this.props.sellerInfo.value.wadd2}
              onChange={this.updateInfo.bind(this,"wadd2")}
              validationState={this.props.sellerInfo.vState.wadd2}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Warehouse Address Line 2
            </LabelledTextInput>

            <LabelledSelect
              options={["Choose State", ...constants.states]}
              value={this.props.sellerInfo.value.wstate}
              onChange={this.updateInfo.bind(this,"wstate")}
              validationState={this.props.sellerInfo.vState.wstate}
              validate={fieldValidations.validateSelect.bind(null,"Choose State")}
              helpText={"Choose a valid state"}>
              State
            </LabelledSelect>

            <br/>

            <LabelledTextInput
              value={this.props.sellerInfo.value.wcity}
              onChange={this.updateInfo.bind(this,"wcity")}
              validationState={this.props.sellerInfo.vState.wcity}
              validate={fieldValidations.validateMandatoryString}
              helpText={"City is mandatory"}>
              City
            </LabelledTextInput>
            <br/>
            <label className="pt-label pt-inline">
              Operational Hours
              <div style={{float:"right"}}>
                <PlainSelect
                  options={constants.operationalHours}
                  value={this.props.sellerInfo.value.operationalHours[0]}
                  onChange={this.updateOperationalHours.bind(this,0)}/>
                <PlainSelect
                  options={["am","pm"]}
                  value={this.props.sellerInfo.value.operationalHours[1]}
                  onChange={this.updateOperationalHours.bind(this,1)}/>
                <span> to</span>
                <PlainSelect
                  options={constants.operationalHours}
                  value={this.props.sellerInfo.value.operationalHours[2]}
                  onChange={this.updateOperationalHours.bind(this,2)}/>
                <PlainSelect
                  options={["am","pm"]}
                  value={this.props.sellerInfo.value.operationalHours[3]}
                  onChange={this.updateOperationalHours.bind(this,3)}/>
              </div>
            </label>
            <br/>
            <LabelledCheckboxGroup
              options={constants.daysOfTheWeek}
              groupColumns={2}
              value={this.props.sellerInfo.value.workingDays}
              onChange={this.updateInfo.bind(this,"workingDays")}
              validationState={this.props.sellerInfo.vState.workingDays}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Working Days
            </LabelledCheckboxGroup>
            <br/>

            <Button
              className="pt-intent-primary"
              style={{width:"200px",margin:"auto"}}
              onClick={this.handleContinue}>
              Continue
            </Button>

            {(this.state.showSpinner)?<div style={{margin: "auto", marginTop:"10px"}}><Spinner className="pt-small"/></div>:null}

          </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sellerInfo : state.sellerInfo,
    currentTab : state.registrationPrevTab
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({prevActionTabChange, updateSellerInfo, updateTabValidation, actionTabChange }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerInfo);
