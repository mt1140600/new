import React, {Component} from 'react';

export default class OrderByWidget extends Component{

  // constructor(props){
  //   super(props);
  //   this.state = { active: props.value };
  // }

  handleClick = () => {
    // (this.state.active === 1)? this.setState({active: 2}) : this.setState({active: 1});
    this.props.handleChange();
  }
  //
  // componentWillReceiveProps(nextProps){
  //   if(nextProps.value !== this.state.active)
  //     this.setState({active: nextProps.value});
  // }

  render(){
    let dynamicClassName = null;
    switch(this.props.value){
      case 0: dynamicClassName = "pt-icon-double-caret-vertical";
      break;
      case 1: dynamicClassName = "pt-icon-caret-down";
      break;
      case 2: dynamicClassName = "pt-icon-caret-up";
      break;
      default: dynamicClassName = "pt-icon-double-caret-vertical";
      break;
    }
    if(this.props.visible === true)
      return(
        <div className = {"pt-icon-standard "+dynamicClassName} onClick={this.handleClick}></div>
      );
    else
      return null;
  }
}

OrderByWidget.propTypes = {
  handleChange: React.PropTypes.func,
  visible: React.PropTypes.bool,
  value: React.PropTypes.number
}

OrderByWidget.defaultProps = {
  visible: true,
  value: 0
}
