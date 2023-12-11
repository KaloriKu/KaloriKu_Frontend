"use client"
import ChildrenProps from "@/common/types/ChildrenProps";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useUserContext } from "../auth/UserContext";
import SetUp from "@/app/setup/page";

interface SetupData{
    isLoadingSetup: boolean
    initialized: boolean
}

export const SetupContext = createContext<SetupData>({} as SetupData)

export const useSetupContext = ()=>useContext(SetupContext)

export const SetupContextProvider:React.FC<ChildrenProps> = ({children}) => {
    const {user} = useUserContext()
    const [isLoadingSetup, setIsLoadingSetup] = useState(false)
    const [initialized, setInitialized] = useState(true)


    useEffect(()=>{
        setIsLoadingSetup(true)
        if (initialized){
            if (user?.umur === null || user?.gender === null ||
                user?.berat_badan === null || user?.tinggi_badan === null){
                   setInitialized(false)  
                }
            else{
                setInitialized(true)
            }
            setIsLoadingSetup(false)
        }
    },[user])

    if (isLoadingSetup){
        return (
            <>
                <main></main>
            </>
        )
    }
    else if (!initialized){
        return (
            <>
                <SetUp/>
            </>
        )
    }
    return (
        <SetupContext.Provider value={{initialized, isLoadingSetup}}>
            {children}
        </SetupContext.Provider>
    )
}
