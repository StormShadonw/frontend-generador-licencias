import React from 'react';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';


import './newUser.css';
import Modal from '../shared/Modal';
import BackgroundShadow from '../shared/backgroundShadow';
import EditButton from '../assets/edit-button.png';
import DeleteButton from '../assets/delete-button.png';
import AddButton from '../assets/add-button.png';

// const API = "http://localhost:2020/users/";

let rolesAPI = "http://localhost:2020/roles/";

class newUser extends React.Component {


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

    setAppShortName = (e) => {
        this.setState({
            appShortName: e.target.value
        })
    }

    setAppID = (e) => {
        this.setState({
            appID: e.target.value
        })
    }

    setAppName = (e) => {
        this.setState({
            appTitle: e.target.value
        })
    }

    setAppDescription = (e) => {
        this.setState({
            appDescription: e.target.value
        })
    }

    addAppHandler = (e) => {
        e.preventDefault();
        this.setState({
            showModalAddApp: true,
            appDescription: "",
            appTitle: "",
            appShortName: ""
        });
    }

    addApp = () => {

        if (this.state.appTitle.length === 0 || this.state.appDescription.length === 0 || this.state.appShortName.length === 0) {
            this.setState({
                error: "No todos los campos requeridos estan llenos"
            });
            return false;
        }

        if (this.state.editApp < 0) {
            let appsOld = this.state.apps;
            appsOld.push({
                appID: this.state.appID,
                appShortName: this.state.appShortName,
                appTitle: this.state.appTitle,
                appDescription: this.state.appDescription,
                modified: false,
                create: true
            });

            this.setState({
                apps: appsOld,
                showModalAddApp: false,
                appID: "",
                appShortName: "",
                appTitle: "",
                appDescription: "",
                error: ""
            })
        }
        else {
            let appOld = this.state.apps[this.state.editApp];
            appOld.appID = this.state.appID;
            appOld.appShortName = this.state.appShortName;
            appOld.appTitle = this.state.appTitle;
            appOld.appDescription = this.state.appDescription;
            appOld.modified = true;
            appOld.create = false;

            this.setState({
                // apps: appsOld,
                showModalAddApp: false,
                appID: "",
                appShortName: "",
                appTitle: "",
                appDescription: "",
                editApp: -1,
                error: ""
            })
        }

    }

    closeModal = () => {
        this.setState({
            error: "",
            showModalAddApp: false
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

    fillModalWithAppInfo = (index) => {
        let app = this.state.apps[index]
        this.setState({
            showModalAddApp: true,
            appShortName: app.appShortName,
            appName: app.appTitle,
            appDescription: app.appDescription,
            editApp: index
        });
    }

    deleteThisApp = (indexApp) => {
        let newApps = this.state.apps;
        newApps.splice(indexApp, 1);
        console.log(newApps);
        this.setState({
            apps: newApps
        })
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        let createUser = true;
        this.setState({
            error: ""
        })
        if (this.state.email.match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/) === null) {
            createUser = false;
            this.setState({
                error: "El correo no es valido."
            })
        }
        if (this.state.telephoneNumber.match(/\d?\s?-?\(?(\d){3}\)?\s?-?(\d){3}\s?-?(\d){4}/gm) === null) {
            createUser = false;
            this.setState({
                error: "El numero de telefono digitado no es valido."
            })
        }
        if (this.state.firstName.length === 0 || this.state.lastName.length === 0 || this.state.sex.length === 0 || this.state.telephoneNumber.length === 0 || this.state.email.length === 0) {
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
            APISaveUser = "http://localhost:2020/users/" + this.state._id;
            console.log(APISaveUser);
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
            APISaveUser = "http://localhost:2020/users/create";
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
                .then(data => this.props.history.replace("/usuarios"));
        }

    }

    render() {
        return (
            <div className="newUserPage">
                {this.state.error.length !== 0 ? <div className="error errorAnimation">{this.state.error}</div> : ""}
                <h1>{this.state.firstName.length > 0 ? "EDITAR USUARIO" : "AGREGAR NUEVO USUARIO"}</h1>
                <form className="pure-form pure-form-aligned pure-u-1">
                    <fieldset>
                        <legend>Datos Personales</legend>
                        <div className="pure-control-group">
                            <label htmlFor="firstNameInput">Nombres</label>
                            <input type="text" id="firstNameInput" value={this.state.firstName} onChange={this.setFirstName} maxLength="25" />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="lastNameInput">Apellidos</label>
                            <input type="text" id="lastNameInput" value={this.state.lastName} onChange={this.setLastName} maxLength="35" />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="sexInput">Sexo</label>
                            <select name="sex" id="sexInput" value={this.state.sex} onChange={this.setSex}>
                                <option value="F">Femenino</option>
                                <option value="M">Masculino</option>
                            </select>
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="telephoneNumberInput">Numero de Telefono</label>
                            <input type="text" id="telephoneNumberInput" value={this.state.telephoneNumber} onChange={this.setTelephoneNumber} maxLength="25" />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="emailInput">Email</label>
                            <input className="pure-u-2-5" type="text" id="emailInput" value={this.state.email} onChange={this.setEmail} maxLength="35" />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="passwordInput">Contraseña</label>
                            <input className="pure-u-1-4" type="password" id="passwordInput" value={this.state.password} onChange={this.setPassword} maxLength="35" />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="repeetPasswordInput">Confirmar contraseña</label>
                            <input className="pure-u-1-4" type="password" id="repeetPasswordInput" value={this.state.repeetPassword} onChange={this.setRepeetPassword} maxLength="35" />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="roleInput">Rol</label>
                            <select name="roleInput" id="roleInput" value={this.state.role} onChange={this.setRole}>
                                {this.state.roles.map((rol) => {
                                    return(
                                    <option key={rol.role} value={rol.role}>{rol.role}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </fieldset>
                    {/* <fieldset>
                        <legend>
                            Aplicaciones
                        </legend>
                        <div className="pure-control-group appsButton">
                            <button onClick={this.addAppHandler} id="addAppsButton" className="button-secondary pure-button"><img src={AddButton} /></button>
                        </div>
                        <table className="pure-table pure-table-horizontal">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre corto</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.apps.length > 0 ? this.state.apps.map((app, indexApp) => {
                                    return (
                                        <tr key={indexApp}>
                                            <td>{indexApp + 1}</td>
                                            <td>{app.appShortName}</td>
                                            <td>{app.appTitle}</td>
                                            <td>{app.appDescription}</td>
                                            <td>
                                                <div className="actionsButtons">
                                                    <img src={EditButton} className="editButton appsActionsButton" onClick={() => this.fillModalWithAppInfo(indexApp)} />
                                                    <img src={DeleteButton} className="deleteButton appsActionsButton" onClick={() => this.deleteThisApp(indexApp)} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }) : <tr></tr>}
                            </tbody>

                        </table>
                    </fieldset> */}
                    <div className="pure-control-group final-pure-control-group">
                        <input className="pure-button pure-button-primary" onClick={this.onSubmitForm} type="submit" value="GUARDAR" />
                        <input className="pure-button pure-button-danger" onClick={this.cancel} type="submit" value="CANCELAR" />
                    </div>
                </form>
                <CSSTransition
                    in={this.state.showModalAddApp}
                    timeout={200}
                    classNames="fade-in"
                    mountOnEnter
                    unmountOnExit>
                    <BackgroundShadow></BackgroundShadow>
                </CSSTransition>
                <CSSTransition in={this.state.showModalAddApp} timeout={600} classNames="slide-in-down" mountOnEnter unmountOnExit>
                    <Modal closeModal={this.closeModal} header={
                        <h1>AGREGAR NUEVA APLICACION</h1>
                    } body={
                        <form className="pure-form pure-form-aligned pure-u-1">
                            <div className="pure-control-group">
                                <label htmlFor="shortName">Nombre corto</label>
                                <input className="pure-u-1-4" value={this.state.appShortName} onChange={this.setAppShortName} maxLength="25" type="text" id="shortName" />
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="appName">nombre de la app</label>
                                <input className="pure-u-1-4" value={this.state.appTitle} onChange={this.setAppName} maxLength="25" type="text" id="appName" />
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="AppDescription">Descripción de la app</label>
                                <textarea className="pure-u-3-4" value={this.state.appDescription} onChange={this.setAppDescription} maxLength="150" id="AppDescription"></textarea>
                            </div>
                        </form>
                    } footer={
                        <button className="pure-button pure-button-primary" onClick={() => this.addApp()}>AGREGAR</button>
                    }></Modal>
                </CSSTransition>

            </div>
        )
    }
}

export default withRouter(newUser)