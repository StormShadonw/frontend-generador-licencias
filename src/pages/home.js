import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import EditButton from '../assets/edit-button.png';
import DeleteButton from '../assets/delete-button.png';
import Modal from '../shared/Modal';
import BackgroundShadow from '../shared/backgroundShadow';


import './users.css';

const API = "http://localhost:2020/apps/";
const APIEditThisUser = "http://localhost:2020/users/";
const APIUsersByName = "http://localhost:2020/users/";
let rolesAPI = "http://localhost:2020/roles/";
const APIApps = "http://localhost:2020/apps/";


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            users: [],
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
            }).then((usersData) => {
                console.log(usersData);
                this.setState({
                    users: usersData,
                    isLoaded: true
                })
            }, (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            });
    }

    getUsersByName = (userName) => {
        fetch(APIUsersByName + userName)
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

    getAppById = (appId) => {
        fetch(APIApps + appId)
            .then((response) => {
                return response.json()
            }).then((app) => {
                this.setState({
                    isLoaded:true,
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

    editApp = (appId,userId) => {
        let user = this.state.users.filter(user => user._id == userId);
        let app = user[0].apps.filter(app => app._id == appId);
        console.log(app);
        this.props.history.push({
            pathname: '/aplicaciones/nueva',
            state: {
                _idUser: user[0]._id,
                _id: app[0]._id,
                title: app[0].appTitle,
                shortName: app[0].appShortName,
                description: app[0].appDescription,
                userId: user[0]._id
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
        this.getUsersByName(this.state.inputSearch);
    }

    deleteThisApp = (userId) => {
        let sure = window.confirm("Seguro que desea eliminar esta aplicación?");
        if (sure) {
            fetch(API + "/delete/" + userId, {
                method: "put"
            })
                .then((response) => {
                    return response.json()
                }).then((usersData) => {
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
        if (userSession === null) {
            this.props.history.replace("/");
        }
        return (
            <div className="usersPage">
                {!this.state.isLoaded ? <div className="cargando"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div> : ""}
                <h2>Aplicaciones</h2>
                <div className="add_user">
                    <Link to="/aplicaciones/nueva">
                        <button>+</button>
                    </Link>
                </div>
                <div className="users">
                    <form className="pure-form searchUsers" onSubmit={this.onSubmitSearch}>
                        <label htmlFor="inputSearch">Buscar por nombre:</label>
                        <input name="inputSearch" type="text" className="pure-input-rounded inputSearch" value={this.state.inputSearch} onChange={this.setInputSearch} />
                        <button type="submit" className="pure-button button-secondary">BUSCAR</button>
                    </form>
                    <table className="pure-table pure-table-horizontal pure-table-striped table">
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th>Nombre corto</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Usuario</th>
                                <th>Tiene licencia?</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map((user, index) => {
                                    return user.apps.filter(app => app.active).map((app, indexApp) => {
                                        return (
                                            <tr key={app._id}>
                                                {/* <td>{this.state.indexApps}</td> */}
                                                <td>{app.appShortName}</td>
                                                <td>{app.appTitle}</td>
                                                <td>{app.appDescription}</td>
                                                <td>{user.name + " " + user.lastName}</td>
                                                <td>{app.licenseCode > 0 ? "si" : "no"}</td>
                                                {/* <td>{app?.licenseCode.length > 0 ? "si tiene" : "no tiene"}</td> */}
                                                <td>
                                                    <div className="actionsButtons">
                                                        <img src={EditButton} className="editButton usersActionsButton" onClick={() => this.editApp(app._id,user._id)} />
                                                        <img src={DeleteButton} className="deleteButton usersActionsButton" onClick={() => this.deleteThisApp(user._id)} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    });
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);