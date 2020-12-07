import React, { Component } from 'react';
import axios from 'axios';

// Dependency
import Avatar from '../../assets/images/avatar.jpg';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';

// CSS
import './profile.css';

// Components
import { Header } from '../header/header';
import SimpleModal from './modal';

const accessToken = sessionStorage.getItem('access-token');
const BASE_URL = 'https://graph.instagram.com';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        height: '100%',
    }
}));

class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            profileImageData: [],
            description: 'Upgrad Education'
        }
    }

    componentDidMount() {

        if (accessToken) {
            axios.get(`${BASE_URL}/me/media`, {
                params: {
                    fields: 'id,username',
                    access_token: accessToken
                }
            }).then((data) => {
                this.setState({
                    allImageData: data.data.data
                })
                const { allImageData } = this.state;
                if (allImageData && Array.isArray(allImageData) && allImageData.length > 0) {
                    for (let i = 0; i < allImageData.length; i++) {
                        axios.get(`${BASE_URL}/${allImageData[i].id}`, {
                            params: {
                                fields: 'id,media_type,media_url,username,timestamp,caption',
                                access_token: accessToken
                            }
                        }).then((imageAttributes) => {
                            imageAttributes.data && this.setState((state) => {
                                const profileImageData = state.profileImageData.concat(imageAttributes.data)
                                return {
                                    profileImageData
                                }
                            })
                        }).catch(() => {
                            // TODO - put alert here
                            alert('API call failed')
                        })
                    }
                }
            }).catch(() => {
                // TODO - put alert here
                alert('API call failed')
            });
        }
    }

    render() {
        const {
            profileImageData,
            allImageData
        } = this.state;

        const ProfileImagesRenderer = () => {
            const classes = useStyles();
            return (
                <div className={classes.root}>
                    <GridList cellHeight={160} style={{ overflow: 'hidden' }} className={classes.gridList} cols={3}>
                        {profileImageData.map((profileData, index) => (
                            <GridListTile style={{ height: '375px' }} key={index} cols={1}>
                                <img src={profileData.media_url} alt='profile' />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            )
        }

        return (
            <div>
                <Header {...this.props} />
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-3'>
                            <img src={Avatar} className='p-5 rounded-circle' alt='avatar' />
                        </div>
                        <div className='col-lg-9'>
                            <div className='m-5 p-5'>
                                <h1>{(allImageData && allImageData.length > 0 && allImageData[0].username) || 'Upgrad_sde'}</h1>
                                <div className='row'>
                                    <div className='col-lg-4'>
                                        <p>Posts: {profileImageData.length || '0'}</p>
                                    </div>
                                    <div className='col-lg-4'>
                                        <p>Follows: 4</p>
                                    </div>
                                    <div className='col-lg-4'>
                                        <p>Followed By: 6</p>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <SimpleModal />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        {Array.isArray(profileImageData) && profileImageData.length > 0 ? <ProfileImagesRenderer /> : (
                            <div className='d-flex justify-content-center align-items-center h-100 w-100'>
                                <CircularProgress />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export { Profile };
