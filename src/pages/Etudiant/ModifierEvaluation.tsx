import { useContext, useEffect, useState } from "react"
import StepperComponent from "../../common/Stepper"
import { StepContext } from "../../context/stepperContext"

import Header from "../../Layout/Header"
import { useNavigate, useParams } from "react-router-dom"
import {
    EvaluationEtudiantContext,
    convertToReponseEvaluation,
} from "../../context/evaluationEtudiantContext"
import { Evaluation } from "../../types/EvaluationTypes"
import ModifierQuestionRating from "../../components/ModifierQuestionRating"
import ModifierRecapitulatifReponses from "../../components/ModifierRecapitulatifReponses"
import ButtonComponent from "../../common/Button"
import { KeyboardBackspace } from "@mui/icons-material"

// Hook personnalisé pour le délai
const useDelayRender = (delay: number): boolean => {
    const [shouldRender, setShouldRender] = useState(false)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShouldRender(true)
        }, delay)

        return () => clearTimeout(timeoutId)
    }, [delay])

    return shouldRender
}

const ModifierEvaluation = () => {
    const idEvaluation = useParams().id
    const {
        getEvaluationDetails,
        evaluationDetails,
        getEvaluationReponse,
        updateReponseEvaeModifier,
        consulterReponse,
    } = useContext(EvaluationEtudiantContext)
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
    useEffect(() => {
        const reponse = convertToReponseEvaluation(
            consulterReponse ?? [],
            list?.id ?? 0
        )
        updateReponseEvaeModifier(reponse)
    }, [consulterReponse, updateReponseEvaeModifier, list?.id])

    const { activeStep, handleComplete } = useContext(StepContext)

    const handleValidateElement = () => {
        //traitement ajout
        //
        if (activeStep !== (list?.rubriqueEvaluations?.length ?? 0) + 1) {
            handleComplete()
        }
    }
    const shouldRender = useDelayRender(1000) // Délai de 3 secondes avant le rendu

    const stepItems =
        shouldRender && list
            ? list.rubriqueEvaluations.map((r, index) => (
                  <ModifierQuestionRating
                      key={index}
                      rubrique={r}
                      handleSubmit={handleValidateElement}
                  />
              ))
            : []
    if (shouldRender) {
        stepItems.push(
            <ModifierRecapitulatifReponses
                rubrique={list ? list.rubriqueEvaluations : []}
            />
        )
    }
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
                stepsCount={list ? list.rubriqueEvaluations.length + 1 : 1}
            >
                {stepItems}
            </StepperComponent>
        </>
    )
}
export default ModifierEvaluation
