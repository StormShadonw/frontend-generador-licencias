import React from 'react';
import { withRouter } from 'react-router-dom';

import APISERVER from "../../src/config";
import './login.css';
import logo from '../assets/logo.png';


class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            emailInvalid: "",
            passwordInvalid: ""
        }
    }

    setEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    setPassword = (e) => {
        this.setState({ password: e.target.value });
    }

    login = (e) => {
        e.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        if (email.length > 1 || password.length > 1) {
            const APISaveApp = APISERVER + 'users/login';
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: this.state.email,
                    userPassword: this.state.password
                })
            };
            fetch(APISaveApp, requestOptions)
                .then((response) => {
                    return response.json()
                })
                .then((user) => {
                    console.log(user);
                    if (user != null && Object.entries(user).length > 0) {
                        this.setState({
                            passwordInvalid: "",
                            emailInvalid: "",
                            error: ""
                        });
                        let userLoged = {
                            user: email,
                            role: user.role 
                        }
                        document.getElementsByTagName("body")[0].className = "background2";
                        localStorage.setItem("userLogin", JSON.stringify(userLoged));
                        this.props.history.replace("/home");
                    }
                    else {
                        this.setState({
                            error: "El usuario o la contrasena no son validos."
                        })
                    }
                });
        } else {
            this.setState({
                passwordInvalid: "passwordInvalid",
                emailInvalid: "emailInvalid",
                error: "Debe de llenar los campos de usuario y contrasena."
            });
        }

    }

    render() {
        document.getElementsByTagName("body")[0].className = "background"
        let userSession = localStorage.getItem("userLogin");
        if (userSession != null) {
            document.getElementsByTagName("body")[0].className = "background2";
            this.props.history.replace("/home");
        }
        return (
            <React.Fragment>
                <div className="login-modal">

                    <form>
                        <div className="logo">
                            <img src={logo} alt="Logo Empresa" />
                        </div>
                        <div className={`form-control ${this.state.emailInvalid}`}>
                            <label htmlFor="email">Correo</label>
                            <input id="email" type="text" value={this.state.email} onChange={this.setEmail} required />
                        </div>
                        <div className={`form-control ${this.state.passwordInvalid}`}>
                            <label htmlFor="password">Contraseña</label>
                            <input id="password" type="password" value={this.state.password} onChange={this.setPassword} required />
                        </div>
                        <div className="form-control">
                            <button id="login" type="submit" onClick={this.login}>INGRESAR</button>
                        </div>
                    </form>

                </div>

                {this.state.error ? <p className="error">{this.state.error}</p> : null}
            </React.Fragment>
        )
    }
}

export default withRouter(Login);