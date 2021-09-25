import React from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import { selectBooks } from '../../redux/store/store.selector'
import {connect} from 'react-redux'
import BookItem from '../../component/item/BookItem/BookItem.component'
import { Link } from 'react-router-dom'
const  BookHome=({books, match}) => {

    const shuffleArray = (array)=> {
        array = [...Object.keys(array).map(key=>array[key])]

        let i = array.length - 1;
       
        for (; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
    }
    return (
        <Container>
        {
            Object.keys(books).map((category)=>( 
                <div className='collection'>
                    <Link to={`${match.url}/category/${category}`}>
                        <H1>{category}</H1>
                    </Link>
                    <Wrap classaName="movie-items">
                        {
                            shuffleArray(books[category]).map((item,key)=>{
                                if(key <= 5){
                                    return <BookItem item={item} />
                                }
                            })
                        }
                    </Wrap>
                </div>
            ))
        }
        </Container>
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

const Container = styled.div`
    padding-bottom: 100px;
`

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
const mapStateToProps = state =>({
    books:selectBooks(state)
})

const mapDispatchToProps = dispatch =>({
   
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookHome))
