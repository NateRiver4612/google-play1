import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import WithSpinner from '../../component/with-spinner/with-spinner.component'
import MovieCollection  from './MovieCollection.page'
import {selectStoreIsLoaded} from '../../redux/store/store.selector'


const mapStateToProps = createStructuredSelector({
    isLoading : (state)=>!selectStoreIsLoaded(state)
})


const MovieCollectionContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(MovieCollection)

// const MovieCollectionContainer = connect(mapStateToProps)(WithSpinner(MovieCollection))

export default MovieCollectionContainer