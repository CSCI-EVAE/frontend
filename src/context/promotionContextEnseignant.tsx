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


interface PromotionEnseignantContextProps {
    children: ReactNode
}

interface PromotionEnseignantContextData {
    promotionList: Promotion[]
    getPromotionList: () => void
    refreshList: () => void
}



export const PromotionEnseignantContext = createContext<PromotionEnseignantContextData | null>(null)

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

export const PromotionEnseignantContextProvider: React.FC<PromotionEnseignantContextProps> = ({ children }) => {
    const [promotionList, setPromotionList] = useState<Promotion[]>([])
   

    const fetchPromotionList = useCallback(async () => {
        try {
            const response: ApiResponse = await getRequest("/promotion/promotionsForENS")
            setPromotionList(response.data.data)
            console.log(promotionList)
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
                const response: ApiResponse =  await getRequest("/promotion/promotionsForENS")
    
                setPromotionList(response.data.data)
            } catch (error) {
                console.error(error)
             
            }
        }
        fetchPromotionListA();
       
    }, [])

    const contextValue: PromotionEnseignantContextData = {
        promotionList,

        getPromotionList: fetchPromotionList,
        refreshList,
    }

    return (
    
        <PromotionEnseignantContext.Provider value={contextValue}>{children}</PromotionEnseignantContext.Provider>
    )
}
