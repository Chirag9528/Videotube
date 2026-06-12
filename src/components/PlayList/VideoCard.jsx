import React, { useContext, useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import LoadingBarContext from '../../contexts/LoadingBar/LoadingBar';

function VideoCard(props){
    const navigate = useNavigate()
    const [videodetails , setVideoDetails] = useState({})

    const {setProgress} = useContext(LoadingBarContext)
    useEffect(()=>{
        const fetchvideo = async ()=>{
            setProgress(30)
            const response = await fetch( `${import.meta.env.VITE_HOSTNAME}/api/v1/videos/${props.videoId}` , {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            .then(response => response.json())
            .catch(error => console.log(error))
            setProgress(70)

            if (response && response.success){
                setVideoDetails(response.data)
            }
            setProgress(100)
        };
        fetchvideo()
    },[])

    
  return (
    <div className='card horizontal-video-card d-flex flex-row align-items-start p-2 my-1 hoverbackgroundcustom'>
        <img
          className='horizontal-thumb'
          src={videodetails.thumbnail}
          alt={videodetails.title}
          onClick={()=>{navigate("/playvideo" , {state : {obj : videodetails}})}}
        />
        <div className='horizontal-info' onClick={()=>{navigate("/playvideo" , {state : {obj : videodetails}})}}>
             <div className="card-title m-0 py-1 px-1" style={{fontSize: "1.1rem"}}><b>{videodetails.title}</b></div>
             <div className="px-1" style={{color:"rgb(169,169,169)"}}>{videodetails.ownername} &nbsp; <span style={{ fontWeight: "bold", fontSize: "1.2rem", lineHeight: "1" }}>·</span>&nbsp;&nbsp;{videodetails.views} views</div>
        </div>
        <div className='flex-shrink-0'>
            <button className='p-0 m-0' type='button' data-bs-toggle="dropdown" aria-expanded="false" style={{background:"rgb(0,0,0)" , color:"white" , border : "none"}}>
                <BsThreeDotsVertical />
            </button>
            <ul className="dropdown-menu" style={{color : "white" , backgroundColor:"rgb(0,0,0)"}}>
                <li><button className='dropdown-item' style={{color : "white"}} onClick={()=>{props.setDeleteVideoId(videodetails._id);props.setIsDeletable(true)}}>Remove from Playlist</button></li>
                <li><button className='dropdown-item' style={{color : "white"}} onClick={()=>{props.setAddVideoId(videodetails._id);props.setIsAddable(true)}}>Add to Playlist</button></li>
            </ul>
        </div>
    </div>
    
  )
}

export default VideoCard
