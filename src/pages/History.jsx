import React, { useContext, useEffect, useState } from 'react'
import {LoadingBarContext} from '../contexts/index.jsx'
import {Video} from "../components/index.jsx"

function History() {

  const [historyvideos , setHistoryVideos] = useState([])
  const {setProgress} = useContext(LoadingBarContext)

  useEffect(()=>{
    const fetchhistory = async ()=>{
      setProgress(20)
      const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/users/history`,{
        method : 'GET',
        credentials : "include"
      })
      .then(response => response.json())
      .catch(error=>console.log(error))
      setProgress(60)

      if (response && response.success){
        console.log(response)
        setHistoryVideos(response.data)
      }
      setProgress(100)
    }
    fetchhistory();
  },[])
  

  return (
    <div className="page-container">
        <h1 className="page-title">History</h1>
        {historyvideos.length === 0 ? (
          <div className="empty-state">Watch History is Empty</div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 video-grid">
            {
              historyvideos.map((video)=>{
                return (
                  <div className="col" key={video._id}>
                    <div className="card video-card-item h-100">
                      <Video obj={video}/>
                    </div>
                  </div>
                )
              })
            }
          </div>
        )}
    </div>
  )
}

export default History
