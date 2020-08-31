import React from "react";
import {NavLink, Link} from 'react-router-dom';

import "./NavLinks.css";

class NavLinks extends React.Component {
  render() {
    return (
      <div className="navLinks">
        <NavLink className="navLink" to="/home" onClick={this.props.onClick}>
          APLICACIONES
        </NavLink>
        <NavLink className="navLink" to="/licencias" onClick={this.props.onClick}>
          LICENCIAS
        </NavLink>
        <NavLink className="navLink" to="/usuarios" onClick={this.props.onClick}>
          USUARIOS
        </NavLink>
        <Link className="navLink" to="/" onClick={this.props.signOut}>
          CERRAR SESION
        </Link>
      </div>
    );
  }
}




export default NavLinks;