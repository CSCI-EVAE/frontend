import InfoGenerales from "../../components/InformationGeneralesForm";
import StepperComponent from "../../components/common/Stepper";
import AjoutRubriqueEvaluation from "./AjoutRubriqueEvaluation";

const CreerEvaluation = ()=> {
    return (
        <>
        <StepperComponent stepsCount={2}> 
        <InfoGenerales/>
        <AjoutRubriqueEvaluation/>
        </StepperComponent>
        
        </>
    )
}

export default CreerEvaluation;