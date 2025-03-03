import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider({children}){

    const [UserToken, setUserToken] = useState(null)

    useEffect(()=>{
        if (localStorage.getItem("UserToken")) {
            setUserToken(localStorage.getItem("UserToken"))
        }
    } , [])

    return <UserContext.Provider value={{UserToken, setUserToken}}>
                {children}
            </UserContext.Provider>

}