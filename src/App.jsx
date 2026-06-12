import { useContext } from 'react'
import './App.css'
import {Header, Sidebar} from "./components/index.jsx"
import { Outlet } from 'react-router-dom'
import LoadingBar from "react-top-loading-bar"
import {LoadingBarContext} from './contexts/index.jsx'

function App(){
  const {progress} = useContext(LoadingBarContext)
  return (
      <div className="app-layout">
        <div>
          <Header/>
          <LoadingBar
            color='#f11946'
            progress={progress}
            height={3}
          />
        </div>
        <div className="app-body">
          <Sidebar/>
          <main className="main-content">
            <Outlet/>
          </main>
        </div>
      </div>
  )
}

export default App
