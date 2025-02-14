import React, { useContext, useEffect, useState } from 'react'
import Video from '../components/Video/Video'
import LoadingBarContext from '../components/contexts/LoadingBar/LoadingBar'

function Home() {

  const [allvideos , setAllVideos] = useState([])
  const {setProgress} = useContext(LoadingBarContext)

  useEffect(()=>{
    const fetchData = async()=>{
      setProgress(20)
      const response = await fetch('http://localhost:8000/api/v1/videos/all/?page=1&limit=10&sortBy=title&sortType=asc&query=', {
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
    <div className='m-4' style={{}}>
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{display : "flex"}}>
          {
            allvideos.map((video)=>{
              return (
                <div key={video._id} className="card ms-4 p-0" style={{height:"317px" , width : "375px" , backgroundColor: "rgb(0,0,0)"}}> 
                  <Video obj = {video}/>;
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default Home
