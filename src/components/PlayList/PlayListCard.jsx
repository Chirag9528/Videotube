import React , {useState , useRef, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import LoadingBarContext from '../contexts/LoadingBar/LoadingBar';

function PlayListCard(props) {
  const playlistname = props.playlist.name
  const playlistdesc = props.playlist.description
  
  const navigate = useNavigate()

  const {setProgress} = useContext(LoadingBarContext)

  const showplaylist = ()=>{  
    setProgress(10)
    navigate("/showplaylist" , {state : {playlist : props.playlist}})
  }

  const deleteplaylist = async ()=>{
    const response = await fetch(`http://localhost:8000/api/v1/playlist/${props.playlist._id}`,{
      method : 'DELETE',
      headers : {
        'Content-Type' : 'application/json',
        // 'Authorization' : localStorage.getItem('token')
      },
      credentials : "include"
    })
    .then(response => response.json())
    .catch(error => console.log(error))

    if (response && response.success){
      alert('PlayList Deleted Successfully')
      navigate(0)
    }
    else{
      alert('Try Again')
    }
  }

  

  return (
  
    <div className='p-0' style={{marginRight:"20px" , marginTop : "0px", width: '359px', height: '325px',  position: 'relative'}}>
      <div className='card' style={{ position: 'absolute', top:'0px' , left:'26px',  width: '300px', height: '230px', backgroundColor: 'rgb(66,78,81)' }}>
        Div 1
      </div>
      <div className='card' style={{ position: 'absolute', top: '4px', left: '16px', width: '320px', height: '230px', backgroundColor: 'rgb(118 , 142 , 147)' }}>
        Div 2
      </div>
      <div style={{ position: 'absolute', top: '10px', left: '0px'}}>
        <div className="card m p-0" style={{height:"310px" , width : "350px" , color :"white",background: "rgb(0,0,0)" }}>
          <img
          src={'https://res.cloudinary.com/harharmahadev/image/upload/v1739379626/bk6mx7jozcwc1r2nupqw.jpg'}
          alt="Video Thumbnail"
          style={{borderRadius: "15px"}}
          width="350px"
          height="230px"
          onClick={showplaylist}
          />
          <div className="card-body p-0 my-2" style={{display:"flex"}}>
            <div style={{flex : "10"}}>
              <p className="card-text m-0 px-2 text-start">{playlistname.length > 30 ? playlistname.slice(0,30) + " ..." : playlistname}</p>
              <p className="card-text px-2 text-start" style={{color: "rgb(169 , 169 , 169)"}}>{playlistdesc.length > 30 ? (playlistdesc.slice(0,30) + " ...") : playlistdesc}</p>
            </div>
            <div className='py-1' style={{flex : "1"}}>
              <button id="dropdownMenuButton" type='button' data-bs-toggle="dropdown"  aria-expanded="false" style={{background:"rgb(0,0,0)" , color:"white" , border : "none"}}>
                    <BsThreeDotsVertical />
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li><button className='dropdown-item' onClick={()=>{props.setEditPlayListDetail({_id : props.playlist._id , name : playlistname , description : playlistdesc});props.onedit(true)}}>Edit</button></li>
                  <li><button className='dropdown-item' onClick={deleteplaylist}>Delete</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayListCard
