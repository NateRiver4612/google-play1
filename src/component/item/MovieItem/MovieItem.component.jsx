import React from 'react'
import { withRouter } from 'react-router';
import { selectCurrentItemStart } from '../../../redux/Item/item.action';
import { connect } from 'react-redux';
import {Container,Wrap,Span,StarIcon} from "./MovieItem.styles";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const MovieItem = ({selectCurrentItemStart,history,item})=> {
    var md5 = require('md5')
    const {title,rate,price,imgUrl,type,producer,id} = item
    const oneType = type.includes(',') ? type.substr(0,type.indexOf(',')):type  
    return (
        <LINK to={`/movies/details/${title}${md5(id)}`}>
        <Container onClick={()=>{
            selectCurrentItemStart(id,type) ; 
        }}>
            <Wrap className="Img-Wrap">
                <img alt="" src={imgUrl}/>
            </Wrap>
            <Wrap className="FirstLayer">
                <Span className="Title">{title.length>16 ? `${title.substr(0,14)}` : title}</Span>
                <Span className="Type">{oneType}</Span>
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
    text-decoration: none !important;
    font-family: 'Quicksand', sans-serif;
`


const mapDispatchToProps = (dispatch)=>({
    selectCurrentItemStart:(id,type)=>dispatch(selectCurrentItemStart({id,type}))
})

export default withRouter(connect(null,mapDispatchToProps)(MovieItem))
