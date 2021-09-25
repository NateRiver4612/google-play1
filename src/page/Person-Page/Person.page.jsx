import  styled from 'styled-components'  
import React from 'react'
import Person from '../../component/person/Person.component'
import {selectCurrentPerson} from '../../redux/person/person.selector'
import {connect} from 'react-redux'
import PersonContainer from '../../component/person/Person.container'
import { createStructuredSelector } from 'reselect'
const  PersonPage = ({CurrentPerson})=> {
    return (
        <Container>
            <PersonContainer person={CurrentPerson}/>
        </Container>
    )
}

const Wrap = styled.div`

`

const Container = styled.div`
    box-sizing:border-box;
    height:100%;
    padding-right:60px;
    padding-left:40px;
    padding-top: 50px;
    padding-bottom: 40px;
`
const mapStateToProps = createStructuredSelector({
    CurrentPerson:selectCurrentPerson
})

export default connect(mapStateToProps)(PersonPage)

