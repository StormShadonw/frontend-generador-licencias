import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import EditButton from '../assets/edit-button.png';
import DeleteButton from '../assets/delete-button.png';
import APISERVER from "../../src/config";
import './licenses.css';

const API = APISERVER + "licenses/";
const APIAppsByName = APISERVER + "licenses/";
let rolesAPI = APISERVER + "roles/";
const APIApps = APISERVER + "licenses/";


class Licenses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            apps: [],
            inputSearch: "",
            appTitle: "",
            appShotName: "",
            appDescription: "",
            appToUpdate: {}
        }
    }

    getApps = () => {
        fetch(API)
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
            });
    }

    getAppsByName = (appName) => {
        fetch(APIAppsByName + appName)
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

    getAppById = (appId) => {
        fetch(APIApps + appId)
            .then((response) => {
                return response.json()
            }).then((app) => {
                this.setState({
                    isLoaded: true,
                    appToUpdate: app
                });
            }, (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
    }

    closeModal = () => {
        this.setState({
            showModalAddUser: false
        })
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

    editApp = (licenseId, userId) => {
        let app = this.state.apps.filter(license => license._id == licenseId);
        this.props.history.push({
            pathname: '/licencias/editar',
            state: {
                _idUser: app[0].appUser,
                _id: app[0]._id,
                licenseId: app[0].licenseId,
                cantity: app[0].cantity,
                startDate: app[0].startDate,
                endDate: app[0].endDate,
                appId: app[0].appUser,
                app:app[0].app,
                userName: app[0].userFirstName + " " + app[0].userLastName
            }
        })
    }

    setInputSearch = (e) => {
        this.setState({
            inputSearch: e.target.value
        });
    }
    setTelephoneNumber = (e) => {
        this.setState({
            userTelephoneNumber: e.target.value
        });
    }

    onSubmitSearch = (e) => {
        e.preventDefault();
        this.getAppsByName(this.state.inputSearch);
    }

    deleteThisApp = (userId) => {
        let sure = window.confirm("Seguro que desea eliminar esta licencia?");
        if (sure) {
            fetch(API + "/delete/" + userId, {
                method: "put"
            })
                .then((response) => {
                    return response.json()
                }).then((appsData) => {
                    this.getApps();
                }, (error) => {
                })
        }
    }

    componentDidMount() {
        this.getApps();
    }

    render() {
        let userSession = localStorage.getItem("userLogin");
        console.log(userSession);
        if (userSession === null) {
            this.props.history.replace("/");
        }
        return (
            <div className="appsPage">
                {!this.state.isLoaded ? <div className="cargando"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div> : ""}
                <h2>Licencias</h2>
                <div className="add_user">
                    <Link to="/licencias/nueva">
                        <button>+</button>
                    </Link>
                </div>
                <div className="apps">
                    <form className="pure-form searchUsers" onSubmit={this.onSubmitSearch}>
                        <label htmlFor="inputSearch">Buscar por nombre:</label>
                        <input name="inputSearch" type="text" className="pure-input-rounded inputSearch" value={this.state.inputSearch} onChange={this.setInputSearch} />
                        <button type="submit" className="pure-button button-secondary">BUSCAR</button>
                    </form>
                    <table className="pure-table pure-table-horizontal pure-table-striped table">
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th>ID Licencia</th>
                                <th>App licenciada</th>
                                <th>Usuario</th>
                                <th>Cantidad Total</th>
                                <th>Cantidad usada</th>
                                <th>Fecha inicio</th>
                                <th>Fecha final</th>
                                <th>dias faltantes</th>
                                <th>fecha creada</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.apps.map((app, indexApp) => {
                                console.log(this.state.apps)
                                    return (
                                        <tr key={app._id}>
                                            {/* <td>{this.state.indexApps}</td> */}
                                            <td>{app.licenseId}</td>
                                            <td>{app.app[0]?.appTitle}</td>
                                            <td>{app.userFirstName + " " + app.userLastName}</td>
                                            <td>{app.cantity}</td>
                                            <td>{app.cantityUsed}</td>
                                            <td>{new Date(new Date(app.startDate).getTime() + (1000*60*60*24)).toLocaleDateString()}</td>
                                            <td>{new Date(new Date(app.endDate).getTime() + (1000*60*60*24)).toLocaleDateString()}</td>
                                            <td>{(new Date() >= new Date(app.startDate) ? Math.ceil((new Date(app.endDate) - new Date()) / (1000*60*60*24)) : (new Date(app.endDate) - new Date(app.startDate)) / (1000*60*60*24) )}</td>
                                            <td>{new Date(app.createdDate).toLocaleDateString()}</td>
                                            <td>
                                                <div className="actionsButtons">
                                                    <img src={EditButton} className="editButton usersActionsButton" onClick={() => this.editApp(app._id, app.appUser)} />
                                                    <img src={DeleteButton} className="deleteButton usersActionsButton" onClick={() => this.deleteThisApp(app._id)} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(Licenses);