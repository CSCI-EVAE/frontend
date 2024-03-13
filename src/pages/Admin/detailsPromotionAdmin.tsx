import { useContext, useEffect } from "react"
import { Promotion } from "../../types"
import { ListContext } from "../../context/listContext"
import DetailsPromotionComponent from "../../components/detailsPromotionComponent"
import UeListComponent from "../../components/UeListComponent"
import { PromotionAdminContext } from "../../context/promotionContextAdmin"
import Header from "../../Layout/Header"

const DetailsPromotionAdmin = () => {
    const { getUeList, ueList } = useContext(PromotionAdminContext)

    const { selectedRow } = useContext(ListContext)
    const promotion: Promotion = selectedRow
    useEffect(() => {
        getUeList(promotion.codeFormation)
    }, [getUeList, promotion.codeFormation])

    return (
        <>
            <Header />
            <DetailsPromotionComponent
                promotion={promotion}
                urlRetour="/dashboard/promotions"
            />

            <UeListComponent ue={ueList} />
        </>
    )
}

export default DetailsPromotionAdmin
