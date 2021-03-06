import React, {Component} from 'react';
import { Menu, MenuItem, Popover, Position } from "@blueprintjs/core";
import * as firebase from 'firebase';

let textInput = null;

class LabelledAutoComplete extends Component {

  constructor(props){
    super(props);
      this.state = { options: props.options, input: ""};
  }

  componentWillReceiveProps(nextProps){
    this.setState({options: nextProps.options});
  }

  handleSelect = (value, updateDb) => {
    this.props.onSelect(value, true); //setting value, validation true
    if(updateDb){
      firebase.database().ref(this.props.dbPath+"/"+value).set({name: value, verified: false});
    }
  }

  renderOptions = (item, index) => {
    if(item.indexOf('++') === 0){ //To add new Option
      item = item.slice(3, item.length);
      //TODO: API call to add new option
      return(
          <MenuItem key={index} text={item} iconName="pt-icon-add-to-artifact" onClick={this.handleSelect.bind(null, item, true)}/>
      );
    }

    return(
      <MenuItem intent="primary" key={index} text={item} onClick={this.handleSelect.bind(null, item, false)}/>
    );
  }

  popoverOpened(){
    setTimeout(() => {textInput.focus();}, 200);  //can't use instance variable this.textInput cuz, Popover component might be setting local context
    // defaultOption.click();
  }

  onChange = (event) => {
    let newOptions = [];
    let found = false;
    let value = event.target.value;

    for(let i = 0; i < this.props.options.length; i++){
      if(this.props.options[i].toLowerCase().indexOf(value.trim().toLowerCase()) > -1){
        newOptions.push(this.props.options[i]);
        if(this.props.options[i].toLowerCase() === value.trim().toLowerCase())
          found = true;
      }
    }

    if(this.props.dbPath && found === false && value.trim().length > 0){ //If dbPath is given, provision to add option if it doesn't already exist
      newOptions.push(`++ ${value}`);
    }

    this.setState({input: value, options: newOptions});
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
      <div style={this.props.style}>
        <label className="pt-label pt-inline" style={{display: "flex", marginBottom: 0}}>
          {
            (this.props.children)?
              <div style={{flex: 1}}>
                {this.props.children}
              </div>
            :
              null
          }
          <div style={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
            <Popover content={compassMenu} position={Position.BOTTOM_RIGHT} popoverDidOpen={this.popoverOpened}>
                <button className="pt-button" type="button" style={{minWidth: 100}}>
                  {this.props.value}
                  <span className="pt-icon-standard pt-icon-caret-down pt-align-right"></span>
                </button>
            </Popover>
          </div>
        </label>
        {
          !this.props.vState &&
          <div className="helpText" style={{flexBasis: "100%"}}>Choose an option</div>
        }
      </div>
    );
  }

}

LabelledAutoComplete.propTypes = {
    children: React.PropTypes.string,
    options: React.PropTypes.array,
    value: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    vState: React.PropTypes.bool,
    //handleSelect = (value) => {
    // this.setState({value: value})
    // }
    style: React.PropTypes.object,
    dbPath: React.PropTypes.string
}

LabelledAutoComplete.defaultProps = {
    options: [],
    value: "",
    vState: true,
    onSelect: () => null,
}

export default LabelledAutoComplete;
