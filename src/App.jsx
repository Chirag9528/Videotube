import { useState } from 'react'
import './App.css'
import {Header, Sidebar} from "./components/index.jsx"
import { Outlet } from 'react-router-dom'

function App() {
  const [isOpen , setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)
  return (
    <>
      <Header togglefxn = {toggle}/>
      <div style={{display:"flex"}}>
        <Sidebar isOpen = {isOpen} togglefxn = {toggle}/>
        <main>
          <Outlet/>
        </main>
      </div>
    
    </>
  )
}

export default App
