import React from "react"
import ListComponent from "../../common/List/listEtudiant"
import { useContext } from "react"
import { Evalution_Etudiant_COLUMNS, UE_COLUMNS_FILTER_Etudiant } from "../../constants/index"
import { EvaluationContext } from "../../context/evaluationEtudiantContext"
import { AdjustColumns } from "../../context/evaluationEtudiantContext"
import Header from "../../Layout/Header"

const EvaluationPage: React.FC = () => {
    const {
     //    updateEvaluationList,
     evaluationList,
    } = useContext(EvaluationContext);
   
     const dat = AdjustColumns(evaluationList);
    return (
       
     <div>
            <Header/>
          <ListComponent
                 title={"Liste des evaluations"}
                 columns={Evalution_Etudiant_COLUMNS}
                 data={dat.reverse()}
                 actions={true}
                 remove={false}
                 modify={false}
                 details={true}
                 columnsFilter={UE_COLUMNS_FILTER_Etudiant}
                 
                
             /> 

     </div>
     
 
    );
 
 }
 
 export default EvaluationPage;
