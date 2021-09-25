import WithSpinner from "../../component/with-spinner/with-spinner.component";
import MovieDetail from "./MovieDetail.page";
import { getCurrentItemLoaded } from "../../redux/Item/item.selector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";

const mapStateToProps = createStructuredSelector({
    isLoading:(state)=> !getCurrentItemLoaded(state)
})

const MovieDetailContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(MovieDetail)



export default MovieDetailContainer










