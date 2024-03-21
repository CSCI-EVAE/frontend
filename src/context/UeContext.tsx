/* eslint-disable react-hooks/rules-of-hooks */
import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"
import { Promotion, UE } from "../types"

import { deleteRequest, getRequest } from "../api/axios"
import { ApiResponse } from "../types"
import { NotificationContext } from "./notificationContext"


interface UEContextProps {
    children: ReactNode
}

// interface UEContextData {
//     promotionList: Promotion[]
//     ueList: UE[]
//     getUEList: () => void
//     refreshList: () => void
//     getPromotionList : (codeFormation: string) => void
// }



export const UEContext = createContext<any>(null)

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
    const [promotionList, setPromotionList] = useState<Promotion[]>([])
   
const {showNotification} = useContext(NotificationContext)

    const fetchPromotionsPourFormation = useCallback(async (codeFormation: string) => {
        try {
            const response: ApiResponse = await getRequest(`/promotion/formationsForPromotion/${codeFormation}`);
            setPromotionList(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }, []);


    
    


    const fetchUEList = useCallback(async () => {
        try {
            const response: ApiResponse = await getRequest("/enseignant/ue")

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
                const response: ApiResponse = await getRequest("/enseignant/ue")
    
                setUeList(response.data.data)
            } catch (error) {
                console.error(error)
             
            }
        }
        fetchUEListA();
       
    }, [])

    const deleteEvae = useCallback(
        async (id: number) => {
            const response: ApiResponse = await deleteRequest(
                `/evaluation/delete/${id}`
            )

            if (response.success) {
                showNotification("Génial !", response.message, "success")
                refreshList()
                return
            } else {
                showNotification("Erreur", response.message, "error")
            }
        },
        [ showNotification, refreshList]
    )

    // const contextValue: UEContextData = {
    //     ueList,
    //     promotionList,
    //     getUEList: fetchUEList,
    //     refreshList,
    //     getPromotionList: fetchPromotionsPourFormation
    // }

    return (
    
        <UEContext.Provider value={{ueList,
            promotionList,
            getUEList: fetchUEList,
            refreshList, deleteEvae,
            getPromotionList: fetchPromotionsPourFormation}}>{children}</UEContext.Provider>
    )
}
