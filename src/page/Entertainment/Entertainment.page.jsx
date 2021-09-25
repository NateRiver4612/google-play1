import React,{lazy,Suspense} from 'react'
import styled from 'styled-components'
import CategoryBar from '../../component/category-bar/CategoryBar.component'
import Spinner from '../../component/spinner/spinner.component'
import { withRouter ,Route } from 'react-router'

const EntertainmentHomePage = lazy(()=>import('../Entertainment/EntertainmentHome.page'))

const  EntertainmentPage=({match})=>{
    return (
        <div>
        <CategoryBar empty />
        <Suspense fallback={<Spinner/>}>
            <Route exact path={`${match.path}`} component={EntertainmentHomePage}/>
        </Suspense>
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
    padding-top:40px;
    font-family: Quicksand ,sans-serif;
    font-size: 28px;
    font-weight: 400;
    padding-left:60px;
    color:#414141;

    @media screen and (max-width:800px){
        display: none;
    }

`

export default withRouter(EntertainmentPage);
