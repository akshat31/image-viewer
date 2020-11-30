import React from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Login = () => {
    return (
        <div className='row'>
            <div className='col-lg-12'>
                <div className='d-flex justify-content-center align-items-center vh-100'>
                    <div className='login-container w-50'>
                        <Card>
                            <CardContent>
                                <div style={{ height: '400px' }} className='d-flex flex-column p-5 vh-75 justify-content-between'>
                                    <Typography variant="h4" gutterBottom>
                                       Login
                                    </Typography>
                                    <TextField label="User name" />
                                    <TextField label="Password" />
                                    <Button className='w-25 d-inline' variant="contained" color="primary">
                                        Login
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Login };