import React from "react";
import ReactDom from "react-dom";
import { CSSTransition } from 'react-transition-group';

import "./SideMenuPanel.css";
import NavLinks from "./NavLinks";

class SideMenuPanel extends React.Component {
  render() {
    return ReactDom.createPortal(
      <CSSTransition in={this.props.show} timeout={200} classNames="slide-in-left" mountOnEnter unmountOnExit>
        <div className="side-menu-panel">
          <NavLinks onClick={this.props.onClick}></NavLinks>
        </div>
      </CSSTransition>
      ,
      document.getElementById("menu-side-panel")
    );
  }
}

export default SideMenuPanel;
