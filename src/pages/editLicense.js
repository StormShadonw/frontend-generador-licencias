import React from 'react';
import { withRouter } from 'react-router-dom';

import './editLicense.css';
import APISERVER from "../../src/config";

const usersAPI = APISERVER + "licenses/";

const rolesAPI = APISERVER + "licenses/";

class EditLicense extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            showModalAddApp: false,
            error: "",
            users: [],
            app: this.props.location?.state?.appId?.length > 0 ? this.props.location.state.app : "",
            appId: this.props.location?.state?.appId?.length > 0 ? this.props.location.state.appId : "",
            licenseId: this.props.location?.state?.licenseId?.length > 0 ? this.props.location.state.licenseId : "",
            cantity: this.props.location?.state?.licenseId?.length > 0 ? this.props.location.state.cantity : "",
            startDate: this.props.location?.state?.licenseId?.length > 0 ? this.props.location.state.startDate : "",
            endDate: this.props.location?.state?.licenseId?.length > 0 ? this.props.location.state.endDate : "",
            updateApp: this.props.location?.state?._id?.length > 0 ? true : false,
            _id: this.props.location?.state?._id?.length > 0 ? this.props.location?.state?._id : false,
            userName: this.props.location?.state?._id?.length > 0 ? this.props.location?.state?.userName : false
        }
    }

    componentWillMount() {
        // this.getRoles();
        this.getUsers();
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
            title: e.target.value
        })
    }

    setCantity = (e) => {
        this.setState({
            cantity: e.target.value
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


    cancel = () => {
        this.props.history.replace("/licencias");
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        let createApp = true;
        this.setState({
            error: ""
        })
        if (this.state.cantity < 0 || this.state.startDate.length === 0 || this.state.endDate.length === 0) {
            createApp = false;
            this.setState({
                error: "Faltan campos requeridos por llenar."
            });
        }
        if (createApp) {
            let requestOptions = {};
            let APISaveApp = "";
            if (this.state.updateApp) {
                APISaveApp = APISERVER + "licenses/" + this.state._id;
                // + "/" + this.state.app[0]._id
                requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        _id: this.state._id,
                        cantity: this.state.cantity,
                        startDate: this.state.startDate,
                        endDate: this.state.endDate
                    })
                };
            }
            else {
                APISaveApp = APISERVER + "licenses/create";
                requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        cantity: this.state.cantity,
                        startDate: this.state.startDate,
                        endDate: this.state.endDate
                    })
                };
            }
            console.log(APISaveApp);
            fetch(APISaveApp, requestOptions)
                .then(response => response.json())
                .then(data => this.props.history.replace("/licencias"));
        }

    }

    render() {
        console.log(this.state.app[0]._id);
        const dStartDate = new Date(new Date(this.state.startDate).getTime() + (1000 * 60 * 60 * 24));
        let mm = (dStartDate.getMonth() + 1) >= 10 ? (dStartDate.getMonth() + 1) : "0" + (dStartDate.getMonth() + 1);
        let dd = dStartDate.getDate() >= 10 ? dStartDate.getDate() : "0" + dStartDate.getDate();
        let yy = dStartDate.getFullYear();
        const startDateString = `${yy}-${mm}-${dd}`;
        const dEndDate = new Date(new Date(this.state.endDate).getTime() + (1000 * 60 * 60 * 24));
        mm = (dEndDate.getMonth() + 1) >= 10 ? (dEndDate.getMonth() + 1) : "0" + (dEndDate.getMonth() + 1);
        dd = dEndDate.getDate() >= 10 ? dEndDate.getDate() : "0" + dEndDate.getDate();
        yy = dEndDate.getFullYear();
        const endDateString = `${yy}-${mm}-${dd}`;
        return (
            <div className="newUserPage">
                {this.state.error.length !== 0 ? <div className="error errorAnimation">{this.state.error}</div> : ""}
                <h1>EDITAR LICENCIA</h1>
                <form className="pure-form pure-form-aligned pure-u-1">
                    <fieldset>
                        <legend>Datos Generales</legend>
                        <div className="pure-control-group">
                            <label htmlFor="userName">Usuario</label>
                            <input className="pure-u-2-5" type="text" id="userName" value={this.state.userName} onChange={this.setLicenseId} maxLength="6" disabled />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="appShortName">App</label>
                            <input type="text" id="appShortName" value={this.state.app[0].appShortName} onChange={this.setLicenseId} maxLength="6" disabled />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="licenseId">ID Licencia</label>
                            <input type="text" id="licenseId" value={this.state.licenseId} onChange={this.setLicenseId} maxLength="6" disabled />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="cantity">Cantidad Licencias</label>
                            <input type="number" id="cantity" value={this.state.cantity} onChange={this.setCantity} />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="startDate">Fecha Inicio</label>
                            <input className="pure-u-1-4" type="date" id="startDate" value={startDateString} onChange={this.setStartDate} />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="endDate">Fecha Fin</label>
                            <input className="pure-u-1-4" type="date" id="endDate" value={endDateString} onChange={this.setEndDate} />
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

export default withRouter(EditLicense)