import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";

function ResultVideoCard(props){
    const navigate = useNavigate()
    const videodetails = props.videodetails
  return (
    <div className='card d-flex flex-row p-0 my-3 ms-3 me-5' style={{color : "white" , backgroundColor : "rgb(0,0,0)"}}>
        <img className='' src={videodetails.thumbnail} onClick={()=>{navigate("/playvideo" , {state : {obj : videodetails}})}} style={{height : "30vh" , width: "25vw" , borderRadius : "10px"}}/>
        <div className='' style={{ width:"50vw" , height : "30vh"}} onClick={()=>{navigate("/playvideo" , {state : {obj : videodetails}})}}>
                <div className="card-title m-0 py-1 px-3" style={{textAlign : "left" , fontSize: "1.2rem"}}><b>{videodetails.title}</b></div>
                <div className="px-3" style={{textAlign : "left", color:"rgb(169,169,169)"}}>{videodetails.ownername} &nbsp; <span style={{ fontWeight: "bold", fontSize: "1.2rem", lineHeight: "1" }}>·</span>&nbsp;&nbsp;{videodetails.views} views</div>
        </div>
        <div className='py-1' style={{height : "7vh"}}>
            <button className='p-0 m-0' id="dropdownMenuButton" type='button' data-bs-toggle="dropdown"  aria-expanded="false" style={{background:"rgb(0,0,0)" , color:"white" , border : "none" , height:"5vh" , fontSize : "1.2rem"}}>
                <BsThreeDotsVertical />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{color : "white" , backgroundColor:"rgb(0,0,0)"}}>
                <li><button className='dropdown-item' style={{color : "white"}}>Remove from Playlist</button></li>
                <li><button className='dropdown-item' style={{color : "white"}} >Add to Playlist</button></li>
            </ul>
        </div>
    </div>
  )
}

export default ResultVideoCard
