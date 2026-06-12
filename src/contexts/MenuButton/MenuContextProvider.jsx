import React, { useEffect, useState } from "react";
import MenuContext from "./MenuContext.js";

const MenuContextProvider = ({children})=>{
    const [isOpen , setIsOpen] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 992)

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 992) {
          setIsOpen(false)
        }
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <MenuContext.Provider value = {{isOpen , setIsOpen}}>
            {children}
        </MenuContext.Provider>
    )
}

export default MenuContextProvider;
