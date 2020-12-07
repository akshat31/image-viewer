import React, { useState, Fragment } from 'react';

// Dependencies
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import AvatarImg from '../../assets/images/avatar.jpg';
import Divider from '@material-ui/core/Divider';

// Components
import { LikeComponent } from './like-component';

// CSS
import './home.css';
import Sample from '../../assets/images/sample.jpeg'



const NewsFeedCard = ({
    media_url = Sample,
    caption,
    username,
    timestamp = '2020-12-01T14:39:27+0000' 
}) => {

    let imageDate = new Date(timestamp)
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let finalDate = `${imageDate.getDate()} ${months[imageDate.getMonth()]} ${imageDate.getFullYear()} ${imageDate.getHours()}:${imageDate.getMinutes() > 10 ? imageDate.getMinutes() : '0'+imageDate.getMinutes()}:${imageDate.getSeconds()}`
    console.log('finalDate finalDate', finalDate)


    return (
        <Card className='w-40 vh-50 m-4'>
            <CardContent>
                <div className='card-header-logo'>
                    <Avatar alt="Remy Sharp" src={AvatarImg} />
                    <div className='card-header-label'>
                        <span>{ username || 'upgrad_sde' }</span>
                        <span>{ finalDate || '30/11/2020 13:00'}</span>
                    </div>
                </div>
                <img
                    className='w-100'
                    src={media_url}
                    alt='sample' />
                <Divider className='my-2' />
                <div className='my-3 cation-head'>
                    {caption || 'Team of great people at upgrad'}
                </div>
                <h5 className='text-primary'>#instagram #happy-coding</h5>
                <LikeComponent />
                <div className='mt-5'>
                    <TextField
                        className='comment-input'
                        id="standard-basic"
                        label="Add a comment" />
                    <Button
                        className='comment-add-btn margin-tl'
                        variant="contained"
                        color="primary">
                        Add
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export { NewsFeedCard };
