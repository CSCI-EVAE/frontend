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


 
    const [ueList, setUeList] = useState<UE[]>([]);


    useEffect(() => {
        if (ueContext) {
            setUeList(ueContext.ueList);
        }
    }, [ueContext]);



   


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
        }

       

        if (ue.evaluationId) {
            extractedInfo = {
                ...extractedInfo,
                etat: ue.etat,
                designation: ue.designation,
                debutReponse: ue.debutReponse,
                finReponse: ue.finReponse,
                idEvaluation: ue.evaluationId,
                detailsValue: true,
                createValue: false,
                soumettreValue: false,
            }

            if (ue.etat === "ELA") {
                extractedInfo = {
                    ...extractedInfo,
                    soumettreValue: true,
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

        console.log("jjjjjjj", selectedUe)
          
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

        console.log("jjjjjjj", selectedUe)

        if (selectedUe) {
            const rowDataInfo = extractNeededInfo(selectedUe)

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

        console.log("eee",ueList)
        const myData = ueList.map(extractNeededInfo)
    

    

    

function extractNomFormation(item: { nomFormation: any }) {
    return item.nomFormation;
}

const formation = ueList.map(extractNomFormation)
console.log("formation", formation)


  
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
            />
        </div>
    )
}

export default UePage
