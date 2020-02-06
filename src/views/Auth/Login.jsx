import React, { Component } from "react";
import { Button, FormControl } from "react-bootstrap"
import "./Auth.scss";
import axios from "axios";
import { authorizer } from "../../constants/constants";
import { history } from "../../routers/AppRoutes";
import { toast } from 'react-toastify';

class Login extends Component {

    state = {
        userName: "",
        password: "",
        isLoginModal: true,
        emailError: false,
        email: "",
        displayName: "",
        confirmPassword: "",
        passErrorMsg: "",
        loading: false
    }

    handleChange = ev => {
        this.setState({ [ev.target.name]: ev.target.value })
    }

    handleLoginModal = () => {
        this.setState({
            isLoginModal: !this.state.isLoginModal,
            username: "",
            password: ""
        })
    }

    validateEmail = ev => {
        this.setState({
            email: ev.target.value
        }, () => {
            const pattern = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
            const result = pattern.test(this.state.email);
            if (result === true) {
                this.setState({
                    emailError: false,
                })
            } else {
                this.setState({
                    emailError: true
                })
            }
        })
    }

    validatePassword = ev => {
        this.setState({
            password: ev.target.value
        }, () => {
            var lowerCaseLetters = /[a-z]/g;
            if (!this.state.password.match(lowerCaseLetters)) {
                this.setState({
                    passErrorMsg: "Please enter at least one lower case letter"
                })
            }

            var uppercase = /[A-Z]/g;
            if (!this.state.password.match(uppercase)) {
                this.setState({
                    passErrorMsg: "Please enter at least one upper case letter"
                })
            }

            var numbers = /[0-9]/g;
            if (!this.state.password.match(numbers)) {
                this.setState({
                    passErrorMsg: "Please enter at least one number"
                })
            }

            if (this.state.password.length < 8) {
                this.setState({
                    passErrorMsg: "Password should be 8 characters"
                })
            }

            else {
                this.setState({
                    passErrorMsg: ""
                })
            }
        })
    }

    handleSubmitLoginModal = ev => {
        ev.preventDefault()
        let payload = {
            username: this.state.username,
            password: this.state.password,
        }
        authorizer.setHeader("authenticated")
        history.push("/dashboard")
        toast.success("Success : Login not successful but still Pushing them to Dashboard")
        axios.post("https://yd2jolt828.execute-api.eu-west-1.amazonaws.com/default/react_front_post-test?type=login", payload)
            .then(payload => {
                toast.success("Success", "Login Successful")
            })
            .catch(payload => {
                toast.error("Error : Login Error Internal Server Error")
            })
    }

    handleSignUpSubmit = ev => {
        ev.preventDefault()
        this.setState({
            loading: true
        })
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        let payload = {
            userName: this.state.username,
            password: this.state.password,
            email: this.state.email,
            displayName: this.state.displayName
        }
        axios.post("https://wsv46x7226.execute-api.eu-west-1.amazonaws.com/default/react_front_post-test?type=signup", payload, axiosConfig)
            .then(payload => {
                this.handleLoginModal()
                toast.success("Success", "Login Successful")
            })
            .catch(payload => {
                toast.error("Error", "Login Successful")
            })
    }

    render() {
        const { userName, password, isLoginModal, email, confirmPassword, displayName } = this.state;
        return (
            <div className="auth">
                {isLoginModal
                    ? <div className="auth__form-container">
                        <h3>Sign In</h3>
                        <form>
                            <div className="auth__form-sub-container">
                                <FormControl
                                    placeholder="Username"
                                    type="text" value={userName} onChange={this.handleChange} name="userName"
                                    className="auth__input"
                                />
                            </div>

                            <div className="auth__form-sub-container">
                                <FormControl
                                    placeholder="Password"
                                    type="password" value={password} onChange={this.handleChange} name="password"
                                    className="auth__input"
                                />
                                <div className="auth__forgot-password">
                                    <span onClick={this.handleForgotPassword}>Forgot Password ?</span>
                                </div>
                            </div>

                            <div className="auth__form-sub-container">
                                <Button type="submit"
                                    className="auth__btn"
                                    disabled={this.state.userName.length === 0 || this.state.password.length === 0}
                                    onClick={this.handleSubmitLoginModal}>Sign In</Button>
                            </div>
                        </form>
                        <h6>Don't have an account?</h6>
                        <span onClick={this.handleLoginModal}>Sign Up</span>
                    </div>

                    : <div className="auth__register-form-container">
                        <h3>Sign Up</h3>
                        <form onSubmit={this.handleSignUpSubmit}>
                            <div className="auth__form-sub-container">
                                <FormControl
                                    placeholder="Username"
                                    type="text" value={userName} onChange={this.handleChange} name="userName"
                                    className="auth__input"
                                    autoComplete="off"
                                />
                            </div>

                            <div className="auth__form-sub-container">
                                <FormControl
                                    placeholder="Password"
                                    type="password" value={password} onChange={this.validatePassword} name="password"
                                    className="auth__input"
                                />
                                {this.state.passErrorMsg.length > 0 && <div className="error-msg">{this.state.passErrorMsg}</div>}
                            </div>

                            <div className="auth__form-sub-container">
                                <FormControl
                                    placeholder="Confirm Password"
                                    type="password" value={confirmPassword} onChange={this.handleChange} name="confirmPassword"
                                    className="auth__input"
                                />
                            </div>

                            <div className="auth__form-sub-container">
                                <FormControl
                                    placeholder="Display Name"
                                    type="text" value={displayName} onChange={this.handleChange} name="displayName"
                                    className="auth__input"
                                    autoComplete="off"
                                />
                            </div>

                            <div className="auth__form-sub-container">
                                <FormControl
                                    placeholder="Email"
                                    type="text" value={email} onChange={this.validateEmail} name="email"
                                    className="auth__input"
                                    autoComplete="off"
                                />
                                {this.state.emailError && <div className="error-msg">Please enter valid Email</div>}
                            </div>

                            <div className="auth__form-sub-container">
                                <Button type="submit"
                                    className="auth__btn"
                                    disabled={
                                        this.state.userName.length === 0 ||
                                        this.state.password.length === 0 ||
                                        this.state.confirmPassword.length === 0 ||
                                        this.state.displayName.length === 0 ||
                                        this.state.email.length === 0}
                                    onClick={this.handleSignUpSubmit}>Sign UP</Button>
                            </div>
                        </form>
                        <h6>Already have an account?</h6>
                        <span onClick={this.handleLoginModal}>Sign In</span>
                    </div>}
            </div>
        )
    }
}

export default Login;