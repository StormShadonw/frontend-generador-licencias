import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import EditButton from '../assets/edit-button.png';
import DeleteButton from '../assets/delete-button.png';
import APISERVER from "../../src/config";
import './users.css';

const API = APISERVER + "users/";
const APIEditThisUser = APISERVER + "users/";
const APIUsersByName = APISERVER + "users/";
let rolesAPI = APISERVER + "roles/";

class UsersConfiguration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            users: [],
            inputSearch: "",
            userName: "",
            userLastname: "",
            userSex: "",
            userTelephoneNumber: "",
            userEmail: "",
            userPassword: "",
            userRole: "",
            roles: []
        }
    }

    getUsers = () => {
        fetch(API)
            .then((response) => {
                return response.json()
            }).then((usersData) => {
                this.setState({
                    users: usersData,
                    isLoaded: true
                })
                console.log(usersData)
            }, (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
    }

    getUsersByName = (userName) => {
        console.log(APIUsersByName + userName);
        fetch(APIUsersByName + userName)
            .then((response) => {
                return response.json()
            }).then((usersData) => {
                this.setState({
                    users: usersData,
                    isLoaded: true
                })
                console.log(usersData)
            }, (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
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

    editUser = (index) => {
        let user = this.state.users[index]
        this.props.history.push({
            pathname: '/recuperar-contraseña',
            state: {
                firstName: user.name,
                lastName: user.lastName,
                sex: user.sex,
                telephoneNumber: user.telephoneNumber,
                email: user.email,
                apps: user.apps,
                showModalAddApp: false,
                editApp: -1,
                role: user.role,
                _id: user._id
            }
          })
    }

    setInputSearch = (e) => {
        this.setState({
            inputSearch: e.target.value
        });
    }

    onSubmitSearch = (e) => {
        e.preventDefault();
        this.getUsersByName(this.state.inputSearch);
    }

    deleteThisUser = (userId) => {
        let sure = window.confirm("Seguro que desea eliminar este usuario?");
        if (sure) {
            fetch(API + "/delete/" + userId, {
                method: "put"
            })
                .then((response) => {
                    return response.json()
                }).then((usersData) => {
                    this.getUsers();
                }, (error) => {
                })
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        let userSession = localStorage.getItem("userLogin");
        if (userSession === null) {
            this.props.history.replace("/");
        }

        return (
            <div className="usersPage">
                {!this.state.isLoaded ? <div className="cargando"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div> : ""}
                <h2>Cambiar Contraseña</h2>
                <div className="users">
                    <form className="pure-form searchUsers" onSubmit={this.onSubmitSearch}>
                        <label htmlFor="inputSearch">Buscar por nombre:</label>
                        <input name="inputSearch" type="text" className="pure-input-rounded inputSearch" value={this.state.inputSearch} onChange={this.setInputSearch} />
                        <button type="submit" className="pure-button button-secondary">BUSCAR</button>
                    </form>
                    <table className="pure-table pure-table-horizontal pure-table-striped table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Usuario</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user?.name + " " + user?.lastName}</td>
                                            <td>{user?.role}</td>
                                            <td>
                                                <div className="actionsButtons">
                                                    <img src={EditButton} className="editButton usersActionsButton" onClick={() => this.editUser(index)} />
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

export default withRouter(UsersConfiguration);