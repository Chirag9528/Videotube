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
        <div style={{}}>
          <div style={{}}>
            <Header togglefxn = {toggle}/>
          </div>
          <div style={{display : "flex" }}>
            <div style={{}}>
              <Sidebar isOpen = {isOpen} togglefxn = {toggle}/>
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
