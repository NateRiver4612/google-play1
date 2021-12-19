import React,{useState, useRef, useLayoutEffect,memo,useEffect,useMemo} from 'react';
import { Link } from 'react-router-dom';
import ModalVideo from "react-modal-video";
import {selectItemDetail} from '../../../redux/store/store.selector'
import 'react-modal-video/scss/modal-video.scss';
import { connect } from 'react-redux';
import ReactTextCollapse from '../../react-text-collapse/ReactTextCollapse'
import { Container,Wrap,Span,AddCartButton, PurchasedIcon,AddCartIcon,RemoveCartIcon,ButtonContainer, WarningIcon } from './DetailMovie.styles.js';
import { addItem,removeItem } from '../../../redux/wish-list/wishList.action.js';
import {selectPersonStart} from '../../../redux/person/person.action'
import StripeCheckoutButton from '../../stripe-button/stripe-button.component'
import 'reactjs-popup/dist/index.css';
import User from '../../user/user.component'
import { firestore } from '../../../firebase/firebase.utils';
import PopupComment from '../../popup-comment/popup-comment.component';
import RateBars  from '../../rate-bar/rateBar-component';
import {MdDelete} from 'react-icons/md'
import {signInWithGoggleStart} from '../../../redux/user/user.action'
import { useLocation } from 'react-router';
import { withRouter } from 'react-router';
import { selectBuyItems } from '../../../redux/buy-list/BuyList.selector';
import {TiTick} from 'react-icons/ti'

