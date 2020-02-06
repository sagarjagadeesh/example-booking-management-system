import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "../views/Auth/Login";
import Dashboard from "../views/Dashboard/Dashboard";
// import requireAuth from "../hoc/require_auth";
import Header from "../components/Header/Header";
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const history = createBrowserHistory();

class Redirect extends Route {
    componentDidMount() {
        history.push('/auth/login');
    }
}

class AppRoutes extends Component {
    render() {
        return (
            <div className="main-div">
                <ToastContainer transition={Slide} />
                <Router history={history}>
                    <Switch>
                        <Route path="/auth/login" exact component={Login} />
                        <Route path="/dashboard">
                            <Header />
                            <Route exact component={(Dashboard)} />
                        </Route>
                        <Route path="*" component={Redirect} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default AppRoutes;