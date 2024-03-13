import React, { useContext } from "react"
import Header from "../../Layout/Header"
import ListComponent from "../../common/List"
import { PROMOTION_ADMIN_COLUMNS } from "../../constants"
import { PromotionEnseignantContext } from "../../context/promotionContextEnseignant"
import SideBarEnseignant from "../../Layout/sideBar/SideBarEnseignant"
import { Promotion } from "../../types/EvaluationTypes"

const PromotionPage: React.FC = () => {
    const promotionContext = useContext(PromotionEnseignantContext)

    if (!promotionContext) {
        return <div>Loading...</div>
    }

    const { promotionList } = promotionContext
    const newPromotionList = promotionList.map((promotion: Promotion) => {
        return { ...promotion, detailsValue: true }
    })
    console.log("je suis liste", promotionList)
    return (
        <>
            <SideBarEnseignant />
            <Header />

            <div>
                <ListComponent
                    title={"Liste des promotions"}
                    columns={PROMOTION_ADMIN_COLUMNS}
                    data={newPromotionList}
                    actions={true}
                    details={true}
                    redirect={true}
                    url="/dashboard/enseignant/details-promotion"
                />
            </div>
        </>
    )
}

export default PromotionPage
