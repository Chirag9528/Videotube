import React, { useContext, useEffect, useRef, useState } from 'react'
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import MenuContext from '../contexts/MenuButton/MenuContext';
import Comments from './Comments';
import { useLocation } from 'react-router-dom';

function VideoBig() {
    const location = useLocation()
    const {obj} = location.state || {}

    const [isSubscribed , setIsSubscribed] = useState(false)
    const [liked , setLiked] = useState(false)

    const videoRef = useRef(null)
    useEffect(()=>{
        videoRef.current.play()
    })

    const {isOpen} = useContext(MenuContext)

    const togglesubscription = async ()=>{
      try {
        const response = await fetch( `http://localhost:8000/api/v1/subscriptions/c/${obj.owner}` , {
          method : "POST",
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('token')
          }
        })
        .then(response => response.json())
        
        if (response && response.success){
          setIsSubscribed(!isSubscribed)
        }
      } catch (error) {
        console.log("Error: ",error)
      }
    }

    const togglelike = async ()=>{
      try {
        const response = await fetch( `http://localhost:8000/api/v1/likes/toggle/v/${obj._id}` , {
          method : "POST",
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('token')
          }
        })
        .then(response => response.json())
        
        if (response && response.success){
          setLiked(!liked)
        }
      } catch (error) {
        console.log("Error: ",error)
      }
    }

    useEffect(()=>{
      const checksubscription = async () => {
        try {
            const response = await fetch( `http://localhost:8000/api/v1/subscriptions/check/${obj.owner}` , {
              method : "GET",
              headers : {
                'Content-Type' : 'application/json',
                'Authorization' : localStorage.getItem('token')
              }
            })
            .then(response => response.json())
            
            if (response && response.success){
              if (response.data === true){
                setIsSubscribed(true)
              }else{
                setIsSubscribed(false)
              }

            }
        } catch (error) {
          console.log("Error: ",error)
        }
      };
      checksubscription()
    },[])

    useEffect(()=>{
      const checkLiked = async () => {
        try {
            const response = await fetch( `http://localhost:8000/api/v1/likes/checklike/v/${obj._id}` , {
              method : "GET",
              headers : {
                'Content-Type' : 'application/json',
                'Authorization' : localStorage.getItem('token')
              }
            })
            .then(response => response.json())
            
            if (response && response.success){
              if (response.data === true){
                setLiked(true)
              }else{
                setLiked(false)
              }
            }
            console.log(response)
        } catch (error) {
          console.log("Error: ",error)
        }
      };
      checkLiked()
    },[])

    

    return (
    <>
    <div className="card ms-4 p-0" style={{color:"white" , background: "rgb(0,0,0)" , height:`${isOpen ? '95vh' : '105vh'}` , width:`${isOpen ? '80vw' : '90vw'}`}}>
        <video
            ref={videoRef}
            style={{borderRadius : "15px" }}
            controls
        >
          <source src={obj.videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="card-body p-0 my-2" style={{display:"flex" , flexDirection:"column"}}>
          <h4 className="card-text m-2 px-2 text-start">{obj.title}</h4>
          <div className="row g-0 my-2" style={{}}>
            <div className="col-md-1 px-4" style={{"display" : "flex" , justifyContent : "left"}}>
              <img src={obj.avatar} className="img-fluid rounded-circle" style={{height : "50px" , width: "50px" , objectFit : "cover" , borderRadius : "50%"}} width="60px" alt="..."/>
            </div>
            <div className="col-md-9" style={{display:"flex" , alignItems:"center"}}>
              <div className="" style={{ display : "flex"}}>
                <p className="card-text text-start" style={{color: "rgb(169 , 169 , 169)" , paddingLeft:"10px" , paddingRight:"40px"}}>{obj.ownername}</p>
              </div>
              <div className="" style={{}}>
                <button className={`btn ${isSubscribed? 'btn-dark' : 'btn-light'}`} onClick={togglesubscription}>{isSubscribed? "Subscribed" : "Subscribe"}</button>
              </div>
            </div>
            <div className="col-md-2" style={{display:"flex" , alignItems:"center" , justifyContent:"center"}}>
              {
                liked && <BiSolidLike style={{color:"white" ,fontSize:"2.5rem"}} onClick={togglelike}/>
              }
              {
                !liked && 
                <BiLike style={{color:"white" , fontSize:"2.5rem"}} onClick={togglelike}/>
              }
            </div>
        </div>
        </div>
    </div>
    <Comments videoId = {obj._id}/>
    </>
  )
}

export default VideoBig
