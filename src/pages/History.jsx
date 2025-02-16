import React, { useContext, useEffect, useState } from 'react'
import LoadingBarContext from '../components/contexts/LoadingBar/LoadingBar'
import Video from '../components/Video/Video'

function History() {

  const [historyvideos , setHistoryVideos] = useState([])
  const {setProgress} = useContext(LoadingBarContext)

  useEffect(()=>{
    const fetchhistory = async ()=>{
      setProgress(20)
      const response = await fetch('http://localhost:8000/api/v1/users/history',{
        method : 'GET',
        credentials : "include"
      })
      .then(response => response.json())
      .catch(error=>console.log(error))
      setProgress(60)

      if (response && response.success){
        console.log(response)
        setHistoryVideos(response.data)
      }
      setProgress(100)
    }
    fetchhistory();
  },[])
  

  return (
    <div className='m-4' style={{}}>
        <h1 className='mb-3 ms-2' style={{flex : "10", textAlign : "left" , paddingLeft : "10px" , color :"white"}}>History</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{display : "flex" , color : "white" , height : "85vh" , width : "83vw"}}>
          {
            historyvideos.map((video)=>{
              return (<div className="card ms-3 p-0" key={video._id} style={{height:"317px" , width : "375px" , backgroundColor: "rgb(0,0,0)"}}> 
                  <Video obj = {video}/>;
              </div>)
            })
          }
          {
            historyvideos.length === 0 ? <div style={{fontSize : "1.5rem" ,  width : "83vw"}}>Watch History is Empty</div> : ""
          }
        </div>
    </div>
  )
}

export default History
