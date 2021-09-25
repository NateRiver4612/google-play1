import React,{useState} from 'react'
import styled from 'styled-components'
import { BsSearch } from "react-icons/bs";
import { createStructuredSelector } from 'reselect';
import { selectListHidden } from '../../redux/wish-list/wishList.selector';
import { connect } from 'react-redux';
import WishListDropdown from '../dropdown/wishlist-dropdown/WishList-Dropdown.component'
import { selectCurrentUser } from '../../redux/user/user.selector';
import WishListIcon  from '../wish-list-icon/wishList-Icon.component';
import {Container,LINK,Wrap,SearchField,IconWrap,Ava} from './header.styles'
import { Button } from '@material-ui/core'; 
import { toggleList } from '../../redux/wish-list/wishList.action';
import { selectUserToggleCart } from '../../redux/user/user.selector';
import UserDropdown from '../dropdown/user-dropdown/User-Dropdown.components';
import { toggleUser } from '../../redux/user/user.action';
import { withRouter } from 'react-router';
import {useLocation} from 'react-router-dom'
import { SearchItem } from '../../redux/search/search.action';

const Header = ({hidden,history,currentUser,SearchItem,toggleUser,match,userHidden,toggleList})=>{
  const [state,setState] =  useState(true);
  const location = useLocation()
  const [searchField,setSearchField] = useState('')

  const currentPage = location.pathname.split('/')[1]

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if(searchField !== 0 ){
        history.push(`/${currentPage}/search/${searchField}`)
        SearchItem(searchField)
      }
    }
  }
  const handleOnClick = (event)=>{
    if(searchField !== 0 ){
      history.push(`/${currentPage}/search/${searchField}`)
      console.log('searchField',searchField)
      SearchItem(searchField)
    }
  }

  const onChangeHandling = (event)=>{
      if(event.target.value.length !== 0){
        setState(false);
        setSearchField(event.target.value)
      }else{
        setSearchField('')
        setState(true);
      }
  }

  // <img style={{paddingLeft:'20px',width:'39px',height:'39px'}} src='https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.15752-9/90716814_227701518373804_7491086833023975424_n.png?_nc_cat=109&ccb=1-4&_nc_sid=ae9488&_nc_ohc=ME_fxo0ks-sAX-7mqZG&_nc_ht=scontent.fsgn2-4.fna&oh=566924fb4b39ff7354b44fef181f0c29&oe=61369CDB'/> 
  return(
    <Container>
      <LINK to="/">
        <img  src='https://brandlogos.net/wp-content/uploads/2021/04/play-store-logo-512x512.png'/> 
        <span style={{margin:0}}>
        <span style={{margin:0,color:'#29ace2'}}>G</span>
        <span style={{margin:0,color:'#ee3b3a'}}>o</span>
        <span style={{margin:0,color:'#fedf26'}}>o</span>
        <span style={{margin:0,color:'#21aae1'}}>g</span>
        <span style={{margin:0,color:'#3cb64c'}}>l</span>
        <span style={{margin:0,color:'#ee3a49'}}>e</span> 
        <span style={{color:'#909090'}}>Play</span>
        </span>
      </LINK>
      <Wrap>
        <SearchField id="standard-required"  onChange={onChangeHandling} onKeyPress={handleKeyPress} placeholder="Search Field"/>
        <Button onClick ={handleOnClick} color="primary" disabled={state}  >
          <BsSearch style={{width:'22px',height:'22px'}}/>
        </Button>
      </Wrap>

      <div style={{display:'flex',flex:0}}></div>

      <IconWrap  onClick={()=>{!userHidden ? toggleUser() : console.log('');toggleList()}} className='wish-list'>
        <WishListIcon></WishListIcon>
      </IconWrap>

      <IconWrap onClick={()=>{!hidden ? toggleList() : console.log('');toggleUser()}}>
        <Ava src={currentUser?currentUser.photoURL:null} >
        </Ava>
      </IconWrap>
      {hidden ? null : <WishListDropdown/>}
      {userHidden ? null : <UserDropdown/>}
    </Container>)
}

const mapStateToProps = createStructuredSelector({
  hidden:selectListHidden,
  currentUser:selectCurrentUser,
  userHidden:selectUserToggleCart,
})

const mapDispatchToProps = dispatch =>({
  toggleList:()=>dispatch(toggleList()),
  toggleUser:()=>dispatch(toggleUser()),
  SearchItem:(data)=>dispatch(SearchItem(data))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));










