import React, { useEffect, useRef } from 'react'

function VideoBig(props) {
    const videoRef = useRef(null)
    useEffect(()=>{
        videoRef.current.click()
    })
    return (
    <div className="card ms-4 p-0" style={{color:"white" , background: "rgb(0,0,0)"}}>
        <video
            ref={videoRef}
            style={{borderRadius : "15px" }}
            controls
        >
          <source src={props.obj.videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="card-body p-0 my-2">
          <div class="row g-0">
            <div class="col-md-2" style={{"display" : "flex" , "justify-content" : "center"}}>
              <img src={props.obj.createdBy.avatar} class="img-fluid rounded-circle" style={{height : "50px" , width: "50px" , objectFit : "cover" , borderRadius : "50%"}} width="60px" alt="..."/>
            </div>
            <div class="col-md-10">
              <div class="">
                <p class="card-text m-0 px-2 text-start">{props.obj.title}</p>
                <p class="card-text px-2 text-start" style={{color: "rgb(169 , 169 , 169)"}}>{props.obj.createdBy.username}</p>
              </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default VideoBig
