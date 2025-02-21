import React, { useState } from "react";
import LoadingBarContext from "./LoadingBar";

const LoadingBarContextProvider = ({children})=>{
    const [progress , setProgress] = useState(0)
    return (
        <LoadingBarContext.Provider value = {{progress , setProgress}}>
            {children}
        </LoadingBarContext.Provider>
    )
}

export default LoadingBarContextProvider;