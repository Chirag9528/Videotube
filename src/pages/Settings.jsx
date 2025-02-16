import React from 'react'
import { Outlet } from 'react-router-dom'

function Settings() {
  return (
    <div className='mt-4 ms-4' style={{color : "white" , height : "87vh" , width : "84vw"}}>
        <h1 className='mb-3 ms-2' style={{flex : "10", textAlign : "left" , paddingLeft : "10px" , color :"white"}}>Settings</h1>
        <div className="" style={{}}>
        <main>
            <Outlet/>
        </main>
        </div>
    </div>
  )
}

export default Settings
