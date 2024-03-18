import { useContext, useEffect, useState } from "react"
import QuestionRating from "../../components/QuestionRating"
import StepperComponent from "../../common/Stepper"
import { StepContext } from "../../context/stepperContext"
import { ReponseEvaluation as ReponseEvaluationType } from "../../types"
import RecapitulatifReponses from "../../components/RecapitulatifReponses"
import Header from "../../Layout/Header"
import { useParams } from "react-router-dom"
import { EvaluationEtudiantContext } from "../../context/evaluationEtudiantContext"
import { Evaluation } from "../../types/EvaluationTypes"
import CommentaireEvalution from "../../components/CommentaireEvaluation"

const ReponseEvaluation = () => {
    const idEvaluation = useParams().id
    const { getEvaluationDetails, evaluationDetails } = useContext(
        EvaluationEtudiantContext
    )
    const [list, setList] = useState<Evaluation>()

    useEffect(() => {
        const getEvae = async () => await getEvaluationDetails(idEvaluation)
        getEvae()
    }, [getEvaluationDetails, idEvaluation])
    useEffect(() => {
        setList(evaluationDetails)
    }, [evaluationDetails])

    const { activeStep, handleComplete } = useContext(StepContext)

    const [reponse, setReponse] = useState<ReponseEvaluationType>({
        commentaire: "",
        idEvaluation: Number(idEvaluation),
        nom: "",
        prenom: "",
        reponseQuestions: [],
    })
    const handleAddChoice = (idQuestion: number, positionnement: number) => {
        setReponse({
            ...reponse,
            reponseQuestions: [
                ...reponse.reponseQuestions,
                {
                    idQuestionEvaluation: {
                        id: idQuestion,
                    },
                    positionnement: positionnement,
                },
            ],
        })
    }
    const handleNomPrenomCommentaire = (
        nom: string,
        prenom: string,
        commentaire: string
    ) => {
        setReponse({
            ...reponse,
            commentaire: commentaire,
            nom: nom,
            prenom: prenom,
        })
    }

    const handleValidateElement = () => {
        //traitement ajout
        //
        if (activeStep !== (list?.rubriqueEvaluations?.length ?? 0) + 2) {
            handleComplete()
            localStorage.setItem("reponseEvaluation", JSON.stringify(reponse))
        } else {
            console.log("🚀 ~ ReponseEvaluation ~ reponseNESKLJDLJKL:", reponse)
            //fin du remplissage
            alert("formulaire fini")
        }
    }
    const stepItems = list
        ? list.rubriqueEvaluations.map((r, index) => (
              <QuestionRating
                  handleAddChoice={handleAddChoice}
                  key={index}
                  rubrique={r}
                  handleSubmit={handleValidateElement}
              />
          ))
        : []
    stepItems.push(
        <CommentaireEvalution
            handleNomPrenomCommentaire={handleNomPrenomCommentaire}
            handleSubmit={handleValidateElement}
        />,
        <RecapitulatifReponses
            rubrique={list ? list.rubriqueEvaluations : []}
        />
    )
    return (
        <>
            <Header />
            <StepperComponent
                stepsCount={list ? list.rubriqueEvaluations.length + 2 : 2}
            >
                {stepItems}
            </StepperComponent>
        </>
    )
}
export default ReponseEvaluation
