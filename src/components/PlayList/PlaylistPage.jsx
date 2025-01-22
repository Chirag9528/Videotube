import React from 'react'
import { useLocation } from 'react-router-dom'
import VideoCard from './VideoCard'

function PlaylistPage() {
    const location = useLocation()
    const {playlist} = location.state || {}
  return (
    <div style={{color : "white" , width : "83vw" , display : "flex" , height : "90vh"}}>
      <div className="card" style={{width: "27vw" , height : "89vh" , textAlign:"left" , backgroundColor:"rgb(0,0,0)" , color : "white"}}>
        <img src={'http://res.cloudinary.com/harharmahadev/image/upload/v1736842158/yc6ppc1nwxb8tpsz4ebu.jpg'} style={{borderRadius : "10px"}}/>
        <b>
            <div className="card-title px-2 my-2" style={{fontSize : "2rem"}}>{playlist?.name || ""}</div>
        </b>
        <div className="card-body px-2 py-1" style={{}}>
            {playlist?.description || ""}
        </div>
      </div>
      <div className="card container column flex-column flex-nowrap  " style={{width : "57vw" , backgroundColor : "rgb(0,0,0)" , overflow : "auto"}}>
        {
            playlist?.videos.map((videoId)=>{
                return <VideoCard key={videoId} videoId = {videoId}/>
            })
        }
        {
            playlist?.videos.length === 0 && <h3 style={{color : "white"}}>Currently No Videos Added</h3>
        }
      </div>
    </div>
  )
}

export default PlaylistPage
