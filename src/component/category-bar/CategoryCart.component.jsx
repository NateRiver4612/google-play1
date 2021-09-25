import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import { Link,withRouter } from 'react-router-dom'
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import {selectCart} from '../../redux/cart/cart.actions'

const CategoryCart =({categories,history,selectCart,toggleCartHidden,match,option})=>{
    const cartLength = categories.length
    const [additionalData,setAdditionalData] = useState([])
    const [currentOption,setCurrentOption] = useState()
    const [cartCategories,setCartCategories] = useState(categories)


    useEffect(() => {
        setCurrentOption(option)
        categories.map((type)=>{
            if(typeof type === 'object'){
                setAdditionalData(type)
            }
        })
    }, [categories,option])

    useEffect(()=>{
        if(currentOption == 'App'){
            setCartCategories(categories)
        }else{
            var array = []
            Object.keys(additionalData).map(option=>{
               if(option == currentOption){
                     additionalData[option][0].split(',').map(type=>{
                         array.push(type)
                     })
                 setCartCategories(array)
                 return
            }})
        }
        
    },[currentOption,additionalData])

    const handleCurrentOption =  async (key)=>{
        await setCurrentOption(key)
    }
    return (
        <Container>
            <Span onClick={()=>{
                history.push(`${match.url}`)
                selectCart(option) 
                toggleCartHidden()
            }}>{currentOption}</Span>

            <Line/>
            <Wrap className={(cartLength>6 ? "big" : "small")}>
            {

                cartCategories.map(type=>{
                    if(typeof type !== 'object'){
                        return <Span onClick={()=>{
                            toggleCartHidden();
                            selectCart(type) 
                            history.push(`${match.url}/category/${type}`)
                        }}>{type}
                        </Span>  
                    }
                })
            }
            </Wrap>
            {
                Object.keys(additionalData).length > 0
                ?                
                <div>
                <Line/>
                {
                    Object.keys(additionalData).map(key=>{
                        if(key === currentOption){
                            return <Span onClick={()=>{handleCurrentOption(option)}}>click to see {option} category</Span>
                        }
                        return <Span onClick={()=>{handleCurrentOption(key)}}>click to see {key} category</Span>
                    })

                }
                </div>
                :
                    ''
                
            }
        </Container>
    )
}

const Wrap = styled.div`
    width:fit-content;
    height: auto;
    display: grid;

    &.small{
        grid-template-columns: repeat(1,minmax(0,1fr));
    }
    &.big{
        grid-template-columns: repeat(2,minmax(0,1fr));
    }
    
    flex-direction: column;
    background-color: white;
`
const Line = styled.div`
    width: 100%;
    border:0.1px solid #e7e7e7;
`

const Container = styled.div`
    margin-top:49px;
    margin-left: 10px;
    position: fixed;
    border:#eeeeee 1px solid;
    z-index:5;
    flex-direction: column;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    @media screen and (max-width:800px){
        margin-top: unset;
        margin-left:unset;
    }

`
const Span = styled.div.attrs(props=>({
    className : props.classname
}))`

    &.Head{
        border-radius: 3px 3px 0px 0px;
    }

    &.Tail{
        border-radius: 0px 0px 3px 3px;
    }
    border:none;
    color:#3e3e3e;
    font-size: 14px;
    font-weight: 500;
    opacity: 0.66;
    box-sizing: border-box;
    padding: 20px 15px;
    background-color: white;
    display:flex;
    height: 30px;
    align-items: center;
    width: 100%;
    cursor: pointer;

    @media screen and (max-width:800px){
        padding: 15px 10px;
    }

    &:hover{

        -webkit-filter: brightness(85%);
    }

`

const mapDispatchToProps = (dispatch)=>({
    toggleCartHidden:()=>dispatch(toggleCartHidden()),
    selectCart:(type)=>dispatch(selectCart(type))
})
export default withRouter(connect(null,mapDispatchToProps)(CategoryCart))