import { useContext, useEffect } from "react"
import { Promotion } from "../../types"
import DetailsPromotionComponent from "../../components/detailsPromotionComponent"
import UeListComponent from "../../components/UeListComponent"
import { PromotionAdminContext } from "../../context/promotionContextAdmin"
import Header from "../../Layout/Header"
import EtudiantListPage from "./etudiantList"
import { EtudiantListContext } from "../../context/etudiantListContext"
import { useParams } from "react-router-dom"

const DetailsPromotionAdmin = () => {
    const { getUeList, ueList } = useContext(PromotionAdminContext)
const codeFormation  = useParams().codeFormation
const anneeUniversitaire = useParams().anneeUniversitaire
    // const { selectedRow } = useContext(ListContext)
    const promotionStorage = localStorage.getItem("promotion")
     const promotion: Promotion = JSON.parse(promotionStorage || "0")
    useEffect(() => {
        getUeList(codeFormation)
    }, [getUeList,codeFormation])
    
     const {getList,etudiantList} = useContext(EtudiantListContext)

     useEffect(() => {
        getList(anneeUniversitaire, codeFormation);

    }, [getList,anneeUniversitaire,codeFormation]);
    

    return (
        <>
            <Header />
            <DetailsPromotionComponent
                promotion={promotion}
                urlRetour="/dashboard/promotions"
            />
            <UeListComponent ue={ueList} />
            <EtudiantListPage etudiantList={etudiantList}  />

            </>
    )
}

export default DetailsPromotionAdmin
