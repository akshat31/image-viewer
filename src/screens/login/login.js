import React, { Component, Fragment } from 'react';
// dependencies
import { Redirect } from 'react-router-dom';

// Components
import { Header } from '../header/header';
import { CardComponent } from './card-component';

// CSS
import './login.css';

const accessToken = `IGQVJVRXZAjU055aGtjZAE5VSWxJNWlKUzdObnlIMVFMUTQyOHo1clYza0NaSlVHajB0bDdnVlYzcTJhaXhudGVUcFVCdnp4VmwySFk4d0NIdVcxc3Q2aXJHOGZAFMWx6R3lHR3Btc0JCZADgwcVN2RElOX0hqRU1oOWQ4eWdJ`
class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            error: false,
            helperText: '',
            username: '',
            password: '',
            usernameReq: false,
            passwordReq: false,
            userPassIncorrect: false,
            isAuthenticated: false || sessionStorage.getItem("access-token")
        }
    };

    handleOnChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onClickHandler = () => {
        const user = 'user';
        const pass = 'admin';
        const { username, password } = this.state;
        
        if (username === '' || password === '') {
            if (username === '' && password === '') {
                this.setState({
                    usernameReq: true,
                    passwordReq: true
                })
            } else if (username === '' && password !== '') {
                this.setState({
                    usernameReq: true,
                    passwordReq: false
                })
            } else if (username !== '' && password === ''){
                this.setState({
                    usernameReq: false,
                    passwordReq: true
                })
            }
        } else if (username !== user && password !== pass) {
            this.setState({
                userPassIncorrect: true,
                usernameReq: false,
                passwordReq: false,
            })
        } else {
            this.setState({
                isAuthenticated: true
            })
            sessionStorage.setItem("access-token", accessToken);
        }
    }

    render() {
        const { isAuthenticated } = this.state;

        return (
            <Fragment>
                <Header {...this.props}/>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='d-flex justify-content-center align-items-center vh-100'>
                            <div className='login-container w-35'>
                                {isAuthenticated ? 
                                    <Redirect to="/home" /> 
                                    : 
                                    <CardComponent
                                        {...this.state}
                                        handleOnChange={this.handleOnChange}
                                        onClickHandler={this.onClickHandler}
                                    />}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export { Login };