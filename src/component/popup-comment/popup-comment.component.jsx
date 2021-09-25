import React,{useCallback,useState} from 'react'
import { connect } from 'react-redux'
import {FaPen} from 'react-icons/fa'
import Popup from 'reactjs-popup';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import {WriteButton, CommentZone,TextArea,SendButton}from './popup-comment.styles'
import { pushUserCommentStart } from '../../redux/store/store.action';
import {signInWithGoggleStart, toggleUser} from '../../redux/user/user.action'

export const PopupComment = ({imgUrl,id,pushUserCommentStart,signInWithGoggleStart,toggleUser,currentUser,option}) => {
    const [value, setValue] = React.useState(3)
    const [hover, setHover] = React.useState(-1)
    const [count,setCount] = useState(0)
    const [comment,setComment] = useState('')
    const labels = {
        1: 'Poor',
        2: 'Meh',
        3: 'Good',
        4: 'Excellent',
        5: 'Perfect',
    };


    const countWord = useCallback(
        (event)=>{
            var counts = 0
            const string = event.target.value
            const words = string.split(' ')
            words.map(word=>{
                if(word.length>0){
                    counts = counts + 1
                }
            })
            setCount(counts)
            setComment(string)
    },[])

    const contentStyle = {
        boxSizing: 'border-box',
        padding:0,
        border:'none',
        width: '705px',
        transition: 'all 0.3s ease-out'
    }

    const overlayStyle = { 
        transition: 'all 0.3s ease-out',
        borderRadius:'5px !important'
        
    };
     const handleSubmit = async (event)=>{
        if(!currentUser){
            alert('Sign in first')
            signInWithGoggleStart()
        }else{
            if(comment.length > 0){
                const itemID = id
                setCount(0)
                setComment('')
                const randomID =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                pushUserCommentStart({currentUser,value,itemID,option,randomID,comment})
            }else{
                alert('Do not send empty you fucking dickhead')
            }
        }
    }

    return (
        <Popup trigger={<WriteButton><FaPen/>Write a review</WriteButton>} 
        modal lockScroll={true} position="top center"  closeOnDocumentClick
        overlayStyle={overlayStyle} contentStyle={contentStyle}>
        {
            close=>(
                <CommentZone>
                <div className={`popup-header ${option}`}>
                    Review by Nate River
                </div>
                <div className="popup-note">These are public and editable reviews. Your Google Account name and photo can be seen by everyone. Developers can view information on the country and your device (such as language, model, and OS version). They may also use this information to respond to you.</div>
                <div className='popup-content'>
                    <div className="popup-image">
                        <img src={imgUrl}/>
                    </div>
                    <div className="writing-field">
                        <TextArea required onChange={countWord} placeholder={`Let others know what you think of this ${option}!`}></TextArea>
                        <div className="limit-count">
                            <span>Most helpful reviews are 100 words or more</span>
                            <span>{count} words</span>
                        </div>
                        <div className="stars">
                            <Rating
                            name="hover-feedback"
                            value={value}
                            size="large"
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                        />
                        {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                        </div>
                    </div>
                </div>
                <div className="send-button">    
                    <SendButton type="submit" onClick={()=>{ handleSubmit() ; close() }}>To send</SendButton>
                </div>
            </CommentZone>
            )
        }
        </Popup>
    )
}


// const mapStateToProps = (state) => ({
    
// })

const mapDispatchToProps =dispatch =>({
    toggleUser:()=>dispatch(toggleUser()),
    signInWithGoggleStart:()=>dispatch(signInWithGoggleStart()),
    pushUserCommentStart:(data)=>dispatch(pushUserCommentStart(data)),
})

export default connect(null,mapDispatchToProps)(PopupComment)
