import React,{lazy,useRef,Suspense, useEffect} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import { selectCartCategories } from '../../redux/cart/cart.selector'
import CategoryBar from '../../component/category-bar/CategoryBar.component'
import styled from 'styled-components'
import CategoryCart from '../../component/category-bar/CategoryCart.component'
import { selectToggleCart } from '../../redux/cart/cart.selector'
import Spinner from '../../component/spinner/spinner.component'
import ErrorBoundary from '../../component/error-boundary/Error-Boundary.component'
import {fetchUsersStart} from '../../redux/store/store.action'
import ScrollToTop from '../../component/scrollToTop/ScrollToTop.component'
import { useLocation } from 'react-router'
import { withRouter } from 'react-router'


const ChartPage = lazy(()=>import('../Chart-Page/Chart.page'))
const MovieHome = lazy(()=>import('./MovieHome.page'))
const MovieCollectionContainer = lazy(()=>import('./MovieCollection.container'))
const MovieDetailContainer = lazy(()=>import('./MovieDetail.container'))
const PersonPage = lazy(()=>import('../Person-Page/Person.page'))
const SearchPage = lazy(()=>import('../Search-Page/SearchPage.page'))


const Movie=({match,cartCategories,history,hidden})=> {
    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView()    

    // Scroll to top if path changes
    useEffect(() => {
        executeScroll();
    });

    
    return (
        <Container ref={myRef}>
        <ErrorBoundary>
            <CategoryBar  style={{position:'fixed'}} homeLink='/movies'/>
            {hidden
                ?
                null
                :
                <CategoryCart option="Movie" categories={cartCategories} ></CategoryCart>

            }
            <Suspense fallback={<Spinner/>}>
                <ScrollToTop/>
                <Route exact path={`${match.path}`} component={MovieHome}/>
                <Route path={`${match.path}/category/:collectionId`} component={MovieCollectionContainer}/>
                <Route path={`${match.path}/details/:movieInfo`} component={MovieDetailContainer}/>
                <Route path={`${match.path}/participant/:personInfo`} component={PersonPage} />
                <Route exact path={`${match.path}/:chartId`} component={ChartPage}/>
                <Route path={`${match.path}/search/:searchInfo`} component={SearchPage}/>
            </Suspense>
        </ErrorBoundary>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    width: 100%;

`

const mapStateToProps = (state)=>({
    cartCategories: selectCartCategories('movies')(state),
    hidden: selectToggleCart(state)
})

const mapDispatchToProps = dispatch=>({
    fetchUsersStart:(option)=>dispatch(fetchUsersStart(option))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Movie))