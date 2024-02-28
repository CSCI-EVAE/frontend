import React from "react"
import ListComponent from "../../common/List"
import { useContext } from "react"
import { Evalution_Etudiant_COLUMNS } from "../../constants/index"
import { EvaluationContext } from "../../context/evaluationEtudiantContext"
import { AjusterColonnes } from "../../context/evaluationEtudiantContext"

const EvaluationPage: React.FC = () => {
    const {
        //    updateEvaluationList,
        evaluationListe,
    } = useContext(EvaluationContext)

    const dat = AjusterColonnes(evaluationListe)
    return (
        <div>
            <div style={{ textAlign: "center", color: "red" }}></div>
            <ListComponent
                title={"Liste des evaluations"}
                columns={Evalution_Etudiant_COLUMNS}
                data={dat.reverse()}
                actions={true}
                remove={false}
                modify={false}
                details={true}
            />
        </div>
    )
}

export default EvaluationPage
