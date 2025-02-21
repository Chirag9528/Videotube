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
        <div className='card p-4 my-2' style={{color : "white" , background: "rgb(84, 82, 82)" , borderRadius:"20px"}}>
            <div className="card-title px-3 my-0" style={{color:"rgb(212, 203, 203)" , display:"flex"}} >
                <div style={{flex:"10" , textAlign:"left"}}>
                 @{props.comment.commentby.username}
                </div>
                 <button id="dropdownMenuButton" type='button' data-bs-toggle="dropdown"  aria-expanded="false" style={{background:"rgb(84,82,82)" , border : "none"}}>
                    <BsThreeDotsVertical />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><button className='dropdown-item' onClick={editcomment}>Edit</button></li>
                    <li><button className='dropdown-item' onClick={deletecomment}>Delete</button></li>
                </ul>
            </div>
            <div className="card-body" style={{display:"flex"}}>
                <textarea
                    ref={ref}
                    className={`${iseditable ? '' : 'border-0'}`}
                    style={{background:'rgb(84,82,82)', color:"white" , outline: "none" , width:"100%"}} 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    readOnly={!iseditable}
                    />
            </div>
            <div className='card-footer border-0' style={{background:'rgb(84,82,82)' , display: "flex" , fontSize:"1.5rem"}}>
                <div style={{flex:"10" , display:"flex" , alignItems : "center"}}>
                    {
                        liked &&
                        <BiSolidLike onClick={togglelike}/>
                    }
                    {
                        !liked && 
                        <BiLike onClick={togglelike}/>
                    }
                </div>
                <div>
                    { 
                        iseditable && 
                        <div className="btn btn-primary mx-3" onClick={cancelupdate}>Cancel</div>

                    }
                    {
                        iseditable &&
                        <div className="btn btn-primary" onClick={updatecomment}>Update</div>

                    }
                </div>
            </div>
        </div>
  )
}

export default CommentCard
