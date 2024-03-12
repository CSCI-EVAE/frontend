import React, {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react"
import { Promotion } from "../types"

import { getRequest } from "../api/axios"
import { ApiResponse } from "../types"


interface PromotionAdminContextProps {
    children: ReactNode
}

interface PromotionAdminContextData {
    promotionList: Promotion[]
    getPromotionList: () => void
    refreshList: () => void
}



export const PromotionAdminContext = createContext<PromotionAdminContextData | null>(null)

export function trouverIdsPromotion(
    promotion: Promotion,
    promotionListe: Promotion[]
): string[] | null {
    if (promotion && promotionListe) {
        const promotionTrouve = promotionListe.find(
            (item) => 
            item.codeFormation === promotion.codeFormation &&
            item.anneeUniversitaire === promotion.anneeUniversitaire
        )

        if (promotionTrouve && promotionTrouve.codeFormation !== undefined && promotionTrouve.anneeUniversitaire !== undefined) {
            return [promotionTrouve.codeFormation, promotionTrouve.anneeUniversitaire]
        } else {
            return null
        }
    } else {
        return null
    }
}

export const PromotionContextProvider: React.FC<PromotionAdminContextProps> = ({ children }) => {
    const [promotionList, setPromotionList] = useState<Promotion[]>([])
   

    const fetchPromotionList = useCallback(async () => {
        try {
            const response: ApiResponse = await getRequest("/promotion/promotionsForADM")
            setPromotionList(response.data.data)
        } catch (error) {
            console.error(error)
         
        }
    }, [])

  
    const refreshList = useCallback(async () => {
        try {
            setPromotionList([])
            await fetchPromotionList()
        } catch (error) {
            console.error(error)
        }
    }, [fetchPromotionList])

    useEffect(() => {
        const fetchPromotionListA = async () => {
            try {
                const response: ApiResponse = await getRequest("/promotion/promotionsForADM")
            
                setPromotionList(response.data.data)
            } catch (error) {
                console.error(error)
             
            }
        }
        fetchPromotionListA();
       
    }, [])

    const contextValue: PromotionAdminContextData = {
        promotionList,
        getPromotionList: fetchPromotionList,
        refreshList,
    }

    return (
    
        <PromotionAdminContext.Provider value={contextValue}>{children}</PromotionAdminContext.Provider>
    )
}
