import React,{useCallback,useState} from 'react'
import styled from 'styled-components'
import { selectItems,selectMovies,selectBooks } from '../../redux/store/store.selector' 
import { connect } from 'react-redux'
import MovieItem from '../../component/item/MovieItem/MovieItem.component'
import BookItem from '../../component/item/BookItem/BookItem.component'
import { Link } from 'react-router-dom'
const  EntertainmentHomePage=({movies,books})=>{

    const [options,setOptions] = useState(['movies','books'])

    const selectedItems = useCallback(
        (items)=>{
            var arr = []
            Object.keys(items).map(key=>{
                Object.keys(items[key]).map((item)=>{
                    arr.push(items[key][item])
                })
            })        
            arr = arr.filter((thing, index, self) =>
                 index === self.findIndex((t) => {
                    return t.id === thing.id 
                })
            )
            return arr
    },[movies,books])
    console.log('items',selectedItems(movies))

    return (
        <div style={{paddingBottom:'100px'}}>
        {
            options.map((option)=>{
                return <div className='collection'>
                    <Link to={`/${option}`}> 
                        <H1>{option}</H1>
                    </Link>
                    <Wrap classaName="movie-items">
                        {
                            option === 'movies'
                            ?
                            selectedItems(movies).map((item,index)=>{
                                if(index < 6){
                                    return <MovieItem  item = {item}></MovieItem> 
                                }
                            })
                            :
                            selectedItems(books).map((item,index)=>{
                                if(index < 6){
                                    return <BookItem  item = {item}></BookItem> 
                                }
                            })
                        }
                    </Wrap>
                </div>
            })
        }
        </div>
    )
}

const Wrap = styled.div.attrs((props)=>({
    className:props.classname
}))`
        z-index: 1;
        padding-left:60px;
        padding-right: 60px;
        padding-bottom: 0px;
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

const H1 = styled.h1`
    display:inline-block;
    padding-top:60px;
    font-family: Quicksand ,sans-serif;
    font-size: 28px;
    text-transform: capitalize;
    cursor: pointer;
    font-weight: 400;
    padding-left:60px;
    color:#414141;

    @media screen and (max-width:800px){
        display: none;
    }

`
const mapStateToProps = state=>({
    movies:selectMovies(state),
    books:selectBooks(state)
})

export default connect(mapStateToProps)(EntertainmentHomePage);
