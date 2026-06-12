import React, { useContext, useEffect, useState } from 'react'
import {Video} from "../components/index.jsx"
import {LoadingBarContext} from '../contexts/index.jsx'

function Home() {

  const [allvideos , setAllVideos] = useState([])
  const {setProgress} = useContext(LoadingBarContext)

  useEffect(()=>{
    const fetchData = async()=>{
      setProgress(20)
      const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/videos/all/?page=1&limit=20&sortBy=title&sortType=asc&query=`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
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
    <div className="page-container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 video-grid">
          {
            allvideos.map((video)=>{
              return (
                <div key={video._id} className="col">
                  <div className="card video-card-item h-100">
                    <Video obj={video}/>
                  </div>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default Home
