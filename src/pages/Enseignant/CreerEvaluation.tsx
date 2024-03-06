import InfoGenerales from "../../components/InformationGeneralesForm"
import Header from "../../Layout/Header"
import StepperComponent from "../../common/Stepper"
import AjoutRubriqueEvaluation from "./AjoutRubriqueEvaluation"
import SideBarEnseignant from "../../Layout/sideBar/SideBarEnseignant"

const CreerEvaluation = () => {
    return (
        <>
                     <SideBarEnseignant />
        <Header />
            <StepperComponent stepsCount={2}>
                <InfoGenerales />
                <AjoutRubriqueEvaluation />
            </StepperComponent>
        </>
    )
}

export default CreerEvaluation