const  DetailMovie= ({id,currentUser,match,listItems,buyItems,history,signInWithGoggleStart,removeItem,addItem,doc,selectPersonStart,item})=>{
    const [isOpen, setstate] = useState(false)
    const [comments,setComments] = useState([]) 
    
    const location = useLocation();
    
    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView()    

    const {title,rate,price,type,imgUrl,videoImg,videoUrl,description,duration,year,warning,performer,producer,writer,director} = item
    
    useEffect(() => {
        const usersRef = firestore.collection('commentors').doc('movie')
        usersRef.onSnapshot(
            (snapShot)=>{
                const {comments} = snapShot.data()
                comments.sort(function(a, b) {
                    const DateStringA = a.date.split(',')
                    const DateStringB = b.date.split(',')
                    const DateA = `${DateStringA[2]} ${DateStringA[1]} ${DateStringA[3]} ${DateStringA[4]} ${DateStringA[5]}`
                    const DateB = `${DateStringB[2]} ${DateStringB[1]} ${DateStringB[3]} ${DateStringB[4]} ${DateStringB[5]}`
                    return Date.parse(DateB) - Date.parse(DateA)
                });
                setComments(comments)
            }
        )
    },[item])
    
    const added = useMemo(()=>{
        return listItems.find(listItem=>listItem['item'].id === id && listItem['doc'] === doc)
    },[item,listItems])


    const buyed = useMemo(()=>{
        return buyItems.find(item=>item['item'].id === id && item['doc'] === doc)
    },[buyItems,item])


    const videoId = useMemo(()=>{
        const idArray = videoUrl.split('/') 
        return idArray[idArray.length - 1];
    },[videoUrl])



    const option = 'movie'

    const readMore = useMemo(()=>{
        return Math.floor(description.length / 3.3)
    },[description])

    const selectedComments = useMemo(
        () => (
            comments 
        ? 
        comments.filter(comment=>comment.option === option && comment.itemID === id  )
        :
            []
        ),
    [comments])
    

    const typesArray = type.split(',')
    const performerList = performer.split(',')
    const producerList = producer.split(',')
    const writerList = writer.split(',')
    const directorList = director.split(',')  
    
    const TEXT_COLLAPSE_OPTIONS = {
        collapse: false,
        collapseText: 'READ MORE',
        expandText: 'READ LESS',
        minHeight: 80,
        maxHeight: readMore,
        textStyle: {
            fontSize:14,
            paddingLeft:'40%',
            color:'#898989',
            cursor:'pointer',
            fontWeight:'500',
            opacity:'0.8',
        }
      }


    return (
        <Container>
        <Wrap>
            <Wrap className="detail-img">
                <img src={imgUrl}/>
            </Wrap>

            <Wrap  className="detail-info">
                <Span className='title'>{title}</Span>
                <Span className='date-time'>
                    <span>
                        {year}
                    </span>
                    <span>
                        {duration} minutes
                    </span>
                </Span>
                <Span className='type'>
                    {
                        typesArray.map((type)=>(
                            <Link to={`/movies/category/${type.trim()}`}>
                                {type}
                            </Link> 
                        ))
                    }

                </Span>
                <Span className="warning">
                    <WarningIcon/>
                        {warning}
                </Span>
                <ButtonContainer>{
                buyed
                ?
                    ''
                :
                !added 
                  ?
                    <AddCartButton onClick={()=> currentUser ? addItem({item,doc}) : signInWithGoggleStart()}>
                        <AddCartIcon/>
                          Add to wish list
                    </AddCartButton>
                  :
                    <AddCartButton className='hover-cart' onClick={()=> removeItem({item,doc})  }>
                            <RemoveCartIcon className='button'/>
                            <MdDelete className='button-hover' style={{position:'absolute',color:'white',fontSize:'22px'}}/>
                            <span className= 'span'>Already added</span>
                            <span style={{paddingLeft:'25px',color:'white',position:'absolute'}}className='span-hover'>Remove Item</span>
                    </AddCartButton>
                }
                {
                    buyed
                    ?
                    <PurchasedIcon>
                        Purchased: {price},000 VND<TiTick/>
                    </PurchasedIcon>
                    :
                    <StripeCheckoutButton item={item} doc={doc} price={price} content={`Buy: ${price},000 VND`}/>
                }

                </ButtonContainer>

            </Wrap>
        </Wrap>

        <Wrap className='seperate-line'>
            <hr/>
        </Wrap>


        <Wrap className="detail-video">
            <Wrap className='detail-video-img'>
              <img src={videoImg}
                    alt=""
                 onClick={()=>setstate(true)}
              />
               <span className='trailer'>TRAILER</span>
            </Wrap>
            <ModalVideo
                isOpen={isOpen}
                onClose={()=>setstate(false)}
                channel='youtube'
                autoplay = 'autoplay'
                videoId={videoId}
            >
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>
            </ModalVideo>
        </Wrap>


        <Wrap className='detail-description'>
        {
            readMore > 100 
            ?
                <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
                    <span>
                    {description}          
                    </span>
                </ReactTextCollapse>
            :
                <span>
                    {description}          
                </span>
        }
        </Wrap>
        
        <Wrap className='seperate-line'>
            <hr/>
        </Wrap>
        
        <Wrap className='detail-production'> 
            <h2>ACTOR  AND MOVIE TITLE</h2>  
            <Wrap className="perfomer-producer">
                <Wrap  className='performer'>
                    <h2>Perfomer</h2>
                    <Wrap className="performer-list">
                        {
                        performerList.map((actor,index)=>{
                            const job = 'actors'
                            const name = actor.trim()
                            if(index == (performerList.length-1)){
                               return <Link to={`/movies/participant/${actor}`} onClick={()=>{selectPersonStart({name,job})}}>{actor}</Link>
                            }else{
                               return <Link to={`/movies/participant/${actor}`} onClick={()=>{selectPersonStart({name,job})}}>{actor}<span style={{paddingRight:'5px'}}>,</span></Link>
                            }
                        })}
                    </Wrap>
                </Wrap>
                
                <Wrap className = 'producer'>
                    <h2>Producer</h2>
                    <Wrap className="producer-list">
                        {
                            producerList.map((producer,index)=>{
                                if(index == (producerList.length-1) ){
                                   return <span>{producer}</span>
                                }else{
                                   return <span>{producer}<span style={{paddingRight:'5px'}}>,</span></span>
                                }
                            })
                        }
                    </Wrap>
                </Wrap>
            </Wrap>


            <Wrap className="director-writer">
                <Wrap  className='director'>
                    <h2>Director</h2>
                    <Wrap className="director-list">
                        {directorList.map((director,index)=>{
                            if(index == (directorList.length-1)){
                            return <span>{director}</span>
                            }else{
                            return <span>{director}<span style={{paddingRight:'5px'}}>,</span></span>
                            }
                        })}
                    </Wrap>
                </Wrap>
                <Wrap className = 'writer'>
                    <h2>Writer</h2>
                    <Wrap className="writer-list">
                        {writerList.map((writer,index)=>{
                            if(index == (writerList.length-1)){
                            return <span>{writer}</span>
                            }else{
                            return <span>{writer}<span style={{paddingRight:'5px'}}>,</span></span>
                            }
                        })}
                    </Wrap>
                </Wrap>
            </Wrap>
        </Wrap>

        <Wrap className='seperate-line'>
            <hr/>
        </Wrap>


        <Wrap className='evaluate-section'> 
            <h2>EVALUATE </h2>  
            <Wrap className="evaluate-button" >
                <PopupComment  id={id} currentUser={currentUser} option={option} imgUrl={imgUrl}  />
            </Wrap>
            <Wrap className="rate-bar">
               <RateBars selectedComments={selectedComments}></RateBars>
            </Wrap>
        </Wrap>
        
        <Wrap className="comment-section">
            {
                selectedComments.length>0
                ?selectedComments.map(
                    userComment=>{
                        const id = userComment.randomID
                        return <User key = {id} userComment={userComment}/>
                    }
                )
                :[]
            }
        </Wrap>

        <Wrap className='seperate-line'>
            <hr/>
        </Wrap>
        </Container>    
    )
}




const mapStateToProps = (state,ownProps)=>({
    item:selectItemDetail('movies',ownProps.chosenType,ownProps.id)(state),
    buyItems:selectBuyItems(state)
})
const mapDispatchToProps = dispatch =>({
    addItem:(item)=>dispatch(addItem(item)),
    removeItem:(item)=>dispatch(removeItem(item)),
    signInWithGoggleStart:()=>dispatch(signInWithGoggleStart()),
    selectPersonStart:(person)=>dispatch(selectPersonStart(person)),
})

export default memo(withRouter(connect(mapStateToProps,mapDispatchToProps)(DetailMovie)));
