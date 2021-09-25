import { createStructuredSelector } from "reselect";
import WithSpinner from "../../component/with-spinner/with-spinner.component";
import { selectStoreIsLoaded } from "../../redux/store/store.selector";
import { compose } from "redux";
import BookCollection from './BookCollection.page'
import { connect } from "react-redux";

const mapStateToProps = createStructuredSelector({
    selectStoreIsLoaded:(state)=>!selectStoreIsLoaded(state)
})

const BookCollectionContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(BookCollection)

export default BookCollectionContainer
