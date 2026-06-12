import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";

function ResultVideoCard(props){
    const navigate = useNavigate()
    const videodetails = props.videodetails
  return (
    <div className='card horizontal-video-card d-flex flex-row align-items-start p-2 my-2 mx-1'>
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
            <button className='p-0 m-0' type='button' data-bs-toggle="dropdown" aria-expanded="false" style={{background:"rgb(0,0,0)" , color:"white" , border : "none" , fontSize : "1.2rem"}}>
                <BsThreeDotsVertical />
            </button>
            <ul className="dropdown-menu" style={{color : "white" , backgroundColor:"rgb(0,0,0)"}}>
                <li><button className='dropdown-item' style={{color : "white"}}>Remove from Playlist</button></li>
                <li><button className='dropdown-item' style={{color : "white"}}>Add to Playlist</button></li>
            </ul>
        </div>
    </div>
  )
}

export default ResultVideoCard
