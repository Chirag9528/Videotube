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
                    // Authorization : localStorage.getItem('token')
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

    <>
    <div className='mt-4 ms-4' style={{color : "white" , height : "87vh" , width : "84vw"}}>
        <h1 className='mb-3 ms-2' style={{flex : "10", textAlign : "left" , paddingLeft : "10px" , color :"white"}}>VideoStudio</h1>
        <div className="" style={{}}>
            <div style={{color : "white" , display : "flex" , flexDirection:"column" , justifyContent : "center" , alignItems : "center"}}>
                <div className="card mt-4" style={{backgroundColor : "black" , color :"white" , width:"40vw" , border:"2px solid white"}} >
                    <h3 className='mt-2 mb-4'>Video Upload Pannel</h3>
                    <form onSubmit={publish}  style={{display : "flex" , flexDirection:"column" , justifyContent : "center" , alignContent:"center"}}>
                        <div className="row m-3" style={{}}>
                            <label htmlFor="videotitle" className="col-sm-4 col-form-label" style={{textAlign:"left" , fontSize:"1.2rem"}}>Title</label>
                            <div className="col-sm-8">
                            <input type="text" name="title" onChange={OnChange} value={videocredentials.title} className="form-control" id="videotitle"/>
                            </div>
                        </div>
                        <div className="row m-3" style={{}}>
                            <label htmlFor="videodesc" className="col-sm-4 col-form-label" style={{textAlign:"left" , fontSize:"1.2rem"}}>Description</label>
                            <div className="col-sm-8">
                            <input type="text" name="description" onChange={OnChange} value={videocredentials.description} className="form-control" id="videodesc"/>
                            </div>
                        </div>
                        <div className="row m-3" style={{}}>
                            <label htmlFor="videofile" className="col-sm-4 col-form-label" style={{textAlign:"left" , fontSize:"1.2rem"}}>VideoFile</label>
                            <div className="col-sm-8">
                            <input type="file" name="videoFile" onChange={(e) => setVideoCredentials({ ...videocredentials,videoFile: e.target.files[0]})}  className="form-control" id="videofile"/>
                            </div>
                        </div>
                        <div className="row m-3" style={{}}>
                            <label htmlFor="videothumbnail" className="col-sm-4 col-form-label" style={{textAlign:"left" , fontSize:"1.2rem"}}>Thumbnail</label>
                            <div className="col-sm-8">
                            <input type="file" name="thumbnail" onChange={(e) => setVideoCredentials({ ...videocredentials,thumbnail: e.target.files[0]})} className="form-control" id="videothumbnail"/>
                            </div>
                        </div>
                        <div className='row m-3' style={{display : "flex" , justifyContent:"center" , alignItems : "center"}}>
                            <button type='submit' className='btn btn-secondary' style={{width:"8vw"}}>
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default PublishVideo
