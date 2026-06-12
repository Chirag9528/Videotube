import React, { useContext, useEffect, useRef, useState } from 'react'
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import Comments from './Comments';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import LoadingBarContext from '../../contexts/LoadingBar/LoadingBar';


function VideoBig() {
    const location = useLocation()
    const {obj} = location.state || {}

    const [isSubscribed , setIsSubscribed] = useState(false)
    const [liked , setLiked] = useState(false)

    const {setProgress} = useContext(LoadingBarContext)

    const videoRef = useRef(null)
    useEffect(()=>{
        videoRef.current.play()
    },[])

    const togglesubscription = async ()=>{
      try {
        const response = await fetch( `${import.meta.env.VITE_HOSTNAME}/api/v1/subscriptions/c/${obj.owner}` , {
          method : "POST",
          headers : {
            'Content-Type' : 'application/json',
            // 'Authorization' : localStorage.getItem('token')
          },
          credentials : "include"
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
        const response = await fetch( `${import.meta.env.VITE_HOSTNAME}/api/v1/likes/toggle/v/${obj._id}` , {
          method : "POST",
          headers : {
            'Content-Type' : 'application/json',
            // 'Authorization' : localStorage.getItem('token')
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

    const hasRun1 = useRef(false)

    useEffect(()=>{
      if (!hasRun1.current){
        hasRun1.current = true;
        const updateview = async ()=>{
          const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/videos/update-views/${obj._id}`,{
            method : 'GET',
            credentials : "include"
          })
          .then(response => response.json())
          .catch(error => console.log(error));
          
        }
        updateview();
      }
    },[])

    const hasRun2 = useRef(false)
    useEffect(()=>{
      if (!hasRun2.current){
        hasRun2.current = true;
        const updatewatchHistory = async ()=>{
          const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/users/update-watchHistory/${obj._id}`,
            {
              method: 'GET',
              credentials : "include"
            })
            .then(response => response.json())
            .catch(error=>console.log(error));
        }
        updatewatchHistory();
      }
    },[])

    useEffect(()=>{
      const checksubscription = async () => {
        
        setProgress(20)
        const response = await fetch( `${import.meta.env.VITE_HOSTNAME}/api/v1/subscriptions/check/${obj.owner}` , {
          method : "GET",
          headers : {
            'Content-Type' : 'application/json',
            // 'Authorization' : localStorage.getItem('token')
          },
          credentials : "include"
        })
        .then(response => response.json())
        .catch(error => console.log(error))
        setProgress(80)
        
        if (response && response.success){
          if (response.data === true){
            setIsSubscribed(true)
          }else{
            setIsSubscribed(false)
          }
        }
        setProgress(100)
      };
      checksubscription()
    },[])

    useEffect(()=>{
      const checkLiked = async () => {
        try {
            console.log("obj::::" , obj._id)
            const response = await fetch( `${import.meta.env.VITE_HOSTNAME}/api/v1/likes/checklike/v/${obj._id}` , {
              method : "GET",
              headers : {
                'Content-Type' : 'application/json',
                // 'Authorization' : localStorage.getItem('token')
              },
              credentials : "include"
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
          console.log("Erreeeeor: ",error)
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
        const response = await fetch('${import.meta.env.VITE_HOSTNAME}/api/v1/playlist/user/playlists',{
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json',
            // 'Authorization' : localStorage.getItem('token')
          },
          credentials : "include"
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
      const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/playlist/add/${videoId}/${playlistId}`,{
        method : 'PATCH',
        headers : {
          'Content-Type' : 'application/json',
          // 'Authorization' : localStorage.getItem('token')
        },
        credentials : "include"
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
      const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/playlist/remove/${videoId}/${playlistId}`,{
        method : 'PATCH',
        headers : {
          'Content-Type' : 'application/json',
          // 'Authorization' : localStorage.getItem('token')
        },
        credentials : "include"
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


    const showdashboard = ()=>{
      localStorage.setItem('name' , obj.ownername) // Need to fix as while going back to dashboard after playing some video there , i am getting name as undefined
      navigate("/dashboard" , {state : {name : obj.ownername}})
    }

    return (
    <>
    <div className="video-watch-container">
      <div className="video-frame">
        <video
            ref={videoRef}
            controls
        >
          <source src={obj.videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="vt-surface video-info-panel">
        <h1 className="video-title">{obj.title}</h1>

        <div className="video-toolbar">
          <div className="channel-block">
            <img
              src={obj.avatar}
              className="channel-avatar-lg"
              alt="Channel avatar"
              onClick={showdashboard}
            />
            <div className="channel-details">
              <span className="channel-name" onClick={showdashboard}>{obj.ownername}</span>
              <button
                className={`btn btn-sm ${isSubscribed ? 'vt-btn-subscribed' : 'vt-btn-subscribe'}`}
                onClick={togglesubscription}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>
          </div>

          <div className="engagement-block">
            <button
              className={`engagement-btn ${liked ? 'active' : ''}`}
              onClick={togglelike}
              aria-label="Like video"
            >
              {liked ? <BiSolidLike /> : <BiLike />}
              <span>Like</span>
            </button>
            <button
              className="engagement-btn"
              id="dropdownMenuButton"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label="More options"
            >
              <BsThreeDotsVertical />
            </button>
            <ul className="dropdown-menu dropdown-menu-end vt-dropdown" aria-labelledby="dropdownMenuButton">
              <li><button className="dropdown-item" onClick={()=>{ref.current.click()}}>Add to Playlist</button></li>
            </ul>
          </div>
        </div>
      </div>

      <Comments videoId={obj._id}/>
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
    </>
  )
}

export default VideoBig
