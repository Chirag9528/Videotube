import React, { useContext } from 'react'
import {AnimatePresence, motion} from 'framer-motion';
import { AiFillHome } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { CgPlayList } from "react-icons/cg";
import { AiFillLike } from "react-icons/ai";
import { MdSubscriptions } from "react-icons/md";

import { NavLink } from 'react-router-dom';
import MenuContext from '../../contexts/MenuButton/MenuContext';

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

function Sidebar() {
    const {isOpen, setIsOpen} = useContext(MenuContext)
  return (
    <>
        {isOpen && (
          <div
            className="sidebar-overlay d-lg-none"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
        <motion.div
          animate={{
            width: isOpen ? "200px" : "50px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className="sidebar"
          style={{ zIndex: isOpen ? 1050 : 1 }}
        >
            <section className="routes">
                {
                    routes.map((route)=>{
                        return <NavLink to={route.path} key={route.name} className="link">
                            <div className="icon">{route.icon}</div>
                            <AnimatePresence>
                                {isOpen && <motion.div className="link_text">{route.name}</motion.div>}
                            </AnimatePresence>
                        </NavLink>
                    })
                }
            </section>
        </motion.div>
    </>
  )
}

export default Sidebar
