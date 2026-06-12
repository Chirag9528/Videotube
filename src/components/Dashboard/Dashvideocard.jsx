import React , {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {LoadingBarContext} from '../../contexts/index.jsx'

function Dashvideocard(props) {
  const navigate = useNavigate()

  const {setProgress} = useContext(LoadingBarContext)

  const handleThumbnailClick = (video) => {
    setProgress(10)
    navigate("/playvideo" , {state : {obj : video}})
  };
  return (
    <div className="video-card-body h-100" onClick={() => handleThumbnailClick(props.obj)}>
        <img
          src={props.obj.thumbnail}
          alt="Video Thumbnail"
          className="video-thumbnail"
        />
        <div className="card-body p-0 my-2">
          <div className="row g-0">
            <div className="col-12">
              <p className="card-text m-0 px-2 text-start text-truncate">{props.obj.title}</p>
              <p className='card-text px-2 text-start' style={{color:"rgb(169,169,169)"}}>{props.obj.views} views</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Dashvideocard
