import React, { useEffect, useState ,useRef} from 'react'
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";


function CommentCard(props) {
    const [message , setMessage] = useState(props.comment.content)
    const [liked , setLiked] = useState(false)
    const [iseditable , setIsEditable] = useState(false)
    const ref = useRef(null)

    useEffect(()=>{
        if (iseditable && ref.current){
            ref.current.focus()
        }
    },[iseditable])

    useEffect(()=>{
        const checklike = async ()=>{
            const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/likes/checklike/c/${props.comment._id}` , {
                method : 'GET' ,
                headers : {
                    'Content-Type' : 'application/json',
                    // 'Authorization' : localStorage.getItem('token')
                },
                credentials : "include"
            })
            .then(response => response.json())
            .catch((error) => console.log(error))
            if (response && response.success){
                if (response.data === true){
                    setLiked(true)
                }
            }
            
        };
        checklike();
    },[])

    const togglelike = async ()=>{
        try {
          const response = await fetch( `${import.meta.env.VITE_HOSTNAME}/api/v1/likes/toggle/c/${props.comment._id}` , {
            method : "POST",
            headers : {
              'Content-Type' : 'application/json',
            //   'Authorization' : localStorage.getItem('token')
            },
            credentials : "include"
          })
          .then(response => response.json())
          
          if (response && response.success){
            setLiked(!liked)
          }
        } catch (error) {
          console.log("Error: ",error)
        }
    }

    const deletecomment = async ()=>{
        const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/comments/c/${props.comment._id}` , {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json',
                // 'Authorization' : localStorage.getItem('token')
            },
            credentials : "include"
        })
        .then(response => response.json())
        .catch(error => console.log(error))
        if (response && response.success){
            alert('Comment removed successfully!!!')
        }
    }

    const updatecomment = async ()=>{
        const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/comments/c/${props.comment._id}`,{
            method: 'PATCH',
            headers : {
                'Content-Type' : 'application/json',
                // 'Authorization' : localStorage.getItem('token')
            },
            credentials : "include",
            body : JSON.stringify({newmessage : message})
        })
        .then(response => response.json())
        .catch(error => console.log(error))

        if (response && response.success){
            setIsEditable(false);
            alert('Comment updated successfully')
            console.log("response: ",response)
        }
        else{
            setMessage(props.comment.content)
            setIsEditable(false)
            alert("You cannot update this comment")
        }
    }

    const editcomment = async ()=>{
        setIsEditable(true)
    }

    const cancelupdate = ()=>{
        setIsEditable(false)
        setMessage(props.comment.content)
    }

    return (
        <div className="vt-surface comment-card">
            <div className="comment-card-header">
                <span className="comment-author">@{props.comment.commentby.username}</span>
                <button
                  className="comment-menu-btn"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                    <BsThreeDotsVertical />
                </button>
                <ul className="dropdown-menu dropdown-menu-end vt-dropdown">
                    <li><button className="dropdown-item" onClick={editcomment}>Edit</button></li>
                    <li><button className="dropdown-item" onClick={deletecomment}>Delete</button></li>
                </ul>
            </div>
            <textarea
                ref={ref}
                className={`comment-text ${iseditable ? 'editing' : ''}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                readOnly={!iseditable}
            />
            <div className="comment-card-footer">
                <button className={`engagement-btn sm ${liked ? 'active' : ''}`} onClick={togglelike}>
                    {liked ? <BiSolidLike /> : <BiLike />}
                </button>
                {iseditable && (
                  <div className="comment-edit-actions">
                    <button className="btn btn-sm vt-btn-ghost" onClick={cancelupdate}>Cancel</button>
                    <button className="btn btn-sm vt-btn-subscribe" onClick={updatecomment}>Update</button>
                  </div>
                )}
            </div>
        </div>
  )
}

export default CommentCard
