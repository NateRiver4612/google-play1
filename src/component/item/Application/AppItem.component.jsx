import React from 'react'
import styled from 'styled-components'
import { AiFillStar } from "react-icons/ai";
import { withRouter } from 'react-router';
import { selectCurrentItemStart } from '../../../redux/Item/item.action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AppItem = ({item,selectCurrentItemStart,history})=> {
    var md5 = require('md5')
    const {id,title,author,rate,price,imgUrl,type} = item
    // const oneType = type.includes(',') ? type.substr(0,type.indexOf(',')):type  

    return (
        <LINK to={`/books/details/${title}${md5(id)}`}>
        <Container onClick={()=>
            selectCurrentItemStart(id,type)}
        >
            <Wrap className="Img-Wrap">
                <img alt="" src={imgUrl}/>
            </Wrap>
            <Wrap className="FirstLayer">
                <Span className="Title">{title.length>16 ? `${title.substr(0,14)}` : title}</Span>
                <Span className="Type">{author}</Span>
                <Wrap className="SecondLayer">  
                   <Wrap className="StarWrapper">
                        {Array.from(Array({rate}.rate),(e,i)=>{
                            return <StarIcon></StarIcon>
                        })}
                   </Wrap> 
                   <Span className="Price">{price}.000<span>đ</span></Span> 
                </Wrap>
            </Wrap>
        </Container>
        </LINK>
    )
}

const LINK = styled(Link)`
    text-decoration: none;
    font-family: 'Quicksand', sans-serif;
`

const StarIcon = styled(AiFillStar)`
    color:#737373;
    font-size: 13px;

`

const Wrap = styled.div.attrs(props=>({
    className: props.classname,}))`

    &.FirstLayer{
        padding: 5px;
        display: flex;
        flex-direction: column;
        letter-spacing: 0.5px;
        font-weight: 200;
        height: 80px;
    }

    &.SecondLayer{
        display: flex;
        align-items: center;
        margin-top: 20px;
        justify-content: space-between;
    }

    &.StarWrapper{
        
    }


`
const Span = styled.span.attrs(props=>({
    className: props.classname,}))`
    &.Title{
        font-size:17px;
        color:black;
        opacity: 0.7;
        position: relative;
        box-sizing: border-box;
        font-weight: 600 !important;
        
    }
    &.Title::after{
        content  : "";
        position : absolute;
        height:100%;
        right:0px;
        top:0px;
        background-image:linear-gradient(to right, 
                    rgba(255,255,255, 0), 
                    rgba(255,255,255, 1) 85%);
        width:80px;

    }

    &.Type{
        font-size: 13px;
        font-weight: 600;
        color:black;
        opacity: 0.6;
    }
    &.Img-Wrap{
        
    }
    &.Price{
        font-size: 13px;
        font-weight: 500;
        color:red;

        span{
            text-decoration: underline !important;
        }
    }

`

const Container = styled.div`
    overflow:hidden;
    border-radius: 4px;
    cursor: pointer;
    background-color: #ffffff;
    position:relative;
    width:fit-content;
    box-shadow: 0 8px 6px -6px black;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45,0.94) 0s; 
    img{
        width: 162px !important;
	    height: 231px  !important;
        backface-visibility: hidden;
        -webkit-filter: brightness(80%);

        &:hover{
            -webkit-filter: brightness(100%);
        }
    }

    &:hover{    
        transform: scale(1.05);
        box-shadow:rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;

        img{
            -webkit-filter: brightness(100%);
        }
    }   

`

const mapDispatchToProps = (dispatch)=>({
    selectCurrentItemStart:(id,type)=>dispatch(selectCurrentItemStart({id,type}))
})

export default withRouter(connect(null,mapDispatchToProps)(AppItem))
