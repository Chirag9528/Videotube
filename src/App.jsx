import { useContext, useState } from 'react'
import './App.css'
import {Header, Sidebar} from "./components/index.jsx"
import { Outlet } from 'react-router-dom'
import AuthContext from './components/contexts/Auth/AuthContext.js'


function App() {
  const [isOpen , setIsOpen] = useState(true)
  const {isloggedIn} = useContext(AuthContext)
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
