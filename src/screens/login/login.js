import React, { Component, Fragment } from 'react';
// dependencies
import { Redirect } from 'react-router-dom';

// Components
import { Header } from '../header/header';
import { CardComponent } from './card-component';

// CSS
import './login.css';

// variables to be edit by reviewer
const accessToken = `IGQVJXXzBsYXNxMlBYb3JSSzNBcHZAGTk5tWUJGTkliVGJNN2hJZAUZARYUI1OEp4eHBOZAzZArSkMyaE1CbTRReDdvbklDdFl5NlJwTXlQM21YRWdBZAGdVR0FhRnlxb0Vka1dXNmhxQ1lrdVNtVVlzMFVTRXZAQSjRPOEpLdWFZA`
const user = 'user';
const pass = 'admin';
class Login extends Component {

    constructor(props) {
        super(props)

        // Intialised State for login page and pass in card component also
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

    /**
     *  function for onChange of text box get value and save in store
     */
    handleOnChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    /**
     *  function triggers with onClick of login button
     */
    onClickHandler = () => {
        // destructuring state
        const { username, password } = this.state;

        // if conditon for checking required fields of both username and password
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
            } else if (username !== '' && password === '') {
                this.setState({
                    usernameReq: false,
                    passwordReq: true
                })
            }
            // condition for checking correct username and password
        } else if (username !== user && password !== pass) {
            this.setState({
                userPassIncorrect: true,
                usernameReq: false,
                passwordReq: false,
            })
            // condition for setting session and authenticate user
        } else {
            this.setState({
                isAuthenticated: true
            })
            sessionStorage.setItem("access-token", accessToken);
        }
    }

    render() {
        return (
            <Fragment>
                <Header {...this.props} />
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='d-flex justify-content-center align-items-center vh-100'>
                            <div className='login-container w-35'>
                                {/* performing ternary operation and checking authentication */}
                                {/* if valid redirecting to home */}
                                {this.state.isAuthenticated ?
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