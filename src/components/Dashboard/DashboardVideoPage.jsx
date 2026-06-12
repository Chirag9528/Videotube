import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {LoadingBarContext} from '../../contexts/index.jsx'
import Dashvideocard from './Dashvideocard'

function DashboardVideoPage(){
  const location = useLocation()
  const {userId} = location.state || ""

  const [allvideos , setAllVideos] = useState([])
  const {setProgress} = useContext(LoadingBarContext)

  useEffect(()=>{
    const fetchData = async()=>{
      setProgress(20)
      const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/videos/?page=1&limit=10&sortBy=title&sortType=asc&query=&userId=${userId}`, {
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
    <div className='mt-3'>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3 video-grid">
          {
            allvideos.map((video)=>{
              return (
                <div key={video._id} className="col">
                  <div className="card video-card-item h-100">
                    <Dashvideocard obj={video}/>
                  </div>
                </div>
              )
            })
          }
        </div>
    </div> 
  )
}

export default DashboardVideoPage
