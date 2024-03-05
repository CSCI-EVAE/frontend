/* eslint-disable react-hooks/rules-of-hooks */
import React, {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react"
import { UE } from "../types"

import { getRequest } from "../api/axios"
import { ApiResponse } from "../types"


interface UEContextProps {
    children: ReactNode
}

interface UEContextData {
    ueList: UE[]
    getUEList: () => void
    refreshList: () => void
}



export const UEContext = createContext<UEContextData | null>(null)

export function trouverIdEvaluation(
    evaluation: UE,
    evaluationListe: UE[]
): number | null {
    if (evaluation && evaluationListe) {
        const evaluationTrouve = evaluationListe.find(
            (item) => item.evaluationId
        )

        if (evaluationTrouve && evaluationTrouve.evaluationId !== undefined) {
            return evaluationTrouve.evaluationId
        } else {
            return null
        }
    } else {
        return null
    }
}

export const UEContextProvider: React.FC<UEContextProps> = ({ children }) => {
    const [ueList, setUeList] = useState<UE[]>([])
   

    const fetchUEList = useCallback(async () => {
        try {
            const response: ApiResponse = await getRequest("/enseignant/ue/all")

            setUeList(response.data.data)
        } catch (error) {
            console.error(error)
         
        }
    }, [])

  
    const refreshList = useCallback(async () => {
        try {
            setUeList([])
            await fetchUEList()
        } catch (error) {
            console.error(error)
        }
    }, [fetchUEList])

    useEffect(() => {
        const fetchUEListA = async () => {
            try {
                const response: ApiResponse = await getRequest("/enseignant/ue/all")
    
                setUeList(response.data.data)
            } catch (error) {
                console.error(error)
             
            }
        }
        fetchUEListA();
       
    }, [])

    const contextValue: UEContextData = {
        ueList,

        getUEList: fetchUEList,
        refreshList,
    }

    return (
    
        <UEContext.Provider value={contextValue}>{children}</UEContext.Provider>
    )
}
