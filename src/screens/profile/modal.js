import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Button } from '@material-ui/core';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 200,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal() {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [description, setDescription] = React.useState('Upgrad Education');
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdateText = (event) => {
        setDescription(event.target.value);
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Edit</h2>
            <FormControl>
                <InputLabel htmlFor="component-helper">Full Name *</InputLabel>
                <Input
                    id="component-helper"
                    value={description}
                    onChange={handleUpdateText}
                    aria-describedby="component-helper-text"
                />
            </FormControl>
            <div className='m-2 p-2'>
                <Button variant="contained" color="primary" onClick={handleClose}>
                    Add
                </Button>
            </div>
        </div>
    );

    return (
        <div>
            <h3 className='d-inline pt-4'>{description}</h3>
            <span onClick={handleOpen} className='ml-3 edit-icon-container'>
                <EditRoundedIcon />
            </span>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
