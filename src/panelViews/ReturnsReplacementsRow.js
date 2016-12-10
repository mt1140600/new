import React, {Component} from 'react';
import PlainSelect from '../components/PlainSelect';
import CheckboxWrapper from '../components/CheckboxWrapper';

class ReturnsReplacmentsRow extends Component{
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
      <div key={index} style={{}}>{index}. {item}</div>
    );
  }

  render(){
    return(
      <div className="tableRow" style={{display:"flex"}}>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.returnDate}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.orderDate}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.productDetails}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.qty}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.type}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.reasonForReturn}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{}}>
            {this.props.value.currentStatus}
            <div className="pt-button-group pt-vertical" style={{paddingRight: "10px"}}>
              <button type="button" className="pt-button pt-active">Confirm Item</button>
              <button type="button" className="pt-button">Reject Item</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

ReturnsReplacmentsRow.propTypes = {
  value: React.PropTypes.object,
}

export default ReturnsReplacmentsRow;
