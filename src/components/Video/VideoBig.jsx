import React, { useContext, useEffect, useRef, useState } from 'react'
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import MenuContext from '../contexts/MenuButton/MenuContext';
import Comments from './Comments';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";


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

    const ref = useRef(null)
    const refClose = useRef(null)
    const [allplaylists , setAllPlayLists] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
      const fetchallplaylists = async ()=>{
        const response = await fetch('http://localhost:8000/api/v1/playlist/user/playlists',{
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('token')
          }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
        if (response && response.success){
          console.log(response.data)
          setAllPlayLists(response.data)
        }
      }
      fetchallplaylists()
    },[])

    const addtoplaylist = async (videoId , playlistId)=>{
      const response = await fetch(`http://localhost:8000/api/v1/playlist/add/${videoId}/${playlistId}`,{
        method : 'PATCH',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : localStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .catch(error => console.log(error))

      if (response && response.success){
        alert("Video Added to PlayList")
        navigate(0)
      }
      else{
        alert("Try Again")
      }
    }

    const deletefromplaylist = async(videoId , playlistId)=>{
      const response = await fetch(`http://localhost:8000/api/v1/playlist/remove/${videoId}/${playlistId}`,{
        method : 'PATCH',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : localStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .catch(error => console.log(error))

      if (response && response.success){
        alert("Video Removed from PlayList")
        navigate(0)
      }
      else{
        alert("Try Again")
      }
    }
    

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
            <div className="col-md-8" style={{display:"flex" , alignItems:"center"}}>
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
            <div className='col-md-1' style={{display : "flex" , alignItems : "center" , justifyContent : "center"}}>
                <button className='p-0 m-0' id="dropdownMenuButton" type='button' data-bs-toggle="dropdown"  aria-expanded="false" style={{background:"rgb(0,0,0)" , color:"white" , border : "none" , fontSize  :"1.3rem"}}>
                    <BsThreeDotsVertical />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{}}>
                    <li><button className='dropdown-item' style={{}} onClick={()=>{ref.current.click()}}>Add to Playlist</button></li>
                </ul>
            </div>
        </div>
        </div>
    </div>

    {/* Playlists Modal */}
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#playlistsModal">
    Launch demo modal
    </button>
    <div className="modal fade" id="playlistsModal" tabIndex="-1" aria-labelledby="playlistsModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="loginModalLabel">Playlists</h1>
            <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <form>
              {
                allplaylists.map((playlist)=>{
                  return (
                  <div className="row my-2 mx-3" key={playlist._id} style={{border : "2px solid black" , borderRadius : "10px"}}>
                    <div className="col-sm-4" style={{display : "flex" , alignItems : "center" , justifyContent : "center"}}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={playlist._id}
                        style={{fontSize : "1.5rem"}}
                        checked={playlist.videos.includes(obj._id)}
                        onChange={() => {playlist.videos.includes(obj._id) ? deletefromplaylist(obj._id , playlist._id) :addtoplaylist(obj._id , playlist._id)}} 
                      />
                    </div>
                    <label htmlFor={playlist._id} className="col-sm-7 col-form-label" style={{textAlign : "left"}}>{playlist.name.length > 30 ? playlist.name.slice(0,30)+" ..." : playlist.name}</label>
                  </div>
                  )

                })
              }
            </form>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={()=>{refClose.current.click()}}>Close</button>
        </div>
        </div>
    </div>
    </div>
    {/* PlayLists Modal Ends here */}


    <Comments videoId = {obj._id}/>
    </>
  )
}

export default VideoBig
