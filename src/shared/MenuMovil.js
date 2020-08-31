import React from "react";

import './MenuMovil.css';

class MenuMovil extends React.Component {
  render() {
    return (
      <div className="menuMovil" onClick={this.props.onClick}>
        <span />
        <span />
        <span />
      </div>
    );
  }
}

export default MenuMovil;
