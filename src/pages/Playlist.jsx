import React, { useContext, useEffect, useRef, useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { Link, useNavigate } from 'react-router-dom'
import PlayListCard from '../components/PlayList/PlayListCard';
import LoadingBarContext from '../components/contexts/LoadingBar/LoadingBar';

function Playlist() {
  const [playlists , setPlayLists] = useState([])
  const [playlistDetail , setPlayListDetail] = useState({"_id" : "" , "name" : "" , "description" : ""  , "videos" : []})
  const ref = useRef(null);
  const refClose = useRef(null);
  const navigate = useNavigate()

  const [editplaylistdetail , setEditPlayListDetail] = useState("")
  const editref = useRef(null)
  const editrefClose = useRef(null)

  const [editmodalvisibility , setEditModalVisibility] = useState(false)

  useEffect(()=>{
    if (editmodalvisibility === true){
      editref.current.click()
    }
  },[editmodalvisibility])


  const OnChange = (e)=>{
    e.preventDefault();
    setPlayListDetail({...playlistDetail , [e.target.name] : e.target.value})
  }

  const {setProgress} = useContext(LoadingBarContext)

  useEffect(()=>{
    const getPlaylists = async ()=>{
      setProgress(20)
      const response = await fetch('http://localhost:8000/api/v1/playlist/user/playlists' , {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json',
          // 'Authorization' : localStorage.getItem('token')
        },
        credentials : "include" // to allow your browser to send cookies to cross origin request
      })
      .then(response => response.json())
      .catch(error => console.log(error))
      setProgress(40)

      if (response && response.success){
        setPlayLists(response.data)
      }
      setProgress(100)
    }
    getPlaylists();
  },[])

  const createplaylist = async ()=>{
    const response = await fetch('http://localhost:8000/api/v1/playlist' , {
      method : 'POST' ,
      headers : {
        'Content-Type' : 'application/json',
        // 'Authorization' : localStorage.getItem('token')
      },
      credentials : "include",
      body : JSON.stringify({name : playlistDetail.name , description : playlistDetail.description})
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    if (response.success){
      refClose.current.click()
      alert('PlayList Created Successfully');
      console.log(response)
      navigate(0)
    }
    else{
      alert('Try Again')
    }
  }

  const editplaylist = async ()=>{
    const response = await fetch(`http://localhost:8000/api/v1/playlist/${editplaylistdetail._id}`,{
      method : 'PATCH',
      headers : {
        'Content-Type' : 'application/json',
        // 'Authorization' : localStorage.getItem('token')
      },
      credentials : "include",
      body : JSON.stringify({name : editplaylistdetail.name , description : editplaylistdetail.description})
    })
    .then(response => response.json())
    .catch(error => console.log(error))

    if (response && response.success){
      navigate(0)
      editrefClose.current.click()
      alert('PlayList Update Successfully')
    }
    else{
      alert('Try Again')
    }
  }

  return (
    <div className='m-4' style={{color : "white" , width : "82vw"}}>
      <div style={{display : "flex"}}>
        <h1 style={{flex : "10", textAlign : "left" , paddingLeft : "10px"}}>Playlists</h1>
        <div style={{}}>
          <button className="btn btn-dark" style={{height:'3rem'}} onClick={()=>{ref.current.click()}}>
            <GoPlus style={{fontSize:'1.5rem'}}/> New Playlist
          </button>
        </div>
      </div>

    {/* Playlist Modal */}
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#newplaylistModal">
      Launch demo modal
      </button>
      <div className="modal fade" id="newplaylistModal" style={{color : "black"}} tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
          <div className="modal-header">
              <h1 className="modal-title fs-5" id="loginModalLabel">New Playlist</h1>
              <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <label htmlFor="playlistName" className="col-sm-3 col-form-label">Name</label>
                    <div className="col-sm-9">
                    <input type="text" value={playlistDetail.name} onChange={OnChange} name="name" className="form-control" id="playlistName"/>
                    </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="playlistDesc" className="col-sm-3 col-form-label">Description</label>
                    <div className="col-sm-9">
                    <input type="text" value={playlistDetail.description} onChange={OnChange} name="description" className="form-control" id="playlistDesc"/>
                    </div>
                </div>
              </form>
          </div>
          <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={createplaylist}>Create</button>
          </div>
          </div>
      </div>
    </div>
    {/* Playlist Modal Ends here */}

    <div className="row row-cols-1 row-cols-md-3 g-4 m-2" style={{display : "flex"}}>
    {
      playlists.map((playlist)=>{
        return <PlayListCard key = {playlist._id} playlist = {playlist} setEditPlayListDetail={setEditPlayListDetail} onedit = {setEditModalVisibility}/>
      })
    }
    </div>

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
                  <input type="text" value={editplaylistdetail.name || ''} onChange={(e)=>setEditPlayListDetail({...editplaylistdetail , [e.target.name] : e.target.value})} name="name" className="form-control" id="Title"/>
                  </div>
              </div>
              <div className="row mb-3" style={{display : "flex"}}>
                <label htmlFor="Desc" className="col-sm-2 col-form-label" style={{flex : "2"}}>Description</label>
                  <div className="col-sm-10" style={{flex : "10"}}>
                  <input type="text" value={editplaylistdetail.description || ''} onChange={(e)=>setEditPlayListDetail({...editplaylistdetail , [e.target.name] : e.target.value})} name="description" className="form-control" id="Desc"/>
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
  </div>
  )
}

export default Playlist
