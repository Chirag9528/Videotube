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
    },[])
    
    useEffect(() => {
        if (flag){
            setProgress(10);
            navigate("/dashboard/videos", { state: { userId: dashboard._id } });

        }
    }, [flag]); 
    
    const handledashboardplaylists = (userId) =>{
        setProgress(10)
        navigate("/dashboard/playlists" , {state : {userId : userId}})
    }

    const handledashboardvideos = (userId) =>{
        setProgress(10)
        navigate("/dashboard/videos" , {state : {userId : userId}})
    }

    const handledashboardtweets = (userId) =>{
        setProgress(10)
        navigate("/dashboard/tweets" , {state : {userId : userId}})
    }

    const togglesubscription = async ()=>{
        try {
          const response = await fetch( `${import.meta.env.VITE_HOSTNAME}/api/v1/subscriptions/c/${dashboard._id}` , {
            method : "POST",
            headers : {
              'Content-Type' : 'application/json',
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
    <div className='dashboard-page'>
        <div className="dashboard-cover">
            <img src={dashboard.coverImage} alt="Channel cover" />
        </div>
        <div className="dashboard-profile-row pt-3">
            <div className="dashboard-avatar-wrap">
                <img src={dashboard.avatar} className="dashboard-avatar" alt="Channel avatar"/>
            </div>
            <div className="dashboard-info">
                <div className="px-2 pt-1 m-0 fs-5">{dashboard.username || ""}</div>
                <div className="px-2 pt-2" style={{color:"rgb(169,169,169)"}}>
                  {dashboard.subscribersCount} Subscribers &nbsp;
                  <span style={{ fontWeight: "bold", fontSize: "1.2rem", lineHeight: "1" }}>·</span>&nbsp;&nbsp;
                  {dashboard.channelsSubscribedToCount} Subscribed
                </div>
                <div className="px-2 pt-2">
                  <button className={`btn ${isSubscribed? 'btn-dark' : 'btn-light'}`} onClick={togglesubscription}>
                    {isSubscribed? "Subscribed" : "Subscribe"}
                  </button>
                </div>
            </div>
        </div>
        <div className='px-2'>
            <nav className="dashboard-nav">
                <div onClick={()=>handledashboardvideos(dashboard._id)} className={`nav-item ${location.pathname === "/dashboard/videos" ? "dashboard_active" : "dashboard_inactive"}`}>Videos</div>
                <div onClick={()=>handledashboardplaylists(dashboard._id)} className={`nav-item ${location.pathname === "/dashboard/playlists" ? "dashboard_active" : "dashboard_inactive"}`}>Playlists</div>
                <div onClick={()=>handledashboardtweets(dashboard._id)} className={`nav-item ${location.pathname === "/dashboard/tweets" ? "dashboard_active" : "dashboard_inactive"}`}>Tweets</div>
            </nav>
            <main>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default Dashboard
