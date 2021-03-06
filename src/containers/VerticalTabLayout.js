import React, {Component} from 'react';
import ViewNameBar from '../components/ViewNameBar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dashboardActions from '../actions/dashboard';
import { VisibleOnlyAdmin } from '../utils/authWrappers.js';

import { Link } from 'react-router';

const tabs = [{name: "Product Upload", route: "/dashboard", icon: "pt-icon-cloud-upload", color: "#7ba428"}, {name: "Bulk Upload", route: "/dashboard/bulkUpload", icon: "pt-icon-th", color: "#7ba428"}, {name: "Upload History", route: "/dashboard/uploadHistory", icon: "pt-icon-history", color: "#c97f7f"}, {name: "Manage Inventory", route: "/dashboard/inventory", icon: "pt-icon-box", color: "#e5e500"}, {name: "Orders", route: "/dashboard/orders", icon: "pt-icon-projects", color: "#7fbafd"}, {name: "Returns/Replacements", route: "/dashboard/returns", icon: "pt-icon-swap-horizontal", color: "#c17196"}, {name: "Completed Orders", route: "/dashboard/completed", icon: "pt-icon-saved", color: "#aceace"}, {name: "Payments", route: "/dashboard/payment", icon: "pt-icon-credit-card", color: "#ffb6c1"} ];

class VerticalTabLayout extends Component{
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
  }

  handleChange(tab){
    this.props.selectDashboardTab(tab);
  }

  renderTabs(item, index) {
    let className = (this.props.currentTab === index)? "verticalTab active" : "verticalTab";
    let tab = <Link to={item.route} style={{ textDecoration: "none"}} key={index}>
                <div className={className} onClick={()=>{this.handleChange(index);}}>
                  <span className={item.icon} style={{marginRight: 10, color: item.color}}/>
                  {(!this.props.collapsed)? item.name : ""}
                </div>
              </Link>
    const OnlyAdminLink = VisibleOnlyAdmin( () => tab );
    return (index === 0)?
      tab
      :
      <OnlyAdminLink key={index}/>
  }

  collapseVerticalTabBar = () => {
    this.props.collapseVerticalTabBar(!this.props.collapsed);
  }

  render(){
    let collapsedClassName = (this.props.collapsed)? "collapsed" : "";
    return(
        <div className="verticalTabLayout">
          <div className={`verticalTabBar ${collapsedClassName}`}>
            <div className="verticalTab" style={{borderBottom: "1px solid #2e3344"}} key="99" onClick={this.collapseVerticalTabBar}>
              <span className={(this.props.collapsed)? "pt-icon-menu-open" : "pt-icon-menu-closed" } style={{marginRight: 10, color: "white"}}/>
            </div>
            {tabs.map(this.renderTabs)}
          </div>

          <div className= {`verticalTabPanel ${collapsedClassName}`}>
            {ViewNameBar(tabs[this.props.currentTab].name)}
            {this.props.children}
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentTab: state.dashboard.currentTab,
    collapsed: state.dashboard.collapsed
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators( dashboardActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalTabLayout);
