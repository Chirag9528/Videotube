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
        <div className="comments-section">
            <h2 className="comments-heading">Comments <span className="comments-count">{comments.length}</span></h2>
            <div className="vt-surface comment-compose">
                <input
                  className="comment-input"
                  type="text"
                  name="content"
                  id="comment"
                  value={content}
                  onChange={OnChange}
                  placeholder="Add a comment..."
                />
                {content.length > 0 && (
                  <div className="comment-compose-actions">
                    <button className="btn btn-sm vt-btn-ghost" onClick={cancelcomment}>Cancel</button>
                    <button className="btn btn-sm vt-btn-subscribe" onClick={addcomment}>Comment</button>
                  </div>
                )}
            </div>
            <div className="comments-list">
                {comments.map((comment)=>{
                    return <CommentCard key={comment._id} comment={comment}/>
                })}
            </div>
        </div>
  )
}

export default Comments
