import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';

function VideoCard(props){
    const navigate = useNavigate()
    const [videodetails , setVideoDetails] = useState({})
    useEffect(()=>{
        const fetchvideo = async ()=>{
            const response = await fetch( `http://localhost:8000/api/v1/videos/${props.videoId}` , {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            .then(response => response.json())
            .catch(error => console.log(error))

            if (response && response.success){
                setVideoDetails(response.data)
            }
        };
        fetchvideo()
    },[])

  return (
    <div className='card d-flex flex-row p-0 my-1 hoverbackgroundcustom' style={{color : "white" , backgroundColor : "rgb(0,0,0)"}} onClick={()=>{navigate("/playvideo" , {state : {obj : videodetails}})}}>
        <img className='' src={videodetails.thumbnail} style={{height : "20vh" , width: "15vw" , borderRadius : "10px"}}/>
        <div style={{ width:"36vw"}}>
             <div className="card-title m-0 py-1 px-3" style={{textAlign : "left" , fontSize: "1.2rem"}}><b>{videodetails.title}</b></div>
             <div className="px-3" style={{textAlign : "left", color:"rgb(169,169,169)"}}>{videodetails.ownername} &nbsp; <span style={{ fontWeight: "bold", fontSize: "1.2rem", lineHeight: "1" }}>·</span>&nbsp;&nbsp;{videodetails.views} views</div>
        </div>
    </div>
  )
}

export default VideoCard
