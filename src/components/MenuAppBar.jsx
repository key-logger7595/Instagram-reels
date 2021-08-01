import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Avatar } from '@material-ui/core';
import Profile from './Profile';
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Button } from '@material-ui/core';
import {PhotoCamera} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar:{
      width:'98.6vw',
      background:' #2E3B55'
  },
  typographyColor:{
    color:'black'
  },
  appBarBorder:{
   borderBottom:'1px solid #f9f9f9'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  styleIconsDiv:{
      display:'flex',
      gap:'1.2rem'
  },
  input: {
    display: 'none',
},
}));


export default function MenuAppBar({user,submitHandler,loading,handleInputFile}) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

 

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const showProflePage = ()=>{
     history.push('/profile');
  }

  return (
    <div className={classes.root}>
      <AppBar  
      className={classes.appBar}
      elevation={0}
      position="fixed">
        <Toolbar>
          <Typography 
 variant="h6" className={classes.title}>
            Instagram Reels
          </Typography>
                  <div className={classes.styleIconsDiv}>
                       <input accept="file" className={classes.input} id="icon-button-file" type="file"
                            onChange={handleInputFile}
                        />
                        <label htmlFor="icon-button-file">
                            <Button variant="contained" color="primary" component="span" disabled={loading} endIcon={<PhotoCamera />}>
                                Upload
                            </Button>
                        </label>
                      <HomeIcon></HomeIcon>
                      <SendIcon></SendIcon>
                      <FavoriteBorderIcon></FavoriteBorderIcon>
                  </div>

           {user && <div style={{marginLeft:'1.2rem'}}>
            <Avatar alt="remy sharp"
                      onClick={handleMenu} 
                    src={user.profileUrl}/> 
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={showProflePage}>Profile</MenuItem>
                <MenuItem onClick={submitHandler}>Logout</MenuItem>
              </Menu>
            </div>}
      
        </Toolbar>
      </AppBar>
    </div>
  );
}