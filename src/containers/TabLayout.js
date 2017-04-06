import React, {Component} from 'react';
import {Tabs, TabList, Tab, TabPanel} from "@blueprintjs/core";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import VerifyOtp from '../views/VerifyOtp';
import SellerInfo from '../views/SellerInfo';
import TaxDetails from '../views/TaxDetails';
import PaymentDetails from '../views/PaymentDetails';
import POCDetails from '../views/POCDetails';
import AddInfo from '../views/AddInfo';
import TnC from '../views/TnC';
import {actionTabChange, loadForm, prevActionTabChange} from '../actions/registration';


require('velocity-animate');
require('velocity-animate/velocity.ui');
var effects1 = ['slideLeft','slideRight', 'fade'];
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


const tabs      = ["Mobile Verification", "Seller Information",  "Tax Details",  "Payment Details",  "Point of Contact", "Additional Information", "Terms & Conditions"];
const tabPanels = [     VerifyOtp,            SellerInfo,          TaxDetails,    PaymentDetails,       POCDetails,            AddInfo,                    TnC];

class TabLayout extends Component {
  constructor() {
    super();
    this.effects = effects1[0];
    this.isIn = true;
    this.renderTabs = this.renderTabs.bind(this);
    this.renderTabPanels = this.renderTabPanels.bind(this);
  }
  
  renderTabs(item, index) {
    let dynamicClassName = (this.props.tabValidation[index] === false)?"pt-icon-small-cross red":(this.props.tabValidation[index]===true)?"pt-icon-small-tick green": "pt-icon-caret-right";
    return(
      <Tab key={index} isSelected={true} className={dynamicClassName}>{item}</Tab>
    );
  }
  
  renderTabPanels(item, index) {
    if(this.props.prevTabIndex<=this.props.currentTab){
      var animation = "slide";
    }
    else
      var animation = "slide1";
    
    let DynamicTabPanel = item; //Not using item directly as JSX requires First letter to be capitalised
    return(
      <TabPanel key={index}> 
           <ReactCSSTransitionGroup
          transitionName={animation}
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>

            <DynamicTabPanel/>
          
          </ReactCSSTransitionGroup>        
      </TabPanel>
    );
  }
  
  componentWillMount(){
    const script = document.createElement("script");

    script.src = "https://fb.me/react-with-addons-0.13.3.min.js";
    script.async = true;

    document.body.appendChild(script);
    // setTimeout(this.props.actionTabChange.bind(null,0),100); //hack to fix tab line. Not required now. Problem was arising because we were requiring css in index.js.  Now we are linking css from html. The Tab component requires css to be loaded prior to it for proper functioning
    this.props.loadForm();
  }

  handleTabChange = (selectedTab) => {
    this.isIn = !this.isIn;
    this.props.actionTabChange(selectedTab);
  }

  render() {
    return(           
        <Tabs className="tabs1" selectedTabIndex={this.props.currentTab} onChange={this.handleTabChange}>
          <TabList className="pt-large" style={{padding: "0px 20px 0px 20px"}}>
            {tabs.map(this.renderTabs)}
          </TabList>          
            {tabPanels.map(this.renderTabPanels)} 
        </Tabs>  
                 
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentTab : state.registrationCurrentTab,
    tabValidation: state.tabValidation,
    prevTabIndex : state.registrationPrevTab
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({prevActionTabChange, actionTabChange, loadForm}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TabLayout);
