import React from 'react';
import { withRouter } from 'react-router-dom';

import './newApp.css';
import APISERVER from "../../src/config";

const usersAPI = APISERVER + "users/";

const rolesAPI = APISERVER + "roles/";

const appsAPI = APISERVER + "apps/";


class NewLicense extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            showModalAddApp: false,
            error: "",
            users: [],
            apps: [],
            licenseId: "",
            licenseKey: "",
            startDate: new Date(),
            endDate: new Date(),
            user: "",
            app: "",
            showAppsSelect: "display-none",
            updateApp: this.props.location?.state?._id?.length > 0 ? true : false,
            _id: this.props.location?.state?._id?.length > 0 ? this.props.location?.state?._id : false
        }
    }

    componentWillMount() {
        // this.getRoles();
        this.getUsers();
    }

    getAppsByUser = (userId) => {
        fetch(appsAPI + "appsByUser/" + userId)
            .then((response) => {
                return response.json()
            }).then((appsData) => {
                this.setState({
                    apps: appsData,
                    isLoaded: true
                })
            }, (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
    }

    getUsers = () => {
        fetch(usersAPI)
            .then((response) => {
                return response.json()
            }).then((usersData) => {
                this.setState({
                    users: usersData,
                    isLoaded: true
                })
            }, (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
    }

    setLicenseId = (e) => {
        this.setState({
            licenseId: e.target.value
        })
    }

    setLicenseKey = (e) => {
        this.setState({
            licenseKey: e.target.value
        })
    }

    setStartDate = (e) => {
        this.setState({
            startDate: e.target.value
        })
    }

    setEndDate = (e) => {
        this.setState({
            endDate: e.target.value
        })
    }

    setUser = (e) => {
        this.setState({
            user: e.target.value,
            showAppsSelect: "display-initial"
        });
        setTimeout(() => {
            console.log(this.state.user)
            this.getAppsByUser(this.state.user);
        },50);

    }

    setApp = (e) => {
        this.setState({
            app: e.target.value,
        });
    }


    cancel = () => {
        this.props.history.replace("/home");
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        let createApp = true;
        this.setState({
            error: ""
        })
        if (this.state.title.length === 0 || this.state.shortName.length === 0 || this.state.description.length === 0) {
            createApp = false;
            this.setState({
                error: "Faltan campos requeridos por llenar."
            });
        }
        if (createApp) {
            let requestOptions = {};
            let APISaveApp = "";
            console.log(this.state.description);
            if (this.state.updateApp) {
            APISaveApp = APISERVER + "apps/" + this.state._id;
            requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    _id: this.state._id,
                    appShortName: this.state.shortName,
                    appTitle: this.state.title,
                    appDescription: this.state.description,
                    appUser: this.state.user
                })
            };
            }
            else {
            APISaveApp = APISERVER + "apps/create";
            requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    appShortName: this.state.shortName,
                    appTitle: this.state.title,
                    appDescription: this.state.description,
                    appUser: this.state.user
                })
            };
            }
            fetch(APISaveApp, requestOptions)
                .then(response => response.json())
                .then(data => this.props.history.replace("/home"));
        }

    }

    render() {
        return (
            <div className="newUserPage">
                {this.state.error.length !== 0 ? <div className="error errorAnimation">{this.state.error}</div> : ""}
                <h1>AGREGAR NUEVA APLICACION</h1>
                <form className="pure-form pure-form-aligned pure-u-1">
                    <fieldset>
                        <legend>Datos Personales</legend>
                        <div className="pure-control-group">
                            <label htmlFor="userInput">Usuario</label>
                            <select name="userInput" id="userInput" value={this.state.user} onChange={this.setUser}>
                                {this.state.users.map((user) => {
                                    return(
                                    <option key={user._id} value={user._id}>{user.name + " " + user.lastName}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="users">Usuario</label>
                            <select name="users" id="users" value={this.state.user} onChange={this.setUser}>
                                {this.state.apps.map((user) => {
                                    return(
                                    <option key={user._id} value={user._id}>{`${user.name} ${user.lastName}`}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className={`pure-control-group ${this.state.showAppsSelect}`}>
                            <label htmlFor="apps">Aplicación</label>
                            <select name="apps" id="apps" value={this.state.app} onChange={this.setApp}>
                                {this.state.apps.map((app) => {
                                    return(
                                    <option key={app._id} value={app._id}>{app.appName}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="licenseId">Identificador Licencia</label>
                            <input type="text" id="licenseId" value={this.state.licenseId} onChange={this.setLicenseId} maxLength="6" />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="startDate">Fecha de Inicio</label>
                            <input className="pure-u-1-4" type="date" id="startDate" value={this.state.startDate} onChange={this.setStartDate} />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="endDate">Fecha de Fin</label>
                            <input className="pure-u-1-4" type="date" id="endDate" value={this.state.endDate} onChange={this.setEndDate} />
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

export default withRouter(NewLicense)