import React , {useEffect, useState} from 'react'
import CommentCard from './CommentCard';

function Comments(props) {
    const [content , setContent] = useState("");
    const [comments , setComments] = useState([])
    const OnChange = (e)=>{
        setContent(e.target.value)
    }

    const cancelcomment = ()=>{
        setContent("")
    }

    const videocomments = async ()=>{
        const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/comments/${props.videoId}?page=1&limit=10`,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
            }
        })
        .then(response => response.json())
        .catch((error)=>console.log(error))
        setComments(response.data)
        console.log(response)
    };
    
    
    const addcomment = async ()=>{
        const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/comments/${props.videoId}` , {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',
                // 'Authorization' : localStorage.getItem('token')
            },
            credentials : "include",
            body: JSON.stringify({message : content})
        })
        .then(response => response.json())
        .catch((error)=>console.log(error))
        console.log(response)
        setContent("")
        videocomments();
    }
    
    
    useEffect(()=>{
        videocomments();
    },[])
    return (
        <div className='card ms-4 p-0 my-4' style={{color:"white" , background: "rgb(0,0,0)"}}>
            <h2>Comments</h2>
            <div className='card' style={{color:"white" , background: "rgb(0,0,0)"}}>
                <input className='my-0 ' type="text" name="content" id="comment" value={content} onChange={OnChange} placeholder='Add a comment' style={{color:"white" , background: "rgb(0,0,0)" , outline : "none" , border:"none"}}/>
                <hr></hr>
                <div className='' style={{display:"flex" , justifyContent:"right"}}>
                    <button className='btn btn-light mx-3' onClick={addcomment}>Add</button>
                    <button className='btn btn-light' onClick={cancelcomment}>Cancel</button>
                </div>
            </div>
            <div>
                {comments.map((comment)=>{
                    return <CommentCard key = {comment._id} comment = {comment}/>
                })}
            </div>
        </div>
  )
}

export default Comments
