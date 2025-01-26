import { useContext, useState } from 'react'
import './App.css'
import {Header, Sidebar} from "./components/index.jsx"
import { Outlet } from 'react-router-dom'
import LoadingBar from "react-top-loading-bar"
import LoadingBarContext from './components/contexts/LoadingBar/LoadingBar.js'

function App(){
  const {progress} = useContext(LoadingBarContext)
  return (
      <> 
        <div style={{}}>
          <div style={{}}>
            <Header/>
            <LoadingBar
            color='#f11946'
            progress = {progress}         // progress is in between 0 to 100
            height={3}
            />
          </div>
          <div style={{display : "flex"}}>
            <div style={{}}>
              <Sidebar/>
            </div>
            <main style={{}}>
              <Outlet/>
            </main>
          </div>
        </div>
      </>
  )
}

export default App
