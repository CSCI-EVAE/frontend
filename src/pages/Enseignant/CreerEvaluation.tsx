import InfoGenerales from "../../components/InformationGeneralesForm";
import Header from "../../components/Layout/Header";
import StepperComponent from "../../components/common/Stepper";
import AjoutRubriqueEvaluation from "./AjoutRubriqueEvaluation";

const CreerEvaluation = ()=> {
    return (
        <>
        <Header />
        <StepperComponent stepsCount={2}> 
        <InfoGenerales/>
        <AjoutRubriqueEvaluation/>
        </StepperComponent>
        
        </>
    )
}

export default CreerEvaluation;