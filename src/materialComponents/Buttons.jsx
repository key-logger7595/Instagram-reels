import React from 'react';
import {IconButton} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';


export default function Buttons() {
    let style1={
        marginRight:"8px",
        backgroundColor:"lightgreen"
    }
    return (
        <div>
            <h2>Buttons</h2>
            <Button variant="contained">Hello</Button>
            <Button variant="outlined">Hello</Button>
            <Button variant="text">Hello</Button>

            <h2>Color & Event listeners</h2>
            <Button variant="contained" style ={style1}>Hello</Button>
            <Button variant="outlined" color="secondary" 
             href="https://material-ui.com/components/icons/#icons"
            >Hello</Button>
            <Button variant="text" color="primary" >Hello</Button>


            <h2>Icons Inside Buttons</h2>
            <Button variant="contained" style ={style1} startIcon={<SendIcon></SendIcon>} >Send</Button>
            <Button variant="contained" style ={style1} endIcon={<DeleteIcon></DeleteIcon>} size="small">Delete</Button>

            <h2>Icons</h2>
            <IconButton>
                <SendIcon></SendIcon>
                <DeleteIcon></DeleteIcon>
            </IconButton>


        </div>
    )
}
