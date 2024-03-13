import React, {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react"
import { Promotion, UeToDisplay } from "../types"

import { getRequest } from "../api/axios"
import { ApiResponse } from "../types"

interface PromotionEnseignantContextProps {
    children: ReactNode
}

export const PromotionEnseignantContext = createContext<any>(null)

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

        if (
            promotionTrouve &&
            promotionTrouve.codeFormation !== undefined &&
            promotionTrouve.anneeUniversitaire !== undefined
        ) {
            return [
                promotionTrouve.codeFormation,
                promotionTrouve.anneeUniversitaire,
            ]
        } else {
            return null
        }
    } else {
        return null
    }
}

export const PromotionEnseignantContextProvider: React.FC<
    PromotionEnseignantContextProps
> = ({ children }) => {
    const [promotionList, setPromotionList] = useState<Promotion[]>([])

    const [ueList, setUeList] = useState<UeToDisplay[]>([])

    const getUeList = useCallback(async (codeFormation: string) => {
        const response: ApiResponse = await getRequest(
            `enseignant/ue/promotion/${codeFormation}`
        )
        const UeList: UeToDisplay[] = response.data.data.map((ue: any) => {
            return {
                codeUe: ue.id.codeUe,
                nomEnseignant:
                    ue.noEnseignant.nom + " " + ue.noEnseignant.prenom,
                designation: ue.designation,
                nbhCm: ue.nbhCm,
                nbhTd: ue.nbhTd,
                nbhTp: ue.nbhTp,
                totaleHeures: 50,
            }
        })
        console.log(
            "🚀 ~ constUeList:UeToDisplay[]=response.data.data.map ~ UeList:",
            UeList
        )
        setUeList(UeList)
    }, [])
    const fetchPromotionList = useCallback(async () => {
        try {
            const response: ApiResponse = await getRequest(
                "/promotion/promotionsForENS"
            )
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
                const response: ApiResponse = await getRequest(
                    "/promotion/promotionsForENS"
                )

                setPromotionList(response.data.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchPromotionListA()
    }, [])

    return (
        <PromotionEnseignantContext.Provider
            value={{
                promotionList,
                ueList,
                getUeList,

                getPromotionList: fetchPromotionList,
                refreshList,
            }}
        >
            {children}
        </PromotionEnseignantContext.Provider>
    )
}
