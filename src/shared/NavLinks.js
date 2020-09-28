import React from "react";
import { NavLink, Link } from 'react-router-dom';

import "./NavLinks.css";

class NavLinks extends React.Component {
  render() {
    return (
      <div className="pure-menu pure-menu-horizontal">
        <ul className="pure-menu-list">
          <li className="pure-menu-item pure-menu-selected">
            <NavLink className="navLink" to="/home" onClick={this.props.onClick}>
              APLICACIONES
            </NavLink>
          </li>
          <li className="pure-menu-item pure-menu-selected">
            <NavLink className="navLink" to="/licencias" onClick={this.props.onClick}>
              LICENCIAS
            </NavLink>
          </li>
          <li className="pure-menu-item pure-menu-selected">
            <NavLink className="navLink" to="/usuarios" onClick={this.props.onClick}>
              USUARIOS
            </NavLink>
          </li>
          <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
            <NavLink className="navLink" to="/configuracion" onClick={this.props.onClick}>
              CONFIGURACION
           </NavLink>
            <ul class="pure-menu-children">
              <li class="pure-menu-item">
                <Link className="pure-menu-link pure-menu-subLink navLink" to="/cambiar-contraseñas" onClick={this.props.onClick}>
                  Cambiar Contraseñas
                 </Link>
              </li>
            </ul>
          </li>
          <li className="pure-menu-item pure-menu-selected">
            <Link className="navLink" to="/" onClick={this.props.signOut}>
              CERRAR SESION
          </Link>
          </li>
        </ul>
      </div>
    );
  }
}




export default NavLinks;