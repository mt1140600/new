import React, {Component} from 'react';
import CheckboxWrapper from '../components/CheckboxWrapper';
import LabelledSelect from '../components/LabelledSelect';
import {productCategories} from '../constants';
import * as fieldValidations from '../utils/fieldValidations';
import ReactPaginate from 'react-paginate';
import PlainSelect from '../components/PlainSelect';
import TableHeaders from '../components/TableHeaders'


class OrdersDispatchedRow extends Component{
  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
    this.splitArrayIntoLines = this.splitArrayIntoLines.bind(this);
  }

  onChange(){
    return null;
  }

  splitArrayIntoLines(item, index){
    return(
      <div key={index} style={{paddingBottom:"5px"}}>{index+1}. {item}</div>
    );
  }

  render(){
    return(
      <div className="tableRow" style={{display:"flex"}}>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.date}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.dispatchID}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"8"}}>
          <div style={{display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
            {this.props.value.items.map(this.splitArrayIntoLines)}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"1"}}>
          <div style={{display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
            {this.props.value.qty.map(this.splitArrayIntoLines)}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {this.props.value.dispatchPartner}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {this.props.value.status}
          </div>
        </div>

      </div>
    );
  }
}

OrdersDispatchedRow.propTypes = {
  value: React.PropTypes.object,
}


class DispatchedOrders extends Component{

  constructor(){
    super();
    this.cellLabels = ["Date","Dispatch ID", "Items", "Qty", "Dispatch Partner", "Status"];
    this.tableHeaders = [{label: "Date", width: 2}, {label: "DispatchID", width: 2}, {label: "Items", width: 8}, {label: "Qty", width: 1}, {label: "Dispatch Partner", width: 4}, {label: "Status", width: 4}];
    this.orders = [{date:"28 Nov 2016", dispatchID:"#123456789", items:["Micromax f2552 Full Metal Alchemist", "Steel Series W-Q30 Cover", "Baba Ganoush Ramdev Tempered Glass"], qty:["40", "30", "10"], dispatchPartner: "Fedex", status: "Pickup scheduled at 1:30pm"}];
  }

  renderRows = (item, index) => {
    return(
      <OrdersDispatchedRow value={item} key={index} />
    );
  }

  render(){
    return(
      <div>
        <br/>
        <div style={{display:"flex", justifyContent:"flex-end"}}>
          <div className="pt-input-group .modifier">
            <span className="pt-icon pt-icon-search"></span>
            <input className="pt-input" type="search" placeholder="Search input" dir="auto" />
          </div>
        </div>
        <br/>

        <TableHeaders tableHeaders={this.tableHeaders} />

          {this.orders.map(this.renderRows)}

          <div id="react-paginate">
            <ReactPaginate previousLabel={"<"}
             nextLabel={">"}
             breakLabel={<a href="">...</a>}
             breakClassName={"break-me"}
             pageCount={10}
             marginPagesDisplayed={2}
             pageRangeDisplayed={2}
             onPageChange={()=>null}
             containerClassName={"pagination"}
             subContainerClassName={"pages pagination"}
             activeClassName={"active"} />
          </div>
      </div>
    );
  }

}

export default DispatchedOrders;
