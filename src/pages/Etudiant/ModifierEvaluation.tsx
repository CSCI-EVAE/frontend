import { useContext, useEffect, useState } from "react"
import StepperComponent from "../../common/Stepper"
import { StepContext } from "../../context/stepperContext"

import Header from "../../Layout/Header"
import { useNavigate, useParams } from "react-router-dom"
import { EvaluationEtudiantContext } from "../../context/evaluationEtudiantContext"
import { Evaluation } from "../../types/EvaluationTypes"
import ModifierQuestionRating from "../../components/ModifierQuestionRating"
import ModifierRecapitulatifReponses from "../../components/ModifierRecapitulatifReponses"
import ModifierCommentaireEvaluation from "../../components/ModifierCommentaireEvaluation"
import ButtonComponent from "../../common/Button"
import { KeyboardBackspace } from "@mui/icons-material"

const ModifierEvaluation = () => {
    const idEvaluation = useParams().id
    const { getEvaluationDetails, evaluationDetails, getEvaluationReponse } =
        useContext(EvaluationEtudiantContext)
    const [list, setList] = useState<Evaluation>()

    useEffect(() => {
        const getEvae = async () => await getEvaluationDetails(idEvaluation)
        getEvae()
    }, [getEvaluationDetails, idEvaluation])

    useEffect(() => {
        setList(evaluationDetails)
    }, [evaluationDetails])

    useEffect(() => {
        getEvaluationReponse(idEvaluation)
    }, [idEvaluation, getEvaluationReponse])

    const { activeStep, handleComplete } = useContext(StepContext)

    const handleValidateElement = () => {
        //traitement ajout
        //
        if (activeStep !== (list?.rubriqueEvaluations?.length ?? 0) + 2) {
            handleComplete()
        } else {
            //fin du remplissage
            alert("formulaire fini")
        }
    }
    const stepItems = list
        ? list.rubriqueEvaluations.map((r, index) => (
              <ModifierQuestionRating
                  key={index}
                  rubrique={r}
                  handleSubmit={handleValidateElement}
              />
          ))
        : []
    stepItems.push(
        <ModifierCommentaireEvaluation handleSubmit={handleValidateElement} />,
        <ModifierRecapitulatifReponses
            rubrique={list ? list.rubriqueEvaluations : []}
        />
    )
    const navigate = useNavigate()
    return (
        <>
            <Header />
            <div
                style={{
                    maxWidth: "90%",
                    marginLeft: "75px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginBottom: "50px",
                }}
            >
                <ButtonComponent
                    text="Retour à  la page principale"
                    variant="contained"
                    icon={<KeyboardBackspace />}
                    onClick={() => {
                        navigate("/dashboard/etudiant")
                    }}
                />
            </div>
            <StepperComponent
                stepsCount={list ? list.rubriqueEvaluations.length + 2 : 2}
            >
                {stepItems}
            </StepperComponent>
        </>
    )
}
export default ModifierEvaluation
