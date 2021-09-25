import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux';
import './User-Dropdown.styles.scss'
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import {Button} from "@material-ui/core"
import { Avatar } from '@material-ui/core';
import { selectCurrentUser } from '../../../redux/user/user.selector';
import styled from 'styled-components'
import { toggleUser } from '../../../redux/user/user.action';
import { signOutStart,signInWithGoggleStart } from '../../../redux/user/user.action';

const UserDropdown = ({currentUser,signInWithGoggleStart,signOutStart}) => {
    return(
    currentUser
    ?
    <div className = 'user-dropdown'>
        <div className = 'user-info'>
            <span>  
                <Ava src={currentUser.photoURL}/>
            </span>
            <span style={{paddingTop:'10px',fontSize:'16px',letterSpacing:'0.3px'}}>
                {currentUser.displayName}
            </span>
            <span style={{opacity:'0.7',fontSize:'14px'}}>
                {currentUser.email}
            </span>
            <Button onClick={()=>signInWithGoggleStart()} style={{backgroundColor:'#efefef'}}>
                Sign in another account
            </Button>
            <Button onClick={()=>{signOutStart()}} style={{color:'white',backgroundColor:'#ffce35'}} className='sign-out'>
                SIGN OUT
            </Button>
        </div>
    </div>
    :
    <div className = 'user-dropdown'>
        <div className = 'user-info'>
            <span>  
                <Ava src=''/>
            </span>
            <span style={{paddingTop:'10px',fontSize:'16px',letterSpacing:'0.3px'}}>
                Google-Play user
            </span>
            <Button onClick={()=>signInWithGoggleStart()} style={{marginTop:'10px',color:'white', backgroundColor:'#ffce35'}}>
                Sign in
            </Button>
        </div>
    </div>
)
}

const  Ava = styled(Avatar)`
    width:80px !important;
    height:80px !important;
`

const mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser
});
  
const mapDispatchToProps = dispatch=>({
    toggleUser:()=>dispatch(toggleUser()),
    signOutStart:()=>dispatch(signOutStart()),
    signInWithGoggleStart:()=>dispatch(signInWithGoggleStart())
})
  
  
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UserDropdown)); 