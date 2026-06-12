import React,{useState , useEffect, useContext} from 'react'
import {Video} from "../components/index.jsx"
import {LoadingBarContext} from '../contexts/index.jsx'

function LikedVideos(){
  const [likedvideos , setLikedVideos] = useState([])
  const {setProgress} = useContext(LoadingBarContext)
  useEffect(()=>{
      const fetchData = async()=>{
        setProgress(20)
        const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/likes/videos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials : "include"
        })
        .then(response => response.json())
        .catch(error=> console.log(error))
        setProgress(60)

        if (response && response.success){
          setLikedVideos(response.data)
        }
        setProgress(100)
      };
      fetchData()
    } , [])
  return (
    <div className="page-container">
        <h1 className="page-title">Liked Videos</h1>
        {likedvideos.length === 0 ? (
          <div className="empty-state">No Liked Videos</div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 video-grid">
            {
              likedvideos.map((video)=>{
                delete video._id
                const newdetail = {...video , ["_id"] : video.videoid}
                return (
                  <div className="col" key={newdetail._id}>
                    <div className="card video-card-item h-100">
                      <Video obj={newdetail}/>
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

export default LikedVideos
