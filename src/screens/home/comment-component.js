import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const CommentComponent = ({
    username,
    comment,
    commentArray,
    handleCommentSubmit,
    handleComment
}) => {

    return (
        <Fragment>
            {
                commentArray.map((value, index) => (
                    <Typography key={index} className='my-2' variant='body1' gutterBottom>
                        <b>{username || 'upgrad_sde'}: </b>{value}
                    </Typography>
                ))
            }
            <FormControl className='comment-input'>
                <InputLabel htmlFor='component-disabled'>Add a comment</InputLabel>
                <Input
                    id='component-disabled'
                    value={comment}
                    onChange={handleComment} />
            </FormControl>
            <Button
                className='comment-add-btn margin-tl'
                variant='contained'
                onClick={handleCommentSubmit}
                color='primary'>
                Add
            </Button>
        </Fragment>
    )
}

export { CommentComponent };
