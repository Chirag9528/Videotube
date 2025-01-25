import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import VideoCard from './VideoCard'
import { BsThreeDotsVertical } from "react-icons/bs";

function PlaylistPage() {
    const location = useLocation()
    const {playlist} = location.state || {}
    const navigate = useNavigate()

    const [deletevideoid , setDeleteVideoId] = useState("")
    const [isdeletable , setIsDeletable] = useState(false)

    const deletevideo = async ()=>{
        console.log(deletevideoid)
        console.log(playlist._id)
        const response = await fetch(`http://localhost:8000/api/v1/playlist/remove/${deletevideoid}/${playlist._id}` , {
          method : 'PATCH',
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('token')
          }
        })
        .then(response => response.json())
        .catch(error => console.log(error))

        if (response && response.success){
          navigate("/playlists")
          alert("Video removed from playlist")
        }
        else{
          alert("Try Again !!!")
        }
    }

    useEffect(()=>{
      if (isdeletable) deletevideo();
    } , [isdeletable])


    const ref = useRef(null)
    const refClose = useRef(null)
    const [allplaylists , setAllPlayLists] = useState([])

    const [addvideoid , setAddVideoId] = useState("")
    const [isaddable , setIsAddable] = useState(false)

    useEffect(()=>{
      if (isaddable) ref.current.click()
    },[isaddable])


    useEffect(()=>{
      const fetchallplaylists = async ()=>{
        const response = await fetch('http://localhost:8000/api/v1/playlist/user/playlists',{
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('token')
          }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
        if (response && response.success){
          console.log(response.data)
          setAllPlayLists(response.data)
        }
      }
      fetchallplaylists()
    },[])

    const addtoplaylist = async (videoId , playlistId)=>{
      const response = await fetch(`http://localhost:8000/api/v1/playlist/add/${videoId}/${playlistId}`,{
        method : 'PATCH',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : localStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .catch(error => console.log(error))

      if (response && response.success){
        alert("Video Added to PlayList")
        refClose.current.click()
        navigate("/playlists")
      }
      else{
        alert("Try Again")
      }
    }

    const deletefromplaylist = async(videoId , playlistId)=>{
      const response = await fetch(`http://localhost:8000/api/v1/playlist/remove/${videoId}/${playlistId}`,{
        method : 'PATCH',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : localStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .catch(error => console.log(error))

      if (response && response.success){
        alert("Video Removed from PlayList")
        refClose.current.click()
        navigate("/playlists")
      }
      else{
        alert("Try Again")
      }
    }

    const deleteplaylist = async ()=>{
      const response = await fetch(`http://localhost:8000/api/v1/playlist/${playlist._id}`,{
        method : 'DELETE',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : localStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .catch(error => console.log(error))
  
      if (response && response.success){
        alert('PlayList Deleted Successfully')
        navigate("/playlists")
      }
      else{
        alert('Try Again')
      }
    }

    const editref = useRef()
    const editrefClose = useRef()
    const [editname , setEditName] = useState(playlist.name)
    const [editdescription , setEditDescription] = useState(playlist.description)
        
    const editplaylist = async ()=>{
      const response = await fetch(`http://localhost:8000/api/v1/playlist/${playlist._id}`,{
        method : 'PATCH',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : localStorage.getItem('token')
        },
        body : JSON.stringify({name : editname , description : editdescription})
      })
      .then(response => response.json())
      .catch(error => console.log(error))
  
      if (response && response.success){
        navigate("/playlists")
        editrefClose.current.click()
        alert('PlayList Update Successfully')
      }
      else{
        alert('Try Again')
      }
    }
    
  return (
    <>
    <div style={{color : "white" , width : "83vw" , display : "flex" , height : "90vh"}}>
      <div className="card" style={{width: "27vw" , height : "89vh" , textAlign:"left" , backgroundColor:"rgb(0,0,0)" , color : "white"}}>
        <img src={'http://res.cloudinary.com/harharmahadev/image/upload/v1736842158/yc6ppc1nwxb8tpsz4ebu.jpg'} style={{borderRadius : "10px"}}/>
        <div style={{display : "flex"}}>
          <div className="card-title px-2 my-2" style={{flex : "10" , fontSize : "1.5rem"}}>{playlist?.name || ""}</div>
          <div style={{display : "flex" , justifyContent : "center" , alignItems : "center"}}>
            <button id="dropdownMenuButton" type='button' data-bs-toggle="dropdown"  aria-expanded="false" style={{background:"rgb(0,0,0)" , color:"white" , border : "none"}}>
                  <BsThreeDotsVertical />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><button className='dropdown-item' onClick={()=>{editref.current.click()}}>Edit</button></li>
                <li><button className='dropdown-item' onClick={deleteplaylist}>Delete</button></li>
            </ul>
          </div>
        </div>
        <div className="card-body px-2 py-1" style={{}}>
            {playlist?.description || ""}
        </div>
      </div>
      <div className="card container column flex-column flex-nowrap  " style={{width : "57vw" , backgroundColor : "rgb(0,0,0)" , overflow : "auto"}}>
        {
            playlist?.videos?.map((videoId)=>{
                return <VideoCard key={videoId} videoId = {videoId} setDeleteVideoId = {setDeleteVideoId} setIsDeletable = {setIsDeletable} setAddVideoId = {setAddVideoId}  setIsAddable = {setIsAddable} />
            })
        }
        {
            playlist?.videos.length === 0 && <h3 style={{color : "white"}}>Currently No Videos Added</h3>
        }
      </div>

    </div>
      {/* Playlists Modal */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#playlistsModal">
      Launch demo modal
      </button>
      <div className="modal fade" id="playlistsModal" tabIndex="-1" aria-labelledby="playlistsModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
          <div className="modal-header">
              <h1 className="modal-title fs-5" id="loginModalLabel">Playlists</h1>
              <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
              <form>
                {
                  allplaylists.map((playlist)=>{
                    return (
                    <div className="row my-2 mx-3" key={playlist._id} style={{border : "2px solid black" , borderRadius : "10px"}}>
                      <div className="col-sm-4" style={{display : "flex" , alignItems : "center" , justifyContent : "center"}}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={playlist._id}
                          style={{fontSize : "1.5rem"}}
                          checked={playlist.videos.includes(addvideoid)}
                          onChange={() => {playlist.videos.includes(addvideoid) ? deletefromplaylist(addvideoid , playlist._id) :addtoplaylist(addvideoid , playlist._id)}} 
                        />
                      </div>
                      <label htmlFor={playlist._id} className="col-sm-7 col-form-label" style={{textAlign : "left"}}>{playlist.name.length > 30 ? playlist.name.slice(0,30)+" ..." : playlist.name}</label>
                    </div>
                    )

                  })
                }
              </form>
          </div>
          <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={()=>{refClose.current.click()}}>Close</button>
          </div>
          </div>
      </div>
      </div>
      {/* PlayLists Modal Ends here */}

      {/* Edit Modal */}
      <button type="button" ref={editref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true" style={{color : "black"}}>
      <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
          <div className="modal-header">
              <h1 className="modal-title fs-5" id="editModalLabel">Edit PlayList</h1>
              <button type="button" ref={editrefClose} onClick={()=>{setEditModalVisibility(false)}} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
              <form>
                <div className="row mb-3" style={{display : "flex"}}>
                  <label htmlFor="Title" className="col-sm-2 col-form-label" style={{flex : "2"}}>Title</label>
                    <div className="col-sm-10" style={{flex : "10"}}>
                    <input type="text" value={editname} onChange={(e)=>{setEditName(e.target.value)}} name="name" className="form-control" id="Title"/>
                    </div>
                </div>
                <div className="row mb-3" style={{display : "flex"}}>
                  <label htmlFor="Desc" className="col-sm-2 col-form-label" style={{flex : "2"}}>Description</label>
                    <div className="col-sm-10" style={{flex : "10"}}>
                    <input type="text" value={editdescription} onChange={(e)=>{setEditDescription(e.target.value)}} name="description" className="form-control" id="Desc"/>
                    </div>
                </div>
              </form>
          </div>
          <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={editplaylist}>Update</button>
          </div>
          </div>
      </div>
      </div>
      {/* Edit Modal Ends here */}
      </>
  )
}

export default PlaylistPage
