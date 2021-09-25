import styled from 'styled-components'
import { Button  } from '@material-ui/core';

export const SendButton = styled(Button)`
    background-color: #ed3b3b !important;
    color:white!important;
    font-size: 17px !important;
    text-transform: none !important;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    padding:3px 20px 3px 20px !important;
`

export const TextArea = styled.textarea`
    background-color:#f5f5f5;
    outline: none;
    resize: none;
    border:none;
    padding:15px;
    width: 100%;
    height:180px;
    opacity: 0.7;
` 


export const WriteButton = styled(Button)`
    opacity: 0.6;
    display:flex;
    font-weight:bold!important;
    font-size: 12px !important;
    text-transform: none;   
    font-family: unset !important;
    left:75%;
    padding:5px 15px 5px 15px !important;
    align-items: center !important;
    width:153px;
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    justify-content: space-between !important;

    svg{
        font-size:14px!important;
    }
`

export const CommentZone = styled.div`
    width:100%;
    div{
        box-sizing:border-box;
        &.popup-header{
            height: 50px;
            width:100%;
            margin-top:0!important;
            border:none;
            display:flex;
            color:#fef3f3;
            align-items:center;
            font-size:23px !important;
            padding:30px;
        }
        &.book{
            background-color: #039be5;
        }
        &.movie{
            background-color: #ed3b3b;
        }

        &.popup-note{
            width:100%;
            padding:20px 50px 20px 30px;
            opacity:0.8;
            font-size: 14px;
        }
        &.send-button{
            display: flex;  
            justify-content: flex-end;
            padding-right:40px;
            padding-bottom:20px;
        }
        &.popup-content{
            height: 50px;
            border:none;
            height:fit-content;
            width:98.7%;
            display: flex;
            padding-right:26px;
            padding-left:26px;
            div{
                &.popup-image{
                    flex:0.2;
                    img{
                        width:135px;
                        height:200px;
                    }
                }
                &.writing-field{
                    flex:0.7;
                    padding-left: 20px;
                    padding-right: 0!important;
                    div{
                        &.limit-count{
                            display: flex;
                            justify-content: space-between;
                            span{
                                font-size:13px;
                                opacity:0.6;
                                font-style: italic;
                            }
                        }

                        &.stars{
                            padding-top:20px;
                            display:flex;
                            width:30%;
                            justify-content: space-between;
                            div{
                                display: flex;
                                align-items: center;
                                opacity: 0.6;
                                font-family: cursive;
                                font-size:15px;
                            }
                        }
                    }
                }
            }
        }
    }

`