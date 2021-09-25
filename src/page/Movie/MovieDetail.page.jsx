import React from 'react'
import DetailMovie from '../../component/detail/detai-movie/DetailMovie.component'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { getCurrentItem } from '../../redux/Item/item.selector'
import RelatedCollection from '../Related-Collection/Related-Collection.page'
import {selectListItems} from '../../redux/wish-list/wishList.selector'
import { selectCurrentUser} from '../../redux/user/user.selector';

const MovieDetail=({currentItem,currentUser,listItems})=>{
  const {id,type} = currentItem
  const oneType = type.includes(',') ? type.substr(0,type.indexOf(',')) : type
  window.scrollTo(0, 0);
  return (
    <Container>
        <Wrap className="detail">
          <DetailMovie  currentUser={currentUser} listItems={listItems} id={id} chosenType={oneType} doc='movies'/>
        </Wrap>

        <Wrap className="related">
          <span>Similar movies</span>
          <RelatedCollection id={id}  currentItem={currentItem} chosenType={oneType} doc='movies' type={type}></RelatedCollection>
        </Wrap>
         
    </Container>
  )
}


const Wrap = styled.div.attrs((props)=>({
  className: props.classname 
}))`
  &.detail{
    padding:90px 0px 100px 40px;
    flex:0.7 ;
  }
  &.related{
      flex:0.35;
      box-sizing: border-box;
      padding-top:120px;
      padding-left:30px ;

      span{
        font-size:20px;
        opacity: 0.7;
      }

  }
`

const Container = styled.div`
  display:flex;
`

const mapStateToProps = createStructuredSelector({
  currentItem: (state)=>getCurrentItem(state),
  listItems:selectListItems,
  // userComments:selectUserComments,
  currentUser:selectCurrentUser
})


export default connect(mapStateToProps)(MovieDetail)
