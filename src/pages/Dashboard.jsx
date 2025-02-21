import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {LoadingBarContext} from '../contexts/index.jsx'

function Dashboard(){
    const [dashboard , setDashboard] = useState({})
    const location = useLocation()
    const navigate = useNavigate()
    const {setProgress} = useContext(LoadingBarContext)
    const [flag , setFlag] = useState(false)
    const [isSubscribed , setIsSubscribed] = useState(false)

    // const {name} = location.state || ""  --> not working after refreshing
    useEffect(()=>{
        const getdashboard = async ()=>{
            try {
                const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/users/c/${localStorage.getItem('name')}` , {
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    credentials : "include"
                })
                const data  = await response.json()
                setDashboard(data.data)
                setIsSubscribed(data.data.isSubscribed)
                setFlag(true)
            } catch (error) {
                console.log("Error: ",error);
            }
        }
        getdashboard();
    },[name])
    
    useEffect(() => {
        if (flag){
            setProgress(10);
            navigate("/dashboard/videos", { state: { userId: dashboard._id } });

        }
    }, [flag]); 
    
    const handledashboardplaylists = (userId) =>{
        setProgress(10)
        navigate("/dashboard/playlists" , {state : {userId : userId}})  // state gets attached to location object... we use useLocation hook to get it
    }

    const handledashboardvideos = (userId) =>{
        setProgress(10)
        navigate("/dashboard/videos" , {state : {userId : userId}})  // state gets attached to location object... we use useLocation hook to get it
    }

    const handledashboardtweets = (userId) =>{
        setProgress(10)
        navigate("/dashboard/tweets" , {state : {userId : userId}})  // state gets attached to location object... we use useLocation hook to get it
    }

    const togglesubscription = async ()=>{
        try {
          const response = await fetch( `${import.meta.env.VITE_HOSTNAME}/api/v1/subscriptions/c/${dashboard._id}` , {
            method : "POST",
            headers : {
              'Content-Type' : 'application/json',
              // 'Authorization' : localStorage.getItem('token')
            },
            credentials : "include"
          })
          .then(response => response.json())
          
          if (response && response.success){
            setIsSubscribed(!isSubscribed)
          }
        } catch (error) {
          console.log("Error: ",error)
        }
    }

  return (
    <div className='pt-3 ps-3' style={{color : "white", height:"90vh" , width : "83vw"}}>
        <div className="card pt-0" style={{height: "20vh" , backgroundColor : 'rgb(0,0,0)'}}>
            <img src={dashboard.coverImage} style={{height :"19vh" , borderRadius:"20px"}} />
        </div>
        <div className="card pt-2 " style={{backgroundColor : 'rgb(0,0,0)', display : "flex" ,  flexDirection : "row"}}>
            <div className="card p-0" style={{display:"flex" , justifyContent:"center" , alignItems :"center" ,  backgroundColor:'rgb(0,0,0)' , width : "14vw"}}>
                <img src={dashboard.avatar} className="img-fluid rounded-circle" style={{height : "17vh" , width: "10vw" , objectFit : "cover" , borderRadius : "50%"}}/>
            </div>
            <div className="card p-0" style={{color:"white", backgroundColor:'rgb(0,0,0)', width: "68vw" , textAlign : "left"}}>
                <div className="px-2 pt-1 m-0" style={{flex : "10" , fontSize : "1.5rem"}}>{dashboard.username || ""}</div>
                <div className="px-2 pt-2" style={{height:"5vh" ,  textAlign : "left", color:"rgb(169,169,169)"}}> {dashboard.subscribersCount} Subscribers  &nbsp; <span style={{ fontWeight: "bold", fontSize: "1.2rem", lineHeight: "1" }}>·</span>&nbsp;&nbsp;{dashboard.channelsSubscribedToCount} Subscribed</div>
                <div className="px-2 pt-2" style={{height:"7vh"}}> <button className={`btn ${isSubscribed? 'btn-dark' : 'btn-light'}`} onClick={togglesubscription}>{isSubscribed? "Subscribed" : "Subscribe"}</button></div>
            </div>
        </div>
        <div className='ms-4' style={{ minHeight : "40vh"}}>
            <nav className="navbar navbar-expand-lg" style={{fontSize : "1.2rem"}} >
                <div onClick={()=>handledashboardvideos(dashboard._id)} className={`nav-item me-4 ms-4 ${location.pathname === "/dashboard/videos" ? "dashboard_active" : "dashboard_inactive"}`} style={{cursor : "pointer"}}>Videos</div>
                <div onClick={()=>handledashboardplaylists(dashboard._id)} className={`nav-item me-4 ${location.pathname === "/dashboard/playlists" ? "dashboard_active" : "dashboard_inactive"}`} style={{cursor : "pointer"}}>Playlists</div>
                <div onClick={()=>handledashboardtweets(dashboard._id)} className={`nav-item me-4 ${location.pathname === "/dashboard/tweets" ? "dashboard_active" : "dashboard_inactive"}`} style={{cursor : "pointer"}}>Tweets</div>
            </nav>
            <main>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default Dashboard
