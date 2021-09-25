import React from 'react'
import BookItem from '../../component/item/BookItem/BookItem.component'
import styled from 'styled-components'
import MovieItem from '../../component/item/MovieItem/MovieItem.component'
import CheckOutItem from '../../component/item/checkout/checkout-item.component'
import { selectListItems } from '../../redux/wish-list/wishList.selector'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { selectWishListTotal } from '../../redux/wish-list/wishList.selector'
import StripeCheckoutButton from '../../component/stripe-button/stripe-button.component'

const  CheckoutPage = ({wishList,total})=>{
    console.log('wishList',wishList)
    return (
        <Container>
            <Wrap className='checkout-header'>
                <Wrap className='header-block'>
                    <h1>Cart Items</h1>
                </Wrap>
                <Wrap className="header-block">
                <h1>
                    <StripeCheckoutButton wishList={wishList} total price={total} content={`Pay in total: ${total},000 VND`}/>
                </h1>
                </Wrap>
            </Wrap>
            <Wrap className="checkout-items">
            {
                wishList
                ? wishList.map(listItem=>{
                    const {doc,item} = listItem
                    return <CheckOutItem  item={item} doc={doc}/>
                })
                :[] 
            
            }
            </Wrap>

        </Container>
    )
}

const Wrap = styled.div.attrs(props => ({
    className:props.classname
}))`

    &.checkout-header{
        display:flex;
        width: 100%;
        justify-content: space-between;
        h1{
            font-family: 'Quicksand', sans-serif;
        }
    }

    &.checkout-items{
        display: grid;
        grid-gap: 5px;
        grid-template-columns: repeat(6,minmax(0,1fr));
    }
`

const Container = styled.div`
    padding:40px;


`
const mapStateToProps = ()=>createStructuredSelector({
    wishList:selectListItems,
    total:selectWishListTotal
})

export default connect(mapStateToProps)(CheckoutPage)
