import React , {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingBarContext from '../../contexts/LoadingBar/LoadingBar';

function Video(props) {
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
          <div className="row g-0 align-items-center">
            <div className="col-auto px-2">
              <img src={props.obj.avatar} className="channel-avatar" alt="Channel avatar"/>
            </div>
            <div className="col">
              <p className="card-text m-0 px-1 text-start text-truncate">{props.obj.title}</p>
              <p className="card-text m-0 px-1 text-start" style={{fontSize: "0.9rem" , color: "rgb(169 , 169 , 169)"}}>{props.obj.ownername}</p>
              <p className='card-text m-0 px-1 text-start' style={{fontSize:"0.9rem", color:"rgb(169,169,169)"}}>{props.obj.views} views</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Video
