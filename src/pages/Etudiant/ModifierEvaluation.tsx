import { useContext, useEffect, useState } from "react"
import StepperComponent from "../../common/Stepper"
import { StepContext } from "../../context/stepperContext"
import {
    ReponseEvaluation as ReponseEvaluationType,
    reponseQuestions,
} from "../../types"
import Header from "../../Layout/Header"
import { useParams } from "react-router-dom"
import { EvaluationEtudiantContext } from "../../context/evaluationEtudiantContext"
import {
    Evaluation,
    QuestionEvaluation,
    RubriqueEvaluation,
} from "../../types/EvaluationTypes"
import ModifierQuestionRating from "../../components/ModifierQuestionRating"
import ModifierRecapitulatifReponses from "../../components/ModifierRecapitulatifReponses"
import ModifierCommentaireEvaluation from "../../components/ModifierCommentaireEvaluation"

const transformQuestionToReponseQuestion = (
    question: QuestionEvaluation
): reponseQuestions => {
    return {
        id: question.id,
        idQuestionEvaluation: {
            id: question.id,
            intitule: question.intitule || "",
            idQualificatif: question.idQuestion.idQualificatif,
        },
        positionnement: Number(question.positionnement),
    }
}
const transformQuestionsToReponseQuestions = (
    questions: QuestionEvaluation[]
): reponseQuestions[] => {
    return questions.map(transformQuestionToReponseQuestion)
}
const ModifierEvaluation = () => {
    const idEvaluation = useParams().id
    const {
        getEvaluationDetails,
        evaluationDetails,
        getEvaluationReponse,
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

    const [oldReponse, setOldReponse] =
        useState<RubriqueEvaluation[]>(consulterReponse)
    useEffect(() => {
        setOldReponse(consulterReponse)
    }, [consulterReponse])

    const { activeStep, handleComplete } = useContext(StepContext)

    const def: reponseQuestions[] = oldReponse
        .map((reponse) => {
            if (reponse.questionEvaluations) {
                // Transformez les questionEvaluations en reponseQuestions
                return transformQuestionsToReponseQuestions(
                    reponse.questionEvaluations
                )
            } else {
                // Si questionEvaluations est null ou undefined, retournez un tableau vide
                return []
            }
        })
        .flat()

    const [reponse, setReponse] = useState<ReponseEvaluationType>({
        commentaire: "",
        idEvaluation: Number(idEvaluation),
        nom: "",
        prenom: "",
        reponseQuestions: def,
    })
    useEffect(() => {
        //  console.log("repokjkjkjkjkkj", reponse)
        localStorage.setItem(
            "modifierEvaluation",
            JSON.stringify({
                commentaire: reponse.commentaire,
                idEvaluation: {
                    id: Number(idEvaluation),
                },
                nom: reponse.nom,
                prenom: reponse.prenom,
                reponseQuestions: def,
            })
        )
    }, [reponse, oldReponse, def, idEvaluation])

    localStorage.setItem(
        "modifierEvaluation",
        JSON.stringify({
            commentaire: reponse.commentaire,
            idEvaluation: {
                id: Number(idEvaluation),
            },
            nom: reponse.nom,
            prenom: reponse.prenom,
            reponseQuestions: def,
        })
    )
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
            localStorage.setItem("modifierEvaluation", JSON.stringify(reponse))
        } else {
            console.log("🚀 ~ ReponseEvaluation ~ reponseNESKLJDLJKL:", reponse)
            //fin du remplissage
            alert("formulaire fini")
        }
    }
    const stepItems = list
        ? list.rubriqueEvaluations.map((r, index) => (
              <ModifierQuestionRating
                  handleAddChoice={handleAddChoice}
                  key={index}
                  rubrique={r}
                  handleSubmit={handleValidateElement}
              />
          ))
        : []
    stepItems.push(
        <ModifierCommentaireEvaluation
            handleNomPrenomCommentaire={handleNomPrenomCommentaire}
            handleSubmit={handleValidateElement}
        />,
        <ModifierRecapitulatifReponses
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
export default ModifierEvaluation
