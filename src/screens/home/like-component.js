import React, { useState } from 'react';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import './home.css';

const LikeComponent = (props) => {
    const [toggler, setToggler] = useState(false);
    const [likeCount, setlikeCount] = useState(2);

    const handleLike = () => {
        setToggler(!toggler);
        if (likeCount === 2) {
            setlikeCount(3)
        } else if (likeCount === 3) {
            setlikeCount(2)
        }
    }

    return (
        <span onClick={handleLike}>
            {toggler ? <FavoriteIcon className='text-danger font-38p' /> : <FavoriteBorderIcon className='font-38p' />}
            <span className='ml-2 fs-18p'>{likeCount} Likes</span>
        </span>
    )
}

export { LikeComponent };
