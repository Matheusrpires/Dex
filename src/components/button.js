import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Button extends Component {

  handleOnclick = () => {
      this.props.handleEvent();
  }

  render() {

    const btn_class = {
      fontFamily: "Open Sans",
      fontSize: "16px",
      fontWeight: "600",
      letterSpacing: "1px",
      lineHeight: "19px",
      width: "95px",
      textAlign: "center",
      color: `white`,
    }

    const btn_class2 = {
      color: "#4A4A4A",
      fontFamily: "Open Sans",
      fontSize: "16px",
      fontWeight: "600",
      letterSpacing: "1px",
      lineHeight: "19px",
      textAlign: "center",
    }

    const btn = {
      border: " 1px solid #9B9B9B",
      width: "350px",
      height: "33px",
      textAlign: "center",
      paddingTop: "12px",
      margin: '35px 0px'
    }
    
    const background = {
      backgroundImage: "linear-gradient(134.72deg, #AE23A9 0%, #DC4E1B 100%)",
      border: " 1px solid #9B9B9B",
      width: "350px",
      height: "33px",
      textAlign: "center",
      paddingTop: "12px",
      margin: '35px 0px'
    }
    
    return (
      <React.Fragment>
        {
          this.props.type === "color" ?
        <div onClick={this.handleOnclick} style={background}>
          <Link to="/food" style={btn_class} onClick={this.handleOnclick}>{this.props.children}</Link>
        </div>
        :
        <div onClick={this.handleOnclick} style={btn}>
          <Link to="/food" style={btn_class2} onClick={this.handleOnclick}>{this.props.children}</Link>
        </div>
        }
      </React.Fragment>
    )
  }
}

export default Button;