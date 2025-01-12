import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = ({children})=>{
    const [isloggedIn , setIsLoggedIn] = useState(false)
    return (
        <AuthContext.Provider value = {{isloggedIn , setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;