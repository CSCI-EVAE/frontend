import React, { useContext, useEffect, useState } from "react"
import ListComponent from "../../common/List"
import { UEContext } from "../../context/UeContext"
import { UE_COLUMNS, UE_COLUMNS_FILTER } from "../../constants"
import { UE } from "../../types"
import { useNavigate } from "react-router-dom"
import { SoumettreEvaluationContext } from "../../context/soumettreEvaluationContext"
import Header from "../../Layout/Header"
import SideBarEnseignant from "../../Layout/sideBar/SideBarEnseignant"

const UePage: React.FC = () => {
    const navigate = useNavigate()

    const ueContext = useContext(UEContext)
    const soumettre = useContext(SoumettreEvaluationContext)

    const [ueList, setUeList] = useState<UE[]>([])

    useEffect(() => {
        if (ueContext) {
            setUeList(ueContext.ueList)
        }
    }, [ueContext])

    function extractNeededInfo(ue: UE) {
        let extractedInfo: any = {
            nomFormation: ue.nomFormation,
            codeFormation: ue.codeFormation,
            codeEC: ue.codeEc,
            codeUE: ue.codeUe,
            nbhCM: ue.nbhCm,
            nbhTP: ue.nbhTp,
            nbhTD: ue.nbhTd,
            totaleHeures: ue.totaleHeures,
            etat: "",
            designation: "",
            idEvaluation: "",
            debutReponse: null,
            finReponse: null,
            detailsValue: false,
            createValue: true,
            soumettreValue: false,
            statistiques: false,
            delete : false
        }

        var newEtat = "En cours d'élaboration"
        if (ue.etat === "ELA") {
            newEtat = "En cours d'élaboration"
        }
        if (ue.etat === "DIS") {
            newEtat = "Mise en disposition"
        }
        if (ue.etat === "CLO") {
            newEtat = "Cloturé"
        }

        if (ue.evaluationId) {
            extractedInfo = {
                ...extractedInfo,
                //idEvaluation: ue.evaluationId,
                etat: newEtat,
                designation: ue.designation,
                debutReponse: ue.debutReponse,
                finReponse: ue.finReponse,
                idEvaluation: ue.evaluationId,
                detailsValue: true,
                createValue: false,
                soumettreValue: false,
                statistiques: false,
                delete : false
            }

            if (ue.etat === "ELA") {
                extractedInfo = {
                    ...extractedInfo,
                    soumettreValue: true,
                    statistiques: false,
                    delete : true
                }
            }
            if (ue.etat === "CLO") {
                extractedInfo = {
                    ...extractedInfo,
                    statistiques: true,
                    delete : false
                }
            }
        }

        return extractedInfo
    }

    const handleDetails = (rowData: any) => {
        const selectedUe = ueList.find(
            (ue) =>
                ue.nomFormation === rowData.nomFormation &&
                ue.codeUe === rowData.codeUE &&
                ue.codeEc === rowData.codeEC
        )

        if (selectedUe) {
            const rowDataInfo = extractNeededInfo(selectedUe)

            navigate(`evaluation-details/${selectedUe.evaluationId}`, {
                state: { rowDataInfo },
            })
        }
    }

    const handleCreate = (rowData: any) => {
        const selectedUe = ueList.find(
            (ue) =>
                ue.nomFormation === rowData.nomFormation &&
                ue.codeUe === rowData.codeUE &&
                ue.codeEc === rowData.codeEC
        )


        if (selectedUe) {
            const rowDataInfo = extractNeededInfo(selectedUe)
            const rowDataInfoString = JSON.stringify(rowDataInfo)
            localStorage.setItem("state", rowDataInfoString)
            navigate(`creation-evaluation`, { state: { rowDataInfo } })
        }
    }

    const handleSoumettre = async (rowData: any) => {
        try {
            const evaluationId = rowData.idEvaluation
            const response = await soumettre?.soumettreEvaluation(evaluationId)

            if (response) {
                await ueContext?.refreshList()

                console.log("Soumettre Response:", response)
            } else {
                console.error("Soumettre evaluation failed")
            }
        } catch (error) {
            console.error("Soumettre evaluation error:", error)
        }
    }

    console.log("eee", ueList)
    const myData = ueList.map(extractNeededInfo)

    function extractNomFormation(item: { nomFormation: any }) {
        return item.nomFormation
    }

    const formation = ueList.map(extractNomFormation)
const handleDelete  = (row : any) => {
    console.log("id ", row.idEvaluation)
    ueContext.deleteEvae(row.idEvaluation)
}
    return (
        <div>
            <SideBarEnseignant />
            <Header />

            <h1>{myData.some((item) => item.detailsValue)}</h1>

            <ListComponent
                title={"Liste des Unités d'enseignements"}
                columns={UE_COLUMNS}
                actions={true}
                remove={false}
                modify={false}
                create={true}
                indice={formation}
                addElement={false}
                soumettre={true}
                detailsHandler={handleDetails}
                createHandler={handleCreate}
                soumettreHandler={handleSoumettre}
                details={true}
                data={myData}
                columnsFilter={UE_COLUMNS_FILTER}
                afficherEtat={true}
                supprimerHandler={handleDelete}
            />
        </div>
    )
}

export default UePage
