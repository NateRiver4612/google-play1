import React,{useEffect,useMemo,useState} from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import MovieItem from '../../component/item/MovieItem/MovieItem.component'
import { createStructuredSelector } from 'reselect';
import {connect} from 'react-redux'
import {selectMovies, selectMovieDetail, selectMoviesByType} from '../../redux/store/store.selector'
import CategoryCart from '../../component/category-bar/CategoryCart.component';
import {withRouter} from 'react-router-dom'

const BookChartPage=({movies,match})=>{
    const [selectedItems,setSelectedItems] = useState([])
    const date = new Date()

    const now = useMemo(
    ()=>{
        date.setMonth(date.getMonth() - 1);
        date.setHours(0,0,0,0);

        return  date / 1000|0;
    },[date])

    const chart = match.params.chartId

    useEffect(()=>{
        const arr = []

        Object.keys(movies).map((key)=>{
            Object.keys(movies[key]).map(movie=>{
                arr.push(movies[key][movie])
            })
        })

        for(var i = 0;i < arr.length;i++){
            for(var j = i+1;j < arr.length - 1 ; j++){
                if(arr[i]['id'] === arr[j]['id']){
                    arr.splice(j,1)
                }
            }
        }

        arr.sort((a, b)=> {
            return b.update.seconds - a.update.seconds
        });

        if(chart == 'top'){
            setSelectedItems((arr.filter(movie=>(movie.rate == 5))))
        }
        else if(chart == 'new'){
            setSelectedItems(arr.filter(movie=>(movie.update.seconds >= now)))
        }
    },[movies,chart])


    return (
        <div className='collection'>
            <H1 >{chart}  movies</H1>
            <Container classaName="movie-items">
                {
                selectedItems.map((item)=>{
                    return <MovieItem  item={item} />})
                }
            </Container>
        </div>
    )
}

const H1 = styled.h1`
    display:inline-block;
    padding-top:60px;
    font-family: Quicksand ,sans-serif;
    font-size: 28px;
    font-weight: 400;
    padding-left:60px;
    color:#414141;
    text-transform: capitalize;

    @media screen and (max-width:800px){
        display: none;
    }

`


const Container = styled.div.attrs((props)=>({
    className:props.classname
}))`
        z-index: 1;
        padding-left:60px;
        padding-right: 60px;
        padding-bottom: 40px;
        display: grid;
        grid-gap:15px;  
        grid-template-columns: repeat(6,minmax(0,1fr));

        @media screen and (max-width:800px){
            padding-left:15px;
            padding-top: 10px;
            padding-right: 15px;
            grid-template-columns: repeat(2,minmax(0,1fr));
        }

`

const mapStateToProps =(state,ownProps)=>({
    movies: selectMovies(state),
})


export default connect(mapStateToProps)(BookChartPage);
