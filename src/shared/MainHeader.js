import React from "react";
import {withRouter} from 'react-router-dom';

import MenuMovil from "./MenuMovil";
import "./MainHeader.css";
import NavLinks from "./NavLinks";
import SideMenuPanel from "./SideMenuPanel";
import BackgroundShadow from "./backgroundShadow";
import logo from '../assets/logo.png'

class MainHeader extends React.Component {
  openMenuMovil = () => {
    this.setState({
      menuSidePanel: true,
    });
  };

  signOut = () => {
    window.localStorage.removeItem("userLogin");
    this.props.history.replace("/");
  }

  closeMenuMovil = () => {
    this.setState({
      menuSidePanel: false,
    });
  };

  constructor() {
    super();

    this.state = {
      menuSidePanel: false,
    };
  }

  render() {
    return (
      <React.Fragment>
        {this.state.menuSidePanel && (
          <BackgroundShadow onClick={() => this.closeMenuMovil()}></BackgroundShadow>
        )}
        <SideMenuPanel show={this.state.menuSidePanel} onClick={this.closeMenuMovil}></SideMenuPanel>
        <div className="mainHeader">
          <div className="mainHeaderLeft">
            <MenuMovil onClick={() => this.openMenuMovil()}></MenuMovil>
            <div className="logo"><img alt="logo" src={logo} /></div>
          </div>
          <div className="mainHeaderRigth">
            <NavLinks signOut={this.signOut}></NavLinks>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(MainHeader);