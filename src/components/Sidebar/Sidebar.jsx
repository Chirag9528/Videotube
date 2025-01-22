import React, { useContext, useState } from 'react'
import {AnimatePresence, motion} from 'framer-motion';
import { AiFillHome } from "react-icons/ai";
import { FaBars, FaHistory } from "react-icons/fa";
import { CgPlayList } from "react-icons/cg";
import { AiFillLike } from "react-icons/ai";
import { MdSubscriptions } from "react-icons/md";

import { NavLink } from 'react-router-dom';
import MenuContext from '../contexts/MenuButton/MenuContext';

const routes = [
    {
        path : "/",
        name :  "Home",
        icon : <AiFillHome/>
    },
    {
        path : "/history",
        name : "History",
        icon : <FaHistory/>
    },
    {
        path : "/playlists",
        name : "Playlists",
        icon : <CgPlayList/>
    },
    {
        path : "/liked-videos",
        name : "Liked Videos",
        icon : <AiFillLike/>
    },
    {
        path : "/subscriptions",
        name : "Subscriptions",
        icon : <MdSubscriptions/>
    }
]

function Sidebar(props) {
    const {isOpen} = useContext(MenuContext)
  return (
    <div style={{}}>
        <motion.div animate={{
            width:isOpen ? "200px" : "50px",
            height : "89vh",
            transition: {
                duration: 0.5,
                type: "spring",
                damping: 10,
              },
        }} className="sidebar">
            <section className="routes">
                {
                    routes.map((route)=>{
                        return <NavLink  to={route.path} key = {route.name} className="link">
                            <div className="icon">{route.icon}</div>
                            <AnimatePresence>
                                {isOpen && <motion.div className="link_text">{route.name}</motion.div>}
                            </AnimatePresence>
                        </NavLink>
                    })
                }
            </section>
        </motion.div>
    </div>
  )
}

export default Sidebar
