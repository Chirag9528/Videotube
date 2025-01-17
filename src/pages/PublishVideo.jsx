import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function PublishVideo(){
    const [videocredentials , setVideoCredentials] = useState({title : "" , description : "" , videoFile : null , thumbnail : null})
    const navigate = useNavigate(null)
    const OnChange = (e)=>{
        setVideoCredentials({...videocredentials , [e.target.name] : e.target.value})
    }
    const publish = async (e)=>{
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", videocredentials.title);
            formData.append("description", videocredentials.description);
            formData.append("videoFile", videocredentials.videoFile);
            formData.append("thumbnail", videocredentials.thumbnail);

            const response = await fetch( "http://localhost:8000/api/v1/videos" , {
                method : "POST",
                body : formData,
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            });

            if (!response.ok){
                console.error("Error:", response.status, response.statusText);
                alert(`Error: ${response.status} ${response.statusText}`);
                return;
            }
            const json = await response.json();
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
    }   
    return (
    <div style={{color : "white" ,width:"85vw" , height:"88vh" ,display:"flex" , justifyContent:"center" , alignItems:"center"}}>
      <form style={{ borderRadius : "30px" , backgroundColor:"rgb(159,159,159)"}} className='p-4' onSubmit={publish}>
            <h1 className='m-4'>Video Upload Pannel</h1>
            <div className="row mb-3" style={{display : "flex"}}>
            <label htmlFor="videotitle" className="col-sm-2 col-form-label" style={{flex : 2}}>Title :</label>
                <div className="col-sm-10" style={{flex : 5}}>
                <input type="text" name="title" onChange={OnChange} value={videocredentials.title} className="form-control" id="videotitle"/>
                </div>
            </div>
            <div className="row mb-3" style={{display : "flex"}}>
            <label htmlFor="videodesc" className="col-sm-2 col-form-label" style={{flex : 2}}>Description :</label>
                <div className="col-sm-10" style={{flex : 5}}>
                <input type="text" name="description" onChange={OnChange} value={videocredentials.description} className="form-control" id="videodesc"/>
                </div>
            </div>
            <div className="row mb-3" style={{display : "flex"}}>
            <label htmlFor="videofile" className="col-sm-2 col-form-label" style={{flex: 2}}>VideoFile : </label>
                <div className="col-sm-10" style={{flex : 5}}>
                <input type="file"  name="videoFile" onChange={(e) => setVideoCredentials({ ...videocredentials,videoFile: e.target.files[0]})} className="form-control" id="videofile"/>
                </div>
            </div>
            <div className="row mb-3" style={{display : "flex"}}>
            <label htmlFor="videothumbnail" className="col-sm-2 col-form-label" style={{flex : 2}}>Thumbnail :</label>
                <div className="col-sm-10" style={{flex : 5}}>
                <input type="file" name="thumbnail" onChange={(e) => setVideoCredentials({ ...videocredentials,thumbnail: e.target.files[0]})} className="form-control" id="videothumbnail"/>
                </div>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Upload</button>
            </div>
        </form>
    </div>
  )
}

export default PublishVideo
