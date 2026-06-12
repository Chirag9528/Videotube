import React , {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import LoadingBarContext from '../../contexts/LoadingBar/LoadingBar';

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
    const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/playlist/${props.playlist._id}`,{
      method : 'DELETE',
      headers : {
        'Content-Type' : 'application/json',
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
    <div className="col">
      <div className="playlist-card-outer">
        <div className="playlist-card-shadow-1 card" />
        <div className="playlist-card-shadow-2 card" />
        <div className="card playlist-card-main">
          <img
            src={'https://res.cloudinary.com/harharmahadev/image/upload/v1739379626/bk6mx7jozcwc1r2nupqw.jpg'}
            alt="Playlist thumbnail"
            className="video-thumbnail"
            onClick={showplaylist}
          />
          <div className="card-body p-0 my-2 d-flex gap-2">
            <div className="flex-grow-1 min-w-0">
              <p className="card-text m-0 px-2 text-start text-truncate">{playlistname}</p>
              <p className="card-text px-2 text-start text-truncate" style={{color: "rgb(169 , 169 , 169)"}}>{playlistdesc}</p>
            </div>
            <div className='py-1 flex-shrink-0'>
              <button id={`dropdown-${props.playlist._id}`} type='button' data-bs-toggle="dropdown" aria-expanded="false" style={{background:"rgb(0,0,0)" , color:"white" , border : "none"}}>
                    <BsThreeDotsVertical />
              </button>
              <ul className="dropdown-menu" aria-labelledby={`dropdown-${props.playlist._id}`}>
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
