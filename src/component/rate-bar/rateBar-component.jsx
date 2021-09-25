import React,{useMemo} from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {BsFillStarFill, BsStarHalf } from 'react-icons/bs' 
import {MdInsertComment} from 'react-icons/md'

export const RateBars = ({selectedComments}) => {
    var rate5 = 0
    var rate4 = 0
    var rate3 = 0
    var rate2 = 0
    var rate1 = 0


    

    selectedComments.map(
        comment=>{
            if(comment.value == 5){
                rate5+=1    
            }
            if(comment.value == 4){
                rate4+=1    
            }
            if(comment.value == 3){
                rate3+=1    
            }
            if(comment.value == 2){
                rate2+=1    
            }
            if(comment.value == 1){
                rate1+=1    
            }

    })

    const total = useMemo(()=>selectedComments.length,[selectedComments])
    const average = useMemo(()=> ((5*rate5 + 4*rate4 + 3*rate3 + 2*rate2 + 1*rate1) / total).toFixed(1),[rate1,rate2,rate3,rate4,rate5,total])

    var remain = average.split('.')[1]
    var number = average.split('.')[0]
    
    const rate5Percent = useMemo(()=>Math.floor((rate5*100) / total),[total])
    const rate4Percent = useMemo(()=>Math.floor((rate4*100) / total),[total])
    const rate3Percent = useMemo(()=>Math.floor((rate3*100) / total),[total])
    const rate2Percent = useMemo(()=>Math.floor((rate2*100) / total),[total])
    const rate1Percent = useMemo(()=>Math.floor((rate1*100) / total),[total])

    return (
        <Container>
         <AverageRate>
            <span className='rate-number'>{!isNaN(average) ? average : '0.0'}</span>
            <span className='rate-stars' >
            {
                Array.from(Array(5),(e,i)=>{
                    if(i < number){
                        return <Star className='rate'></Star>
                    }else{
                        if(remain){
                            if(remain < 5){
                                remain = null
                                return <Star></Star>
                            }
                            if(remain >= 5){
                                remain = null
                                return <BsStarHalf style={{ fontSize:'18px', color:'black',opacity:'0.6'}}></BsStarHalf>
                            }
                        }
                        return <Star></Star>
                    }
                })
            }
            </span>
            <span className='rate-total'>
            <MdInsertComment/> Total {total}</span>
        </AverageRate>

        <RateBar>
            <Row className="row-5">
                <span>5</span>
                <Bar style={{width:`${rate5Percent}%`}} className="bar-5"></Bar>
            </Row>
            <Row className="row-4">
                <span>4</span>
                <Bar style={{width:`${rate4Percent}%`}} className="bar-4"></Bar>
            </Row>
            <Row className="row-3">
                <span>3</span>
                <Bar style={{width:`${rate3Percent}%`}} className="bar-3"></Bar>
            </Row>
            <Row className="row-2">
                <span>2</span>
                <Bar style={{width:`${rate2Percent}%`}} className="bar-2"></Bar>
            </Row>

            <Row className="row-1">
                <span>1</span>
                <Bar style={{width:`${rate1Percent}%`}} className="bar-1"></Bar>
            </Row>
        </RateBar>
        </Container>
    )
}
const Container = styled.div`
    box-sizing:border-box;
    padding-top: 20px;
    display:flex;
    padding-left:40px;
    padding-right:40px;
    padding-bottom: 0!important;
    padding-bottom: 10px;
    width:100%;
`


const RateBar = styled.div`
    box-sizing:border-box;
    width:70%;
    padding-top:15px;
    padding-left: 10px;
    height: fit-content;
`
const AverageRate = styled.div`
    width: 30%;
    font-family: 'Quicksand', sans-serif;
    span{
        display: block;
        width:100%;
        &.rate-stars{
            text-align:center;
            svg{
                margin:2px;
            }
        }

        &.rate-number{
            opacity:0.6;
            font-size:4.5rem !important;
            text-align:center;
        }

        &.rate-total{
            color:black;
            display: flex;
            font-weight:bold;
            opacity:0.7;
            justify-content:center;
            align-items: center;
            font-size:15px;

            svg{
                font-size:14px;
                padding: 2px;
            }
        }
    }
`

const Row = styled.div`
    display:flex;
    padding-bottom:5px;
    span{
        font-size: 12px;
        padding-right:10px;
        padding-left:2px;
        padding-top:2px;
        padding-bottom: 2px;
        font-weight:600;
        opacity: 0.6;
    }
`

const Bar = styled.div`
    &.bar-5{
        background-color: #79c9a1;
    }

    &.bar-4{
        background-color: #aed888;
    }

    &.bar-3{
        background-color: #ffd935;
    }

    &.bar-2{
        background-color: #ffb235;
    }

    &.bar-1{
        background-color: #ff8c5a;
    }
`

const Star = styled(BsFillStarFill)`
    font-size:18px;
    color:#e0e0e0;
    padding-right: 5px;

    &.rate{
        color:black;
        opacity:0.6;
    }
`


const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(RateBars)
