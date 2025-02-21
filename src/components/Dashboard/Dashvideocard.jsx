import React , {useState , useRef, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {LoadingBarContext} from '../../contexts/index.jsx'

function Dashvideocard(props) {
  const navigate = useNavigate()

  const {setProgress} = useContext(LoadingBarContext)

  const handleThumbnailClick = (video) => {
    setProgress(10)
    navigate("/playvideo" , {state : {obj : video}})  // state gets attached to location object... we use useLocation hook to get it
  };
  return (
    <div className="" style={{color :"white",background: "rgb(0,0,0)" }} onClick={() => handleThumbnailClick(props.obj)}>
        <img
          src={props.obj.thumbnail}
          alt="Video Thumbnail"
          style={{borderRadius: "15px"}}
          width={props.imgdim? props.imgdim.width : "370px"}
          height={props.imgdim ? props.imgdim.height : "250px"}
        />
        <div className="card-body p-0 my-2">
          <div className="row g-0">
            <div className="col-md-10">
              <div className="">
                <p className="card-text m-0 px-2 text-start">{props.obj.title.length > 22 ? props.obj.title.slice(0,22) + "..." : props.obj.title}</p>
                <p className='card-text px-2 text-start' style={{color:"rgb(169,169,169)"}}>{props.obj.views} views</p>
              </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Dashvideocard
