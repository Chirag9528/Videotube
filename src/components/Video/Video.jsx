import React , {useState , useRef} from 'react'

function Video(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleThumbnailClick = () => {
    // setIsPlaying(true); // Replace the thumbnail with the video
    // videoRef.current.play(); // Start playing the video
    console.log("Hello world")
    props.videohandle()
  };
  return (
    <div className="card ms-4 p-0" style={{height:"330px" , width : "375px" , color :"white",background: "rgb(0,0,0)" }} onClick={handleThumbnailClick}>
        {!isPlaying && (
          <img
            src={props.obj.thumbnail}
            alt="Video Thumbnail"
            style={{borderRadius: "15px"}}
            width="370px"
            height="250px"
          />
        )}
        <video
          ref={videoRef}
          style={{ display: isPlaying ? "block" : "none" , borderRadius : "15px" }}
          controls
        >
          <source src={props.obj.videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="card-body p-0 my-2">
          <div className="row g-0">
            <div className="col-md-2" style={{display : "flex" , justifyContent : "center"}}>
              <img src={props.obj.createdBy.avatar} className="img-fluid rounded-circle" style={{height : "50px" , width: "50px" , objectFit : "cover" , borderRadius : "50%"}} alt="..."/>
            </div>
            <div className="col-md-10">
              <div className="">
                <p className="card-text m-0 px-2 text-start">{props.obj.title}</p>
                <p className="card-text px-2 text-start" style={{color: "rgb(169 , 169 , 169)"}}>{props.obj.createdBy.username}</p>
              </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Video
