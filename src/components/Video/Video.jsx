import React , {useState , useRef, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingBarContext from '../../contexts/LoadingBar/LoadingBar';

function Video(props) {
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
          width={props.imgdim? props.imgdim.width : "350px"}
          height={props.imgdim ? props.imgdim.height : "230px"}
        />
        <div className="card-body p-0 my-2">
          <div className="row g-0" style={{}}>
            <div className="col-md-2" style={{display : "flex" , justifyContent : "center" , alignItems : "center"}}>
              <img src={props.obj.avatar} className="img-fluid rounded-circle" style={{height : "50px" , width: "50px" , objectFit : "cover" , borderRadius : "50%"}} alt="..."/>
            </div>
            <div className="col-md-10" style={{}}>
              <div className="" style={{}}>
                <p className="card-text m-0 px-2 text-start" style={{}}>{props.obj.title.length > 30 ? props.obj.title.slice(0,30) + "..." : props.obj.title}</p>
                <p className="card-text m-0 px-2 text-start" style={{fontSize: "0.9rem" , color: "rgb(169 , 169 , 169)"}}>{props.obj.ownername}</p>
                <p className='card-text px-2 text-start' style={{fontSize:"0.9rem", color:"rgb(169,169,169)"}}>{props.obj.views} views </p>
              </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Video
