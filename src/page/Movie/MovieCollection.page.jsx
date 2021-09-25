import React,{memo} from 'react'
import styled from 'styled-components'
import MovieItem from '../../component/item/MovieItem/MovieItem.component'
import {connect} from 'react-redux'
import { selectMoviesByType} from '../../redux/store/store.selector'

const MovieCollection=({movies,match})=>{
    console.log(match)
    const arr = []
    Object.keys(movies).map((key)=>{
        arr.push(movies[key])
    })

    const category = match.params.collectionId
    
    arr.sort(function(a, b) {
        return b.update.seconds - a.update.seconds
    });

    return (
        <div className='collection'>
            <H1>{category}</H1>
            <Container classaName="movie-items">
                {
                arr.map((item)=>{
                    return <MovieItem  
                       item = {item} />
                    })
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
    movies: selectMoviesByType(ownProps.match.params.collectionId)(state),
})


export default memo(connect(mapStateToProps)(MovieCollection));
