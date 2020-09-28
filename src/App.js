import React from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Login from "./pages/login";
import Error from "./pages/error";
import MainLayout from './shared/MainLayout';
import Home from './pages/home';
import Licenses from './pages/licenses';
import Users from './pages/users';
import NewUser from './pages/newUser';
import NewApp from './pages/NewApp';
import NewLicense from './pages/NewLicense';
import EditLicense from './pages/editLicense';
import UsersConfiguration from './pages/usersConfiguration';
import ResetPassword from './pages/resetPassword';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route path="/" exact>
              <Login></Login>
            </Route>
            <Route path="/cambiar-contraseñas" exact>
              <UsersConfiguration></UsersConfiguration>
            </Route>
            <Route path="/recuperar-contraseña" exact>
              <ResetPassword></ResetPassword>
            </Route>
            <Route path="/usuarios" exact>
              <Users></Users>
            </Route>
            <Route path="/usuarios/nuevo" exact>
              <NewUser></NewUser>
            </Route>
            <Route path="/aplicaciones/nueva" exact>
              <NewApp></NewApp>
            </Route>
            <Route path="/licencias/nueva" exact>
              <NewLicense></NewLicense>
            </Route>
            <Route path="/licencias/editar" exact>
              <EditLicense></EditLicense>
            </Route>
            <Route path="/error" exact>
              <Error></Error>
            </Route>
            <Route path="/home" exact>
              <Home></Home>
            </Route>
            <Route path="/licencias" exact>
              <Licenses></Licenses>
            </Route>
            <Redirect to="/error" exact></Redirect>
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
