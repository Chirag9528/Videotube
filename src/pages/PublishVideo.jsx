import React , {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {LoadingBarContext} from '../contexts/index.jsx'

function PublishVideo(){
    const [videocredentials , setVideoCredentials] = useState({title : "" , description : "" , videoFile : null , thumbnail : null})
    const navigate = useNavigate(null)
    const OnChange = (e)=>{
        setVideoCredentials({...videocredentials , [e.target.name] : e.target.value})
    }

    const {setProgress} = useContext(LoadingBarContext)

    const publish = async (e)=>{
        e.preventDefault();
        try {
            setProgress(10)
            const formData = new FormData();
            formData.append("title", videocredentials.title);
            formData.append("description", videocredentials.description);
            formData.append("videoFile", videocredentials.videoFile);
            formData.append("thumbnail", videocredentials.thumbnail);

            setProgress(30)
            const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/videos` , {
                method : "POST",
                body : formData,
                headers : {
                },
                credentials : "include"
            });
            setProgress(80)

            if (!response.ok){
                console.error("Error:", response.status, response.statusText);
                alert(`Error: ${response.status} ${response.statusText}`);
                return;
            }
            const json = await response.json();
            setProgress(90)
            if (json.success) {
                alert("Published Video Successfully!");
                navigate("/")
            } else {
                alert(json.message || "Some Error Occurred! Try Again!!!");
            }
            console.log(json)
            

        } catch (error) {
            console.log("Error during publishing video")
            alert("An Error Occurred while Publishing Video. Please Try Again!!!")
        }
        setProgress(100)
    }   
    return (
    <div className='page-container'>
        <h1 className='page-title'>VideoStudio</h1>
        <div className="form-panel-wrapper">
            <div className="card vt-form-card mt-2">
                <h3 className='mt-2 mb-4'>Video Upload Pannel</h3>
                <form onSubmit={publish}>
                    <div className="row mb-3">
                        <label htmlFor="videotitle" className="col-12 col-sm-4 col-form-label text-sm-start">Title</label>
                        <div className="col-12 col-sm-8">
                        <input type="text" name="title" onChange={OnChange} value={videocredentials.title} className="form-control bg-black text-white" id="videotitle"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="videodesc" className="col-12 col-sm-4 col-form-label text-sm-start">Description</label>
                        <div className="col-12 col-sm-8">
                        <input type="text" name="description" onChange={OnChange} value={videocredentials.description} className="form-control bg-black text-white" id="videodesc"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="videofile" className="col-12 col-sm-4 col-form-label text-sm-start">VideoFile</label>
                        <div className="col-12 col-sm-8">
                        <input type="file" name="videoFile" onChange={(e) => setVideoCredentials({ ...videocredentials,videoFile: e.target.files[0]})}  className="form-control bg-black text-white" id="videofile"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="videothumbnail" className="col-12 col-sm-4 col-form-label text-sm-start">Thumbnail</label>
                        <div className="col-12 col-sm-8">
                        <input type="file" name="thumbnail" onChange={(e) => setVideoCredentials({ ...videocredentials,thumbnail: e.target.files[0]})} className="form-control bg-black text-white" id="videothumbnail"/>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type='submit' className='btn btn-secondary btn-submit'>
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default PublishVideo
