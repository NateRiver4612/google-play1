import React,{useEffect} from 'react'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { getCurrentItem } from '../../redux/Item/item.selector'
import RelatedCollection from '../Related-Collection/Related-Collection.page'
import DetailBook from '../../component/detail/detail-book/DetailBook.component'
import { selectListItems } from '../../redux/wish-list/wishList.selector'
import { selectCurrentUser} from '../../redux/user/user.selector';

const MovieDetail=({currentUser,currentItem,listItems})=>{


  const {id,type} = currentItem
  const oneType = type.includes(',') ? type.substr(0,type.indexOf(',')):type  
  return (
    <Container>
    <Wrap className="detail">
         <DetailBook id={id} currentUser={currentUser} doc='books' listItems={listItems} chosenType={oneType}></DetailBook>
    </Wrap>

    <Wrap className="related">
         <span>Similar movies</span>
         <RelatedCollection id={id} doc='books' currentItem={currentItem} chosenType={oneType} type={type}></RelatedCollection>
    </Wrap>
    </Container>
  )
}


const Wrap = styled.div.attrs((props)=>({
  className: props.classname 
}))`
  &.detail{
    padding:90px 0px 100px 35px;
    flex:0.7 ;
  }
  &.related{
      flex:0.35;
      box-sizing: border-box;
      padding-top:120px;
      padding-left:50px ;
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
  currentUser: selectCurrentUser,
})

export default connect(mapStateToProps)(MovieDetail)
