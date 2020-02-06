import React, { Component } from "react";
import "./Header.scss";
import { history } from "../../routers/AppRoutes";

class Header extends Component {

    handleLogout = () => {
        localStorage.clear()
        history.push("/auth/login")
    }

    render() {
        return (
            <div className="header ">
                <div className={`header-contents container`}>
                    <div className="user-name-cont">
                        <i className="fa fa-user"></i>
                        <span>UserName</span>
                    </div>
                    <div className="logout-cont" onClick={this.handleLogout}>
                        <i className="fa fa-sign-out"></i>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;
