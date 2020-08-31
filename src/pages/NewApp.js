import React from 'react';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';


import './newApp.css';
import Modal from '../shared/Modal';
import BackgroundShadow from '../shared/backgroundShadow';

const usersAPI = "http://localhost:2020/users/";

const rolesAPI = "http://localhost:2020/roles/";

class NewApp extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            showModalAddApp: false,
            error: "",
            users: [],
            title: this.props.location?.state?._id?.length > 0 ? this.props.location.state.title : "",
            shortName: this.props.location?.state?._id?.length > 0 ? this.props.location.state.shortName : "",
            description: this.props.location?.state?._id?.length > 0 ? this.props.location.state.description : "",
            user: this.props.location?.state?._id?.length > 0 ? this.props.location.state.userId : "",
            updateApp: this.props.location?.state?._id?.length > 0 ? true : false,
            _id: this.props.location?.state?._id?.length > 0 ? this.props.location?.state?._id : false
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

    setTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    setShortName = (e) => {
        this.setState({
            shortName: e.target.value
        })
    }

    setDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    setUser = (e) => {
        this.setState({
            user: e.target.value
        })
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
            APISaveApp = "http://localhost:2020/apps/" + this.state._id;
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
            APISaveApp = "http://localhost:2020/apps/create";
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
                <h1>{this.state.title.length > 0 ? "EDITAR APLICACION" : "AGREGAR NUEVA APLICACION"}</h1>
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
                            <label htmlFor="shortNameInput">Nombre Corto</label>
                            <input type="text" id="shortNameInput" value={this.state.shortName} onChange={this.setShortName} maxLength="6" />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="titleInput">Nombre</label>
                            <input className="pure-u-1-4" type="text" id="titleInput" value={this.state.title} onChange={this.setTitle} maxLength="25" />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="descriptionInput">Descripcion</label>
                            <textarea className="pure-u-3-4" type="text" id="descriptionInput" value={this.state.description} onChange={this.setDescription} maxLength="275"></textarea>
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

export default withRouter(NewApp)