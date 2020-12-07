import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import './login.css';

const CardComponent = ({
    username,
    password,
    handleOnChange,
    onClickHandler,
    usernameReq,
    passwordReq,
    userPassIncorrect
}) => {
    return (
        <Card>
            <CardContent>
                <div
                    style={{ height: '400px' }}
                    className='d-flex flex-column p-5 vh-75 justify-content-between'>
                    <Typography variant="h4" gutterBottom>
                        LOGIN
                    </Typography>
                    <form className='form-container' noValidate autoComplete="off">
                        <FormControl required>
                            <InputLabel htmlFor="username-input">Username</InputLabel>
                            <Input
                                required
                                id="username-input"
                                autoComplete='off'
                                name='username'
                                defaultValue={username}
                                onChange={handleOnChange}
                                autoFocus={true}
                            />
                            <FormHelperText
                                className={`text-danger ${usernameReq ? 'dispBlock': 'dispNone'}`}
                            >
                                Required
                            </FormHelperText>
                        </FormControl>
                        <FormControl required>
                            <InputLabel htmlFor="password-input">Password</InputLabel>
                            <Input
                                required
                                id="password-input"
                                autoComplete='off'
                                type='password'
                                name='password'
                                defaultValue={password}
                                onChange={handleOnChange}
                                autoFocus={true}
                            />
                            <FormHelperText
                                className={`text-danger ${passwordReq ? 'dispBlock': 'dispNone'}`}
                            >
                                Required
                            </FormHelperText>
                        </FormControl>
                        <FormHelperText
                            className={`text-danger ${userPassIncorrect ? 'dispBlock': 'dispNone'}`}>
                                Incorrect username and/or password
                        </FormHelperText>
                        <Button
                            className='w-25 d-inline'
                            variant="contained"
                            onClick={onClickHandler}
                            color="primary">
                            Login
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    )
}

export { CardComponent };
