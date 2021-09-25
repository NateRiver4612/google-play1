import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import WithSpinner from '../../component/with-spinner/with-spinner.component'
import Person from './Person.component'
import {selectCurrentPersonLoading} from '../../redux/person/person.selector'


const mapStateToProps = createStructuredSelector({
    isLoading : (state)=>!selectCurrentPersonLoading(state)
})


const PersonContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(Person)

// const MovieCollectionContainer = connect(mapStateToProps)(WithSpinner(MovieCollection))

export default PersonContainer