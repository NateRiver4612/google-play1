import {AiOutlineShopping} from 'react-icons/ai'
import React from 'react'
import { connect } from 'react-redux'
import './wishList-Icon.styles.scss'
import styled from 'styled-components'
import { toggleList } from '../../redux/wish-list/wishList.action'
import { createStructuredSelector } from 'reselect'
import {selectListItemCount} from '../../redux/wish-list/wishList.selector'
export const WishListIcon = ({listItemsCount,toggleList}) => {
    return (
        <div className='cart-icon'>
            <AiOutlineShopping className='shopping-icon'/>
            <span className='item-count'>{listItemsCount}</span>
        </div>
    )
}

const ShoppingIcon = styled(AiOutlineShopping)`
    
`

const mapStateToProps = createStructuredSelector ({
  listItemsCount : selectListItemCount
})

const mapDispatchToProps =dispatch=> ({
   toggleList:()=>dispatch(toggleList())
})

export default connect(mapStateToProps,mapDispatchToProps)(WishListIcon)
