import React from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Login from "./pages/login";
import Error from "./pages/error";
import MainLayout from './shared/MainLayout';
import Home from './pages/home';
import Users from './pages/users';
import editUser from './pages/editUser';
import NewUser from './pages/newUser';
import NewApp from './pages/NewApp';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route path="/" exact>
              <Login></Login>
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
            <Route path="/error" exact>
              <Error></Error>
            </Route>
            <Route path="/home" exact>
              <Home></Home>
            </Route>
            <Redirect to="/error" exact></Redirect>
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
