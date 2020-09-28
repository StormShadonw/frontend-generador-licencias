import React from 'react';
import { withRouter } from 'react-router-dom';

import './resetPassword.css';
import APISERVER from "../../src/config";

let rolesAPI = APISERVER + "roles/";

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.location?.state?._id,
            firstName: this.props.location?.state?.firstName?.length > 0 ? this.props.location.state.firstName : "",
            lastName: this.props.location?.state?.firstName?.length > 0 ? this.props.location.state.lastName : "",
            sex: this.props.location?.state?.firstName?.length > 0 ? this.props.location.state.sex : "Femenino",
            telephoneNumber: this.props.location?.state?.firstName?.length > 0 ? this.props.location.state.telephoneNumber : "",
            email: this.props.location?.state?.firstName?.length > 0 ? this.props.location.state.email : "",
            apps: this.props.location?.state?.firstName?.length > 0 ? this.props.location.state.apps : [],
            showModalAddApp: false,
            updateUser: this.props.location?.state?.firstName?.length > 0 ? true : false,
            appID: "",
            appShortName: "",
            appTitle: "",
            appDescription: "",
            error: "",
            editApp: -1,
            password: "",
            repeetPassword:"",
            role: this.props.location?.state?.firstName?.length > 0 ? this.props.location.state.role : "",
            roles: []
        }
    }

    componentWillMount() {
        this.getRoles();
    }

    getRoles = () => {
        fetch(rolesAPI)
            .then((response) => {
                return response.json()
            }).then((rolesData) => {
                this.setState({
                    roles: rolesData,
                    isLoaded: true
                })
            }, (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
    }

    setPassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    setRepeetPassword = (e) => {
        this.setState({
            repeetPassword: e.target.value
        })
    }

    setFirstName = (e) => {
        this.setState({
            firstName: e.target.value
        })
    }

    setLastName = (e) => {
        this.setState({
            lastName: e.target.value
        })
    }

    setSex = (e) => {
        this.setState({
            sex: e.target.value
        })
    }

    setRole = (e) => {
        this.setState({
            role: e.target.value
        })
    }

    setTelephoneNumber = (e) => {
        this.setState({
            telephoneNumber: e.target.value
        })
    }

    setEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    cancel = () => {
        this.props.history.replace("/usuarios");
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        let createUser = true;
        this.setState({
            error: ""
        })
        if (this.state.password.length === 0 || this.state.repeetPassword.length === 0) {
            createUser = false;
            this.setState({
                error: "Faltan campos requeridos por llenar."
            })
        }
        if (this.state.password != this.state.repeetPassword) {
            createUser = false;
            this.setState({
                error: "La contraseña no coincide con la confirmación."
            })
        }
        if (createUser) {
            let requestOptions = {};
            let APISaveUser = "";
            if (this.state.updateUser) {
            APISaveUser = APISERVER + "users/resetPassword/" + this.state._id;
            requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    _id: this.state._id,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    sex: this.state.sex,
                    telephoneNumber: this.state.telephoneNumber,
                    email: this.state.email,
                    role: this.state.role
                })
            };
            }
            else {
            APISaveUser = APISERVER + "users/create";
            requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    sex: this.state.sex,
                    telephoneNumber: this.state.telephoneNumber,
                    email: this.state.email,
                    password: this.state.password,
                    role: this.state.role
                })
            };
            }

            fetch(APISaveUser, requestOptions)
                .then(response => response.json())
                .then(data => this.props.history.replace("/cambiar-contraseñas"));
        }

    }

    render() {
        return (
            <div className="newUserPage">
                {this.state.error.length !== 0 ? <div className="error errorAnimation">{this.state.error}</div> : ""}
                <h1>{this.state.firstName.length > 0 ? "RECUPERAR CONTRASEÑA" : "AGREGAR NUEVO USUARIO"}</h1>
                <form className="pure-form pure-form-aligned pure-u-1">
                    <fieldset>
                        <div className="pure-control-group">
                            <label htmlFor="firstNameInput">Usuario</label>
                            <input type="text" id="firstNameInput" value={this.state.firstName + " " + this.state.lastName} onChange={this.setFirstName} maxLength="25" disabled />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="passwordInput">Nueva Contraseña</label>
                            <input className="pure-u-1-4" type="password" id="passwordInput" value={this.state.password} onChange={this.setPassword} maxLength="35" />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="repeetPasswordInput">Confirmar contraseña</label>
                            <input className="pure-u-1-4" type="password" id="repeetPasswordInput" value={this.state.repeetPassword} onChange={this.setRepeetPassword} maxLength="35" />
                        </div>
                    </fieldset>
                    <div className="pure-control-group final-pure-control-group">
                        <input className="pure-button pure-button-primary" onClick={this.onSubmitForm} type="submit" value="GUARDAR" />
                        <input className="pure-button pure-button-danger" onClick={this.cancel} type="submit" value="CANCELAR" />
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(ResetPassword)