import React, { useContext } from "react"
import ListComponent from "../../common/List"
import { UEContext, trouverIdEvaluation } from "../../context/UeContext"
import { UE_COLUMNS, UE_COLUMNS_FILTER } from "../../constants"
import { UE } from "../../types"
import { DetailsEvaluationContext } from "../../context/detailsEvaluationContext"
import { useNavigate } from "react-router-dom"
import { SoumettreEvaluationContext } from "../../context/soumettreEvaluationContext"
import Header from "../../Layout/Header"
import SideBarEnseignant from "../../Layout/sideBar/SideBarEnseignant"
import { FormControl, InputLabel, Select, SelectChangeEvent } from "@mui/material"

const UePage: React.FC = () => {
    const navigate = useNavigate()

    const ueContext = useContext(UEContext)
    const evaContext = useContext(DetailsEvaluationContext)
    const soumettre = useContext(SoumettreEvaluationContext)

    if (!ueContext) {
        return <div>Loading...</div>
    }

    const { ueList } = ueContext

    function extractNeededInfo(ue: UE) {
        let extractedInfo: any = {
            nomFormation: ue.nomFormation,
            anneePro: ue.anneeUniversitaire,
            codeEC: ue.codeEc,
            codeUE: ue.codeUe,
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


    /*const handleChangeSelect = (event: SelectChangeEvent) => {
        const newValue = event.target.value;
        setEtats(newValue);
        console.log("This is etat " + newValue);
        setFilters({...filters, etat: newValue});
      };*/

    const handleDetails = (rowData: UE) => {
        const id_eva = trouverIdEvaluation(rowData, ueList)

        if (id_eva) {
            evaContext?.fetchEvaluationDetails(id_eva)

            const selectedUe = ueList.find((ue) => ue.evaluationId === id_eva)

            if (selectedUe) {
                const rowDataInfo = extractNeededInfo(selectedUe)

                navigate(`evaluation-details/${id_eva}`, {
                    state: { rowDataInfo },
                })
            }
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

    const myData = ueList.map(extractNeededInfo)
    console.log(myData)

    return (
        <div>
             <SideBarEnseignant />
        <Header />

        {/* <FormControl style={{ width: '250px' }}>
                <InputLabel id="etat">Etat</InputLabel>
  <Select
    labelId="etat"
    id="etat"
   
    label="Etat"
    onChange={handleChangeSelect}
    value={etats}
  >
     
    <MenuItem value={LIST_Etat.ELA.value}>{LIST_Etat.ELA.label}</MenuItem>
    <MenuItem value={LIST_Etat.CLO.value}>{LIST_Etat.CLO.label}</MenuItem>
    <MenuItem value={LIST_Etat.DIS.value}>{LIST_Etat.DIS.label}</MenuItem>
  </Select> */}
  

            <h1>{myData.some((item) => item.detailsValue)}</h1>
        
            <ListComponent
                title={"Liste des Unités d'enseignements"}
                columns={UE_COLUMNS}
                actions={true}
                remove={false}
                modify={false}
                create={true}
                addElement={false}
                soumettre={true}
                detailsHandler={handleDetails}
                createHandler={handleCreate}
                soumettreHandler={handleSoumettre}
                details={true}
                data={myData}
                columnsFilter={UE_COLUMNS_FILTER}
            />
        </div>
    )
}

export default UePage
