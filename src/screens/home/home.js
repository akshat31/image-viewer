import React, { Component, Fragment } from 'react';

// Dependencies
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

// Components
import { Header } from '../header/header';
import { NewsFeedCard } from './news-feed-card';

// CSS
import './home.css';

// Constants
const accessToken = sessionStorage.getItem('access-token');
const BASE_URL = 'https://graph.instagram.com';
class Home extends Component {

    constructor (props) {
        super(props)

        this.state = {
            newsFeedData: [],
        };
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
                                const newsFeedData = state.newsFeedData.concat(imageAttributes.data)
                                return {
                                    newsFeedData
                                }
                            })
                        }).catch(() => {
                            alert('Network API call failed');
                        })
                    }
                }
            }).catch(() => {
                alert('Network API call failed');
            });
        }
    }

    render () {

        // Destructuring State
        const { newsFeedData } = this.state;

        /**
         *  Renderer function for images which process array and gives image card data
         */
        const NewsFeedRenderer = () => {
            return newsFeedData.map(
                (newsFeedImageData, index) => <NewsFeedCard
                    key={index}
                    index={index}
                    {...newsFeedImageData}/>
            )
        };

        return (
            <Fragment>
                <Header {...this.props}/>
                <div className='newsfeed-container'>
                    { Array.isArray(newsFeedData) && newsFeedData.length > 0 ?
                        <NewsFeedRenderer /> : (
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