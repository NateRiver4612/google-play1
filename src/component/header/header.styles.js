import styled from "styled-components"
import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import { Avatar } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';



export const IconWrap = styled.div.attrs(props=>({
    className:props.className
  }))`
    display: flex;
    flex:0.05;
    justify-content: flex-end;
    padding-left: 8px;
  
  
    @media screen and (max-width:800px){
      div{
        height:30px;
        width:30px;
      }
    }
`
  
export const Wrap = styled.div.attrs(props=>({
    className:props.classname
  }))`
    display: flex;
    align-items: center;
    button{
      padding-left:0px !important;
      background-color: unset!important;
      svg{
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45,0.94) 0s;
      }


      &:hover{

        svg{
          transform: scale(1.1);
        }
      }
    }
    flex:0.7;


    @media screen and (max-width:800px){
      flex:0.9;
    }
  `
  
export const LINK = styled(Link)`
      text-decoration:none;
      color: black;
      cursor: pointer;  
      font-size: 26px;
      display: flex;
      flex:0.2;
      justify-content: center;
      align-items: center;
      margin-right:20px;
      letter-spacing: 1px;
  
      span{
        margin-left:8px ;
        font-weight: 600;
        font-family: 'Arvo', serif;
        /* font-family: 'Patua One', cursive; */
      }
      img{
        width:53px;
        height:53px;
      }
  
      @media screen and (max-width:800px){
        font-size: 16px;
        flex: 0.1;
        margin-right:10px;
        img{
          width:35px;
          height: 35px;
          padding-left:unset;
        }
  
  
      }
  `
  
  
export const Button = styled(IconButton)`
    border:none;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items:center;
  
    &:active{
      color:#2a4283;
    }
  
    @media screen and (max-width:800px){
      font-size: 10px;
  
      svg{
        font-size:19px;
      }
    }
  
  `
export const Ava = styled(Avatar)`
    margin-right: 40px;
    width: 35px !important;
    height: 35px !important;
    position: relative;
    @media screen and (max-width:800px){
      margin-right: 5px;
    }
  
    &:hover{
      opacity: 0.5;
    }
    
    &:after{
      content:'Sign Out';
      font-size: 14px;
      opacity: 0;
      color:white;
      text-align:center;
      position:absolute
  
    }
  
  `
  
  
  
export const Container = styled.div`
    height:60px;
    display: flex;
    align-items: center;
    background-color: #f3f3f4;
    justify-content: space-between;
  
    @media screen and (max-width:800px){
      height:50px;
    }
  `
export const SearchField = styled(TextField)`
    border:3px solid white;
    height: 30px;
    content:"Hello";
    width:60%;
    color:white;
  
  `