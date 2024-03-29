import React, { useContext, useEffect, useState } from "react"
import ListComponent from "../../common/List/list"
import { UE_COLUMNS_LISTEtudiant } from "../../constants/index"
import { EtudiantDTO } from "../../types"
import {
    EtudiantListContext,
    trouverIdEtudiant,
} from "../../context/etudiantListContext"
import { useNavigate, useParams } from "react-router-dom"

type PromotionProps = {
    etudiantList: any[]
    nombrePromotion : number,
    nombreEtudiant: number
}

const EtudiantListPage: React.FC<PromotionProps> = ({
    etudiantList, nombreEtudiant, nombrePromotion
}: PromotionProps) => {
    const { removeEtudiant } = useContext(EtudiantListContext)

    const { codeFormation, anneeUniversitaire } = useParams<{
        codeFormation: string
        anneeUniversitaire: string
    }>()

    const handleDelete = (rowData: any) => {
        const no_EtudiantSupp = trouverIdEtudiant(rowData, etudiantList)
        removeEtudiant(no_EtudiantSupp, anneeUniversitaire, codeFormation)
    }

    const griser = nombreEtudiant>= nombrePromotion

    
   

    const navigate = useNavigate()

    const handleEdit = (rowData: any) => {
        navigate(
            `/dashboard/details-promotion/${codeFormation}/${anneeUniversitaire}/modifier-etudiant/${rowData.noEtudiant}`
        )
    }


    const handleDetails = (rowData: any) => {
        navigate(
            `/dashboard/details-promotion/${codeFormation}/${anneeUniversitaire}/details-etudiant/${rowData.noEtudiant}`
        )
    }
    const [data, setData] = useState<EtudiantDTO[]>([])

    useEffect(() => {
        if (etudiantList && Array.isArray(etudiantList)) {
            setData([...etudiantList].reverse())
        } else {
            setData([])
        }
    }, [etudiantList])

    return (
        <div>
            <ListComponent
                title={""}
                columns={UE_COLUMNS_LISTEtudiant}
                data={data}
                actions={true}
                remove={true}
                deleteHandler={handleDelete}
                modify={true}
                filter={true}
                noBoutonRetour={true}
                redirectEdit={true}
                modifyHandler={handleEdit}
                urlAdd={`/dashboard/details-promotion/${codeFormation}/${anneeUniversitaire}/creer-etudiant`}
                redirectAdd={true}
                detailsHandler={handleDetails}
                details={true}
                griser={griser}
               
            />
        </div>
    )
}

export default EtudiantListPage
