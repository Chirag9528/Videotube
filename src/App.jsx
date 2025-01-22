import { useContext, useState } from 'react'
import './App.css'
import {Header, Sidebar} from "./components/index.jsx"
import { Outlet } from 'react-router-dom'


function App() {
  return (
      <>
        <div style={{}}>
          <div style={{}}>
            <Header/>
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
