import React, { useState } from "react";
import MenuContext from "./MenuContext.js";

const MenuContextProvider = ({children})=>{
    const [isOpen , setIsOpen] = useState(true)
    return (
        <MenuContext.Provider value = {{isOpen , setIsOpen}}>
            {children}
        </MenuContext.Provider>
    )
}

export default MenuContextProvider;