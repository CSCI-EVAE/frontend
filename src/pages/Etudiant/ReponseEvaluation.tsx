import { useContext } from "react";
import QuestionRating from "../../components/QuestionRating"
import StepperComponent from "../../components/common/Stepper"
import { StepContext } from "../../context/stepperContext";
import { RubriqueCompose } from "../../types/rubriquesComposeTypes ";

const rubriques: RubriqueCompose[] = [
    {
        idRubrique: 1,
        designation: "Rubrique 1",
        ordre: 1,
        questions: [
            {
                idQuestion: 1,
                intitule: "Question 1",
                ordre: 1,
                idQualificatif: 1,
                minimal: "Pas du tout",
                maximal: "Extrêmement"
            },
            {
                idQuestion: 2,
                intitule: "Question 2",
                ordre: 2,
                idQualificatif: 2,
                minimal: "Très mauvais",
                maximal: "Excellent"
            }
        ]
    },
    {
        idRubrique: 2,
        designation: "Rubrique 2",
        ordre: 2,
        questions: [
            {
                idQuestion: 3,
                intitule: "Question 3",
                ordre: 1,
                idQualificatif: 3,
                minimal: "Pas du tout",
                maximal: "Extrêmement"
            },
            {
                idQuestion: 4,
                intitule: "Question 4",
                ordre: 2,
                idQualificatif: 4,
                minimal: "Très mauvais",
                maximal: "Excellent"
            }
        ]
    }
];

const ReponseEvaluation = () => {
    const {activeStep,  handleComplete}= useContext(StepContext);
        const handleValidateElement=(rubrique : RubriqueCompose, ratings : any[])=>{
            //traitement ajout
            //
            if(activeStep!== rubriques.length-1){
                handleComplete();
            }else{
                //fin du remplissage
                alert('formulaire fini');
            }
        }
    return (
        <>
        <StepperComponent stepsCount={rubriques.length}>
           
            {rubriques.map((r , index)=> (
                <QuestionRating key={index} rubrique={r} handleSubmit={handleValidateElement}/>
            ))}
                                         
                                          
     </StepperComponent> 
        
        </>
    )
}
export default ReponseEvaluation;