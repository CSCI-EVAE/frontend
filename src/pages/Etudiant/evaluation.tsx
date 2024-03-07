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
   const adjustedData = dat.map(elments => 
      { 
       const readvalue = elments.etat === 'CLO' ? true : false
       const answervalue = ! readvalue
       console.log("this is the reaaad "+readvalue)
       console.log("this is the answeeer "+answervalue)
       
       return{
        ...elments,
        read : readvalue,
        answer : answervalue
       };

       
} 
     );
    return (
       
     <div>
            <Header/>
            {adjustedData.map((element, index) => (
          <ListComponent
                 title={"Liste des evaluations"}
                 columns={Evalution_Etudiant_COLUMNS}
                 data={dat.reverse()}
                 actions={true}
                 read = {element.read}
                 answer = {element.answer}
                 columnsFilter={UE_COLUMNS_FILTER_Etudiant}
                
             /> 
             ))}

     </div>
     
 
    );
 
 }
 
 export default EvaluationPage;
