import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

// Dependencies
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import AvatarImg from '../../assets/images/avatar.jpg';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';

// Components
import { Header } from '../header/header';
import { LikeComponent } from './like-component';

// CSS
import './home.css'
import { mockData } from './mock-data-1';
import { mockData2 } from './mock-data-2';
import { NewsFeedCard } from './news-feed-card';
import Sample from '../../assets/images/sample.jpeg'


const accessToken = sessionStorage.getItem('access-token');
class Home extends Component {

    constructor (props) {
        super(props)

        this.state = {
            newsFeedData: mockData2,
        };
    }

    componentDidMount () {

        if (!accessToken) {
            const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption&access_token=${accessToken}`;

            axios.get('https://akshatsoni.com/').then((data) => {
                const allImageData = mockData.data;
                if (allImageData && Array.isArray(allImageData) && allImageData.length > 0) {
                    for (let i = 0; i < 2; i++) {
                        axios.get(`https://graph.instagram.com/${allImageData[i].id}?fields=id,media_type,media_url,username,timestamp,caption&access_token=${accessToken}`)
                        .then((imageAttributes) => {
                            imageAttributes.data && this.setState((state) => {
                                const newsFeedData = state.newsFeedData.concat(imageAttributes.data)
                                    return {
                                        newsFeedData
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

    render () {

        const { newsFeedData } = this.state;

        const NewsFeedRenderer = () => {
            return newsFeedData.map(
                (newsFeedImageData) => <NewsFeedCard {...newsFeedImageData}/>
            )
        }

        const NewsFeedRendererTest = () => {
            return (
                <Fragment>
                    <NewsFeedCard />
                    <NewsFeedCard />
                </Fragment>
            )
        }

        return (
            <Fragment>
                <Header {...this.props}/>
                <div className='newsfeed-container'>
                    { Array.isArray(newsFeedData) && newsFeedData.length > 0 ? <NewsFeedRenderer /> : (
                        <div className='d-flex justify-content-center align-items-center vh-100'>
                            <CircularProgress />
                        </div>
                    )}
                </div>
            </Fragment>
        )
    }

}

export { Home }