import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux';
import './WishList-Dropdown.styles.scss'
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect'
import {selectListItems} from '../../../redux/wish-list/wishList.selector'
import WishListItem from '../../wish-list-item/wishList-Item.component';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import {Button} from "@material-ui/core"
import { toggleList } from '../../../redux/wish-list/wishList.action';
import { Avatar } from '@material-ui/core';

const WishListDropdown = ({listItems,toggleList}) => {

  return(
    <div className='cart-dropdown'>
      <div className='cart-items'>
      {listItems.length ? 
        (listItems.map(listItem => {
          const {item,doc} = listItem
          return  <WishListItem  key={item.id} doc= {doc} item={item} />
        })
        ):(
          <span className='empty-message'>Your cart is empty</span>   
        )}
       </div>
      <Link style={{textDecoration:'none'}}to='/checkout'>
        <BUTTON onClick={()=>toggleList()}>
          Go to check out
        </BUTTON>
      </Link>
    </div>
);
}


const  Ava = styled(Avatar)`
    width:80px !important;
    height:80px !important;
`

const BUTTON = styled(Button)`
  width: 100%;
  

  &:hover{
    background-color: black!important;
    color:white!important;
  }
`

const mapStateToProps = createStructuredSelector({
  listItems:selectListItems,

});

const mapDispatchToProps = dispatch=>({
  toggleList:()=>dispatch(toggleList())
})


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WishListDropdown)); 