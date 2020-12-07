import React, { Component } from 'react';
import axios from 'axios';
import { Header } from '../header/header';
import Avatar from '../../assets/images/avatar.jpg'
import Sample from '../../assets/images/sample.jpeg'
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import './profile.css';
import { makeStyles } from '@material-ui/core/styles';

import { mockData } from '../home/mock-data-1';
import { mockData2 } from '../home/mock-data-2';

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
    //   width: 500,
      height: 450,
    },
  }));
class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            profileImageData: mockData2,
        }
    }

    componentDidMount() {

        if (!accessToken) {
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
                    for (let i = 0; i < 3; i++) {
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
                        })
                    }
                }
            }).catch(() => {
                // TODO - put alert here
            });
        }
    }

    render() {
        const { profileImageData, allImageData } = this.state;

        const ProfileImagesRenderer = () => {
            const classes = useStyles();
            return (
                <div className={classes.root}>
                    <GridList cellHeight={160} className={classes.gridList} cols={3}>
                        {profileImageData.map((profileData, index) => (
                        <GridListTile style={{ height: '375px'}} key={index} cols={1}>
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
                                        <p>Posts: 6</p>
                                    </div>
                                    <div className='col-lg-4'>
                                        <p>Follows: 4</p>
                                    </div>
                                    <div className='col-lg-4'>
                                        <p>Followed By: 6</p>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <h3 className='d-inline pt-4'>Upgrad Education</h3>
                                    <span className='ml-3 edit-icon-container'><EditRoundedIcon /></span>
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
