import styled from 'styled-components'
import { AiFillStar } from "react-icons/ai";

export const StarIcon = styled(AiFillStar)`
    color:#737373;
    font-size: 13px;

`

export const Wrap = styled.div.attrs(props=>({
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
export const Span = styled.span.attrs(props=>({
    className: props.classname,}))`
    
    font-family: 'Quicksand', sans-serif;
    &.Title{
        font-size:17px;
        opacity: 0.9;
        color:#636363 ;
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
        opacity: 0.6;
        font-weight:600;
        color:black;
    }
    &.Img-Wrap{
        
    }
    &.Price{
        font-size: 13px;
        font-weight: bold;
        color:red;

        span{
            text-decoration: underline !important;
        }
    }

`

export const Container = styled.div`
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