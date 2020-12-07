import React, { useState } from 'react';

// Dependencies
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import AvatarImg from '../../assets/images/avatar.jpg';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

// Components
import { LikeComponent } from './like-component';

// CSS
import './home.css';
import Sample from '../../assets/images/sample.jpeg';

// Utils
import { createDateTime } from '../../common/utils/create-date-time';
import { CommentComponent } from './comment-component';

const NewsFeedCard = ({
    index,
    media_url = Sample,
    caption,
    username,
    timestamp = '2020-12-01T14:39:27+0000'
}) => {
    const finalDateTime = createDateTime(timestamp);
    const [comment, setComment] = useState([]);
    const [commentArray, setCommentArray] = useState([]);

    const handleComment = (event) => {
        setComment(event.target.value);
    }

    const handleCommentSubmit = () => {
        setCommentArray(commentArray.concat(comment));
        setComment('');
    }

    return (
        <Card className='w-40 vh-50 m-4'>
            <CardHeader
                avatar={<Avatar alt="Instagram Avatar" src={AvatarImg} />}
                title={username || 'upgrad_sde'}
                subheader={finalDateTime || '30/11/2020 13:00'}
            />
            <CardContent>
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
                    <CommentComponent
                        commentIndex={index}
                        username={username}
                        comment={comment}
                        commentArray={commentArray}
                        handleComment={handleComment}
                        handleCommentSubmit={handleCommentSubmit}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export { NewsFeedCard };
