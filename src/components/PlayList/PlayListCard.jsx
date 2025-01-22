import React , {useState , useRef} from 'react'
import { useNavigate } from 'react-router-dom';

function PlayListCard(props) {
  const playlistname = props.playlist.name;
  const playlistdesc = props.playlist.description;
  const navigate = useNavigate()

  const showplaylist = ()=>{  
    navigate("/showplaylist" , {state : {playlist : props.playlist}})
  }

  return (
  
    <div className='p-0' style={{marginRight:"20px" , marginTop : "0px", width: '359px', height: '325px',  position: 'relative'}} onClick={showplaylist}>
      <div className='card' style={{ position: 'absolute', top:'0px' , left:'26px',  width: '300px', height: '230px', backgroundColor: 'rgb(66,78,81)' }}>
        Div 1
      </div>
      <div className='card' style={{ position: 'absolute', top: '4px', left: '16px', width: '320px', height: '230px', backgroundColor: 'rgb(118 , 142 , 147)' }}>
        Div 2
      </div>
      <div style={{ position: 'absolute', top: '10px', left: '0px'}}>
        <div className="card m p-0" style={{height:"310px" , width : "350px" , color :"white",background: "rgb(0,0,0)" }}>
          <img
          src={'http://res.cloudinary.com/harharmahadev/image/upload/v1736842158/yc6ppc1nwxb8tpsz4ebu.jpg'}
          alt="Video Thumbnail"
          style={{borderRadius: "15px"}}
          width="350px"
          height="230px"
          />
          

          <div className="card-body p-0 my-2" style={{}}>
              <p className="card-text m-0 px-2 text-start">{playlistname.length > 20 ? playlistname.slice(0,20) : playlistname}</p>
              <p className="card-text px-2 text-start" style={{color: "rgb(169 , 169 , 169)"}}>{playlistdesc.length > 30 ? (playlistdesc.slice(0,30) + " ...") : playlistdesc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayListCard
