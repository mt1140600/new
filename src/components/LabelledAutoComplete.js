import React, {Component} from 'react';
import { Menu, MenuDivider, MenuItem, Popover, Position } from "@blueprintjs/core";

let textInput = null;
let defaultOption = null;

class LabelledAutoComplete extends Component {

  constructor(props){
    super(props);
      this.state = { options: props.options, input: ""};
  }

  handleSelect = (value) => {
    this.props.onSelect(value);
  }

  renderOptions = (item, index) => {
    if(item.indexOf('++') === 0){ //To add new Option
      item = item.slice(3, item.length);
      //TODO: API call to add new option
      return(
          <MenuItem key={index} text={item} iconName="pt-icon-add-to-artifact" onClick={this.handleSelect.bind(null, item)}/>
      );
    }

    return(
      <MenuItem ref={(input)=>{defaultOption = input;}} intent="primary" key={index} text={item} onClick={this.handleSelect.bind(null, item)}/>
    );
  }

  popoverOpened(){
    setTimeout(() => {textInput.focus();}, 200);  //can't use instance variable this.textInput cuz, Popover component might be setting local context
    // defaultOption.click();
    console.log(defaultOption);
  }

  onChange = (event) => {
    let newOptions = [];
    let found = false;

    for(let i = 0; i < this.props.options.length; i++){
      if(this.props.options[i].toLowerCase().indexOf(event.target.value.toLowerCase()) > -1){
        newOptions.push(this.props.options[i]);
        if(this.props.options[i].toLowerCase() === event.target.value.toLowerCase())
          found = true;
      }
    }

    if(found === false && event.target.value.length > 0){ //provision to add option if it doesn't already exist
      newOptions.push(`++ ${event.target.value}`);
    }

    this.setState({input: event.target.value, options: newOptions});
  }

  render(){
    const compassMenu = (
      <div>
        <div style={{padding: "5px 5px 5px 5px", backgroundColor: "whitesmoke"}}>
          <input ref={(input)=>{textInput = input;}} className="pt-input pt-input-blueShadowDisable" style={{width: "100%"}} value={this.state.input} onChange={this.onChange}/>
        </div>
        <Menu className="dropDown">
          {this.state.options.map(this.renderOptions)}
        </Menu>
      </div>
    );
    return (
      <label  className="pt-label pt-inline" style={{display: "flex"}}>
        <div style={{flex: 1}}>
          {this.props.children}
        </div>
        <div style={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
          <Popover content={compassMenu} position={Position.BOTTOM_RIGHT} popoverDidOpen={this.popoverOpened}>
              <button className="pt-button" type="button" style={{}}>
                {this.props.value}
                <span className="pt-icon-standard pt-icon-caret-down pt-align-right"></span>
              </button>
          </Popover>
        </div>
      </label>
    );
  }

}

LabelledAutoComplete.propTypes = {
    children: React.PropTypes.string,
    options: React.PropTypes.array,
    value: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    //handleSelect = (value) => {
    // this.setState({value: value})
    // }
    style: React.PropTypes.object
}

LabelledAutoComplete.defaultProps = {
    options: ["Reebok", "Nike", "Power", "Umbro", "Woodland", "Adidas"],
    value: "Woodland",
    onSelect: () => null,
}

export default LabelledAutoComplete;
