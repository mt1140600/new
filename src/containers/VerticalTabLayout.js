import React, {Component} from 'react';
import {Tabs, TabList, Tab, TabPanel} from "@blueprintjs/core";
import ViewNameBar from '../components/ViewNameBar';

import UploadProduct from '../panelViews/UploadProduct';
import Orders from '../panelViews/OrdersPanel';
import Returns from '../panelViews/Returns';
import Completed from '../panelViews/Completed';
import Payment from '../panelViews/Payment';

const tabs      = ["Product Upload","Orders","Returns/Replacements","Completed Orders","Payments"];
const tabPanels = [UploadProduct,     Orders,   Returns,                Completed ,     Payment];

class VerticalTabLayout extends Component{
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.renderTabPanels = this.renderTabPanels.bind(this);
    this.state={currentTab: 0};
  }

  handleChange(tab){
    this.setState({currentTab: tab});
  }

  renderTabs(item, index){
    return(
      <div className="verticalTab" key={index} onClick={()=>{this.handleChange(index);}}>{item}</div>
    );
  }

  renderTabPanels(item,index){
    let DynamicComponent = item;
    if(this.state.currentTab === index){
      return(
        <DynamicComponent key={index}/>
      );
    }
    else return null;
  }

  render(){
    return(
      <div className="pageLayout">
        {ViewNameBar(tabs[this.state.currentTab])}
        <div className="verticalTabLayout">
          <div className="verticalTabBar">
            {tabs.map(this.renderTabs)}
          </div>
          <div className="verticalTabPanel">
            {tabPanels.map(this.renderTabPanels)}
          </div>
        </div>
      </div>
    );
  }
}

export default VerticalTabLayout;
