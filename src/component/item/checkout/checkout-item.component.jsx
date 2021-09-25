import React from 'react'
import styled from 'styled-components'
import { AiFillStar } from "react-icons/ai";
import { withRouter } from 'react-router';
import { selectCurrentItemStart } from '../../../redux/Item/item.action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { MdDelete} from 'react-icons/md';
import {removeItem} from '../../../redux/wish-list/wishList.action'
const CheckOutItem = ({selectCurrentItemStart,history,item,removeItem,doc})=> {
    var md5 = require('md5')
    const {imgUrl,id,type,price,title} = item
    const oneType = type.includes(',') ? type.substr(0,type.indexOf(',')):type  

    return (
        <Container onClick={()=>{
            selectCurrentItemStart(id,type); 
            // history.replace(`/books/details/${title}${md5(id)}`)
        }}>
            <Wrap>
               <Link style={{textDecoration:'none'}} to={`/${doc}/details/${title}${md5(id)}`}>
                <img alt="" src={imgUrl}/>
               </Link>
            </Wrap>
            <Wrap className='price'>
                {price}.000 đ
            </Wrap>
            <Wrap>
                <Button onClick={()=>removeItem({item,doc})}><MdDelete/></Button>
            </Wrap>
        </Container>
    )
}

const LINK = styled(Link)`
    text-decoration: none;
    font-family: 'Quicksand', sans-serif;
`


const Wrap = styled.div.attrs(props=>({
    className: props.classname,}))`
    display: flex;
    justify-content: center;
    &.price{
        font-family: 'Quicksand', sans-serif;
        color:black;
        font-weight: 600;
        opacity: 0.6;
    }
    button{
        width: 100%;
        /* background-color: #ffffff; */
        border-radius: 0px !important;
        &:hover{
            background-color: #e63939;
            svg{
                color:white
            }
        }
        svg{
            font-size:20px;

            /* &:hover{
                color:white;
            } */
        }
    }
`

const Container = styled.div`
    cursor: pointer;
    background-color: #ffffff;
    width:fit-content;
    padding:0 !important;
    height: 231px;
    /* box-shadow: 0 8px 6px -6px black; */
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45,0.94) 0s; 
    img{
        width: 162px !important;
	    height: 231px  !important;
        display: block;
        -webkit-filter: brightness(80%);

        &:hover{
            -webkit-filter: brightness(100%);
        }
    }

    &:hover{    
        transform: scale(1.05);

        img{
            -webkit-filter: brightness(100%);
        }
    }    

`

const mapDispatchToProps = (dispatch)=>({
    selectCurrentItemStart:(id,type)=>dispatch(selectCurrentItemStart({id,type})),
    removeItem:(item)=>dispatch(removeItem(item))
})

export default withRouter(connect(null,mapDispatchToProps)(CheckOutItem))
