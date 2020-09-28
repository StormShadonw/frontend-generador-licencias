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
            _id: this.props.location?.state?._id?.length > 0 ? this.props.location?.state?._id : false,
            codesCantity: 0
        }
    }

    componentWillMount() {
        // this.getRoles();
        this.getUsers();
    }

    setCodesCantity = (e) => {
        this.setState({
            codesCantity: e.target.value
        })
    }

    getAppsByUser = (userId) => {
        console.log(appsAPI + "appsByUser/" + userId)
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
            showAppsSelect: "display-block"
        });
        this.getAppsByUser(e.target.value);
    }

    setApp = (e) => {
        console.log(e.target.value)
        this.setState({
            app: e.target.value,
        });
    }


    cancel = () => {
        this.props.history.replace("/licencias");
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        let createLicense = true;
        this.setState({
            error: ""
        })
        console.log(this.state.codesCantity,
            this.state.user.length,
            this.state.app.length,
            this.state.licenseId.length,
            this.state.startDate.length,
            this.state.endDate.length)
        if (this.state.codesCantity === 0 || this.state.user.length === 0 || this.state.app.length === 0 || this.state.licenseId.length === 0 || this.state.startDate.length === 0 || this.state.endDate.length === 0) {
            createLicense = false;
            this.setState({
                error: "Faltan campos requeridos por llenar."
            });
        }

        if (this.state.startDate > this.state.endDate) {
            createLicense = false;
            this.setState({
                error: "La fecha de inicio no puede ser mayor a la de fin."
            });
        }

        if (this.state.codesCantity > 255) {
            createLicense = false;
            this.setState({
                error: "La cantidad de codigos es muy alta, no puede ser mayor a 255 por licencia."
            });
        }

        if (createLicense) {
            let requestOptions = {};
            let APISaveApp = "";
            console.log(this.state.description);
            if (this.state.updateApp) {
            APISaveApp = APISERVER + "licenses/" + this.state._id;
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
            APISaveApp = APISERVER + "licenses/create";
            console.log(this.state.app);
            requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    app: this.state.app,
                    licenseId: this.state.licenseId,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    licenseUser: this.state.user,
                    codesCantity: this.state.codesCantity
                })
            };
            }
            fetch(APISaveApp, requestOptions)
                .then(response => response.json())
                .then(data => this.props.history.replace("/licencias"));
        }

    }

    render() {
        return (
            <div className="newUserPage">
                {this.state.error.length !== 0 ? <div className="error errorAnimation">{this.state.error}</div> : ""}
                <h1>GENERAR NUEVA LICENCIA</h1>
                <form className="pure-form pure-form-aligned pure-u-1">
                    <fieldset>
                        <legend>Datos Personales</legend>
                        <div className="pure-control-group">
                            <label htmlFor="userInput">Usuario</label>
                            <select name="userInput" id="userInput" value={this.state.user} onChange={this.setUser}>
                                <option key="default" value="default">Seleccione un Usuario</option>
                                {this.state.users.map((user) => {
                                    return(
                                    <option key={user._id} value={user._id}>{user.name + " " + user.lastName}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className={`pure-control-group ${this.state.showAppsSelect}`}>
                            <label htmlFor="apps">Aplicación</label>
                            <select name="apps" id="apps" value={this.state.app} onChange={this.setApp}>
                                <option key='default' value='default'>Seleccione una App</option>
                                {this.state.apps.map((app) => {
                                    console.log(this.state.apps)
                                    return(
                                    <option key={app._id} value={app._id}>{app.appTitle}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="licenseId">Identificador Licencia</label>
                            <input type="text" id="licenseId" value={this.state.licenseId} onChange={this.setLicenseId} maxLength="12" />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="startDate">Fecha de Inicio</label>
                            <input className="pure-u-1-4" type="date" id="startDate" value={this.state.startDate} onChange={this.setStartDate} />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="endDate">Fecha de Fin</label>
                            <input className="pure-u-1-4" type="date" id="endDate" value={this.state.endDate} onChange={this.setEndDate} />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="codesCantity">Cantidad de equipos</label>
                            <input className="pure-u-1-4" type="number" max="255" id="codesCantity" value={this.state.codesCantity} onChange={this.setCodesCantity} />
                        </div>
                    </fieldset>
                    <div className="pure-control-group final-pure-control-group">
                        <input className="pure-button pure-button-primary" onClick={this.onSubmitForm} type="submit" value="GENERAR" />
                        <input className="pure-button pure-button-danger" onClick={this.cancel} type="submit" value="CANCELAR" />
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(NewLicense)