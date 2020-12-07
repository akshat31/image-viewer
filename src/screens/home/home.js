import React, { Component, Fragment } from 'react';

// Dependencies
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

// Components
import { Header } from '../header/header';
import { NewsFeedCard } from './news-feed-card';

// CSS
import './home.css';

// Mock Data
import { mockData } from './mock-data-1';
import { mockData2 } from './mock-data-2';


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