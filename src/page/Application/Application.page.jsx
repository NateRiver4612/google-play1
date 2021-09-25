// import React from 'react'
// import ApplicationHome from './ApplicationHome.page';
// import ApplicationCollection from './ApplicationCollection.page';
// import {Route} from 'react-router-dom'
// import CategoryBar from '../../component/category-bar/CategoryBar.component';
// import CategoryCart from '../../component/category-bar/CategoryCart.component';
// import {selectToggleCart, selectCartCategories} from '../../redux/cart/cart.selector'
// import { connect } from 'react-redux';

// const Application=({match,hidden,categories})=>{
//     return (
//         <div>
//             <CategoryBar homeLink={match.url}/>
//             {!hidden
//                 ?
//                     <CategoryCart option = "App" categories={categories}></CategoryCart>
//                 :
//                     ''
//             }
//             <Route exact path={`${match.path}`} component={ApplicationHome}/>
//             <Route path={`${match.path}/category/:collectionId`} component={ApplicationCollection}/>
//         </div>
//     )
// }

// const mapStateToProps=(state)=>({
//     hidden:selectToggleCart(state),
//     categories:selectCartCategories('apps')(state),

// })

// export default connect(mapStateToProps)(Application);
