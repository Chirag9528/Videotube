import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LoadingBarContext from '../contexts/LoadingBar/LoadingBar'
import Video from '../Video/Video'
import Dashvideocard from './Dashvideocard'

function DashboardVideoPage(){
  const location = useLocation()
  const {userId} = location.state || ""

  const [allvideos , setAllVideos] = useState([])
  const {setProgress} = useContext(LoadingBarContext)

  useEffect(()=>{
    const fetchData = async()=>{
      setProgress(20)
      const response = await fetch(`http://localhost:8000/api/v1/videos/?page=1&limit=10&sortBy=title&sortType=asc&query=&userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials : "include"
      })
      .then(response => response.json())
      .catch(error => console.log(error))
      setProgress(60)

      if (response && response.success){
        setAllVideos(response.data)
      }
      setProgress(100)
    };
    fetchData()
  } , [])


  return (
    <div className='mt-4'>
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{display : "flex"}}>
          {
            allvideos.map((video)=>{
              return (<div key={video._id} className="card ms-4 p-0 mb-4" style={{height:"250px" , width : "250px" , backgroundColor: "rgb(0,0,0)"}}> 
                <Dashvideocard obj = {video} imgdim = {{height : "180px" , width : "247px"}}/>;
              </div>)
            })
          }
        </div>
    </div> 
  )
}

export default DashboardVideoPage
