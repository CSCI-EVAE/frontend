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


interface PromotionContextProps {
    children: ReactNode
}

interface PromotionContextData {
    promotionList: Promotion[]
    getPromotionList: () => void
    refreshList: () => void
}



export const PromotionContext = createContext<PromotionContextData | null>(null)

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

export const PromotionContextProvider: React.FC<PromotionContextProps> = ({ children }) => {
    const [promotionList, setPromotionList] = useState<Promotion[]>([])
   

    const fetchPromotionList = useCallback(async () => {
        try {
            const response: ApiResponse = await getRequest("/admin/promotion")

            setPromotionList(response.data)
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
                const response: ApiResponse = await getRequest("/admin/promotion")
    
                setPromotionList(response.data.data)
            } catch (error) {
                console.error(error)
             
            }
        }
        fetchPromotionListA();
       
    }, [])

    const contextValue: PromotionContextData = {
        promotionList,

        getPromotionList: fetchPromotionList,
        refreshList,
    }

    return (
    
        <PromotionContext.Provider value={contextValue}>{children}</PromotionContext.Provider>
    )
}
