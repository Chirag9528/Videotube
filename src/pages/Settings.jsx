import React from 'react'
import { Outlet } from 'react-router-dom'

function Settings() {
  return (
    <div className='page-container'>
        <h1 className='page-title'>Settings</h1>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

export default Settings
