import React,{lazy, Suspense} from 'react'
import {Route} from 'react-router-dom'
import { selectCartCategories } from '../../redux/cart/cart.selector'
import { connect } from 'react-redux'
import { selectToggleCart } from '../../redux/cart/cart.selector'
import CategoryBar from '../../component/category-bar/CategoryBar.component'
import CategoryCart from '../../component/category-bar/CategoryCart.component'
import Spinner from '../../component/spinner/spinner.component'

const ChartPage = lazy(()=>import('../Chart-Page/Chart.page'))
const BookHome = lazy(()=>import('./BookHome.page'))
const BookCollectionContainer = lazy(()=>import('./BookCollection.container'))
const BookDetail = lazy(()=>import('./BookDetail.page'))
const PersonPage = lazy(()=>import('../Person-Page/Person.page'))
const SearchPage = lazy(()=>import('../Search-Page/SearchPage.page'))

const Book=({match,cartCategories,hidden})=>{
    return (
        <div>
            <CategoryBar  homeLink='/books'/>
            {hidden
                ?
                null
                :
                <CategoryCart option="Book" categories={cartCategories} ></CategoryCart>

            }
            <Suspense fallback={<Spinner/>}>
                <Route exact path={`${match.path}`} component={BookHome}/>
                <Route path={`${match.path}/category/:collectionId`} component={BookCollectionContainer}/>
                <Route path={`${match.path}/details/:bookInfo`} component={BookDetail}/>
                <Route path={`${match.path}/participant/:personInfo`} component={PersonPage} />
                <Route exact path={`${match.path}/:chartId`} component={ChartPage}/>
                <Route path={`${match.path}/search/:searchInfo`} component={SearchPage}/>
            </Suspense>
        </div>
    )
}

const mapStateToProps = (state)=>({
    cartCategories: selectCartCategories('books')(state),
    hidden: selectToggleCart(state)
})


export default connect(mapStateToProps)(Book);
