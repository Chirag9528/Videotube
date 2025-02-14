import React,{useState , useEffect, useContext} from 'react'
import Video from '../components/Video/Video'
import LoadingBarContext from '../components/contexts/LoadingBar/LoadingBar'

function LikedVideos(){
  const [likedvideos , setLikedVideos] = useState([])
  const {setProgress} = useContext(LoadingBarContext)
  useEffect(()=>{
      const fetchData = async()=>{
        setProgress(20)
        const response = await fetch('http://localhost:8000/api/v1/likes/videos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization' : localStorage.getItem('token')
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
    <div className='m-4' style={{}}>
        <h1 className='mb-3 ms-2' style={{flex : "10", textAlign : "left" , paddingLeft : "10px" , color :"white"}}>Liked Videos</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{display : "flex" , color : "white" , height : "85vh" , width : "83vw"}}>
          {
            likedvideos.map((video)=>{
              delete video._id
              const newdetail = {...video , ["_id"] : video.videoid}
              return (<div className="card ms-4 p-0" key={newdetail._id} style={{height:"317px" , width : "375px" , backgroundColor: "rgb(0,0,0)"}}> 
                  <Video obj = {newdetail}/>;
              </div>)
            })
          }
          {
            likedvideos.length === 0 ? <div style={{fontSize : "1.5rem" ,  width : "83vw"}}>No Liked Videos</div> : ""
          }
        </div>
    </div>
  )
}

export default LikedVideos
