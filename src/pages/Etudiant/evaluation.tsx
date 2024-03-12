import React from "react"
import ListComponent from "../../common/List/listEtudiant"
import { useContext } from "react"
import { Evalution_Etudiant_COLUMNS, LIST_Etat_Etudiant, UE_COLUMNS_FILTER_Etudiant } from "../../constants/index"
import { EvaluationContext } from "../../context/evaluationEtudiantContext"
import { AdjustColumns } from "../../context/evaluationEtudiantContext"
import Header from "../../Layout/Header"

const EvaluationPage: React.FC = () => {
    const {
     //    updateEvaluationList,
     evaluationList
    } = useContext(EvaluationContext);
   
   //  const dat = AdjustColumns(evaluationList);
   const dat = evaluationList ? AdjustColumns(evaluationList) : [];
   const initialFilterReads: { [key: string]: boolean } = {};
   const initialFilterAnswers: { [key: string]: boolean } = {};
    
   dat.forEach(evaluation => {
       if (evaluation.etat === LIST_Etat_Etudiant.CLO.value) {
           initialFilterReads[evaluation.noEvaluation] = evaluation.readStatus;
       }
       if (evaluation.etat === LIST_Etat_Etudiant.DIS.value) {
           initialFilterAnswers[evaluation.noEvaluation] = evaluation.answerStatus;
       }
   });
   
   console.log(" Data : "+JSON.stringify(dat,null))
//    console.log("The initail eval read " + JSON.stringify(initialFilterReads, null))
//    console.log("The initail eval answer " + JSON.stringify(initialFilterAnswers, null))
   
    return (
       
     <div>
            <Header/>
          

<ListComponent
          title={"Liste des evaluations"}
          columns={Evalution_Etudiant_COLUMNS}
          data={dat}
          actions={true}
          columnsFilter={UE_COLUMNS_FILTER_Etudiant}
           filterreades={initialFilterReads} 
           filteransweres={initialFilterAnswers}               
                
                />

          

     </div>
     
 
    );
 
 }
 
 export default EvaluationPage;