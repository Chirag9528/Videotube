import React, { useEffect, useState } from 'react'
import Video from '../components/Video/Video'
import { VideoBig } from '../components'

function Home() {

  const [allvideos , setAllVideos] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const response = await fetch('http://localhost:8000/api/v1/videos/all/?page=1&limit=10&query=&sortBy=title&sortType=asc', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setAllVideos(data.data)
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchData()
  } , [])

  const videohandle = (details)=>{
      setIsPlaying(true)
      setObjDetails(details)
  }
  const [isplaying , setIsPlaying] = useState(false)
  const [objdetails , setObjDetails] = useState({})
  return (
    <div className='m-4' style={{}}>
      {
        !isplaying && 
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{display : "flex"}}>
          {
            allvideos.map((video)=>{
              return <Video key = {video._id} obj = {video} videohandle = {()=>{videohandle(video)}}/>;
            })
          }
        </div>
      }
      {
        isplaying && 
        <VideoBig obj = {objdetails}/>
      }
    </div>
  )
}

export default Home
