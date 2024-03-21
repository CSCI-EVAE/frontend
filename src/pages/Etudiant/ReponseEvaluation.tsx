import { useContext, useEffect, useState } from "react"
import QuestionRating from "../../components/QuestionRating"
import StepperComponent from "../../common/Stepper"
import { StepContext } from "../../context/stepperContext"
import RecapitulatifReponses from "../../components/RecapitulatifReponses"
import Header from "../../Layout/Header"
import { useNavigate, useParams } from "react-router-dom"
import {
    EvaluationEtudiantContext,
    convertToReponseEvaluation,
} from "../../context/evaluationEtudiantContext"
import { Evaluation } from "../../types/EvaluationTypes"
import ButtonComponent from "../../common/Button"
import { KeyboardBackspace } from "@mui/icons-material"

const ReponseEvaluation = () => {
    const idEvaluation = useParams().id
    const {
        getEvaluationDetails,
        evaluationDetails,
        updateReponseEvaluationByReponse,
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
        const reponse = convertToReponseEvaluation(
            list?.rubriqueEvaluations ?? [],
            list?.id ?? 0
        )
        console.log("🚀 ~ ReponseEvaluation ~ reponse:", reponse)
        updateReponseEvaluationByReponse(reponse)
    }, [list?.id, list?.rubriqueEvaluations, updateReponseEvaluationByReponse])

    const { activeStep, handleComplete } = useContext(StepContext)

    const handleValidateElement = () => {
        //traitement ajout
        //
        if (activeStep !== (list?.rubriqueEvaluations?.length ?? 0) + 1) {
            handleComplete()
        } else {
            //fin du remplissage
            alert("formulaire fini")
        }
    }
    const stepItems = list
        ? list.rubriqueEvaluations.map((r, index) => (
              <QuestionRating
                  key={index}
                  rubrique={r}
                  handleSubmit={handleValidateElement}
              />
          ))
        : []
    stepItems.push(
        <RecapitulatifReponses
            key={"200"}
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
                stepsCount={list ? list.rubriqueEvaluations.length + 1 : 1}
            >
                {stepItems}
            </StepperComponent>
        </>
    )
}
export default ReponseEvaluation
