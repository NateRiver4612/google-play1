import StripeCheckout from 'react-stripe-checkout';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import axios from 'axios';
import {BuyItemStart} from '../../redux/buy-list/BuyList.action.js'
import { connect } from 'react-redux';
import { removeItem } from '../../redux/wish-list/wishList.action.js';
import React,{useMemo} from 'react'

const StripeCheckoutButton = ({price,wishList,doc,item,BuyItemStart,content,total})=>{
    const priceForStripe = price*100
    const publishableKey = "pk_test_51JOLZMF0RXpkTkFSFLqznUqj9jVy3BMJpJ9ELRNBVJrvES6x4kKyiqelyBTSPKjxi8qw3T2Gj7syKKeO7UGop8Ie00hgX7zMCJ"
    const date = new Date()
    
    // const date = useMemo(()=>{
    //   const DateArr = DateFormat.toDateString().split(' ')
    //   return `${DateArr[1]} ${DateArr[2]}, ${DateArr[3]}`
    // },[DateFormat])

    const onToken = token => {
        axios({
          url:'payment',
          method:'post',
          data:{
            amount: priceForStripe,
            token
          }
        }).then(response=> {
          alert("payment successful")
        }).catch(error=>{
          console.log('Payment error:',JSON.parse(error))
          alert(
            'There was an issue with your payment.Please sure you use the provided credit card'
          )
        })
        if(wishList){
          wishList.map(Item=>{
            const item = Item['item']
            const doc = Item['doc']
            BuyItemStart({doc,item,date})
          })
        }else{
          BuyItemStart({doc,item,date})
        }
        alert('Payment Succesful!');
      };
    return (
        <Container>
        <StripeCheckout
           name = 'Google Play'
           billingAddress
           shippingAddress
           image="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.15752-9/p1080x2048/237094063_2691562511137044_6314913463799483470_n.png?_nc_cat=111&ccb=1-5&_nc_sid=ae9488&_nc_ohc=WYVhp7y1hosAX9P6yHv&_nc_ht=scontent.fsgn2-1.fna&oh=4afbe085f0e0a390debcc559a9838297&oe=61427E1D"
           description={`Your total is ${price}.000 VND`}
           amount = {priceForStripe}
           panelLabel = 'Pay now'
           token = {onToken}
           allowRememberMe 
           class=" "
           stripeKey={publishableKey}            
        >
        <BuyButton className={total? "total": "buy" } style={{fontSize:'12px'}}>
            {content}
        </BuyButton>
        </StripeCheckout>
        </Container>
    )
}
const Container = styled.div`
    cursor:pointer;
    border-radius: 4px;
    background-color:#ed3b3b !important;
    color:white !important;
    font-size: 14px !important;
`
const BuyButton = styled(Button).attrs(props=>({
  className:props.classname
}))`
    margin: 0 !important;
    color:white !important;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif !important;
    height:fit-content;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset !important;
    text-transform: capitalize !important;
    font-weight: bold !important;

    &.buy{
      font-size: 14px !important;
    }
    &.total{
      font-size: 17px !important;
    }
`

const mapDispatchToProps = dispatch=>({
  BuyItemStart:(item)=>dispatch(BuyItemStart(item)),
  removeItem:(item)=>dispatch(removeItem(item))
})

export default connect(null,mapDispatchToProps)(StripeCheckoutButton)