import React from 'react'
import {AccWrapper,AccSum} from './navbar.component'
import { BsGridFill } from "react-icons/bs";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectNavBar} from '../../redux/navbar/navbar.selector'
import {toggleNavBar} from '../../redux/navbar/navbar.action'

const Entertainment= ({history,match,panel,toggleNavBar})=>{
    return (
        <AccWrapper 
        square="true" 
        className="Entertainment"
        expanded={panel === 'panel1'} 
        onChange={()=>toggleNavBar('panel1')}
        onClick = {()=>history.push(`${match.url}entertainment`)}
        >
        <AccSum   aria-controls="panel1d-content" id="panel1d-header">
          <BsGridFill/>
          <span>Entertainment</span>
        </AccSum>
      </AccWrapper>
    )
}


const mapStateToProps = createStructuredSelector({
  panel:selectNavBar
})

const mapDispatchToProps = dispatch => ({
  toggleNavBar:panel => dispatch(toggleNavBar(panel)),
});

export default React.memo(connect(mapStateToProps,mapDispatchToProps)(Entertainment));
