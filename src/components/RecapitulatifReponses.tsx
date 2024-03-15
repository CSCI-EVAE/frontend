import { Chip, Divider, Paper, Typography } from "@mui/material"
import { FC, useContext, useEffect, useState } from "react"
import ButtonComponent from "../common/Button"
import { StepContext } from "../context/stepperContext"
import { RubriqueEvaluation } from "../types/EvaluationTypes"
import { ReponseEvaluation } from "../types"
import { EvaluationEtudiantContext } from "../context/evaluationEtudiantContext"
import { useNavigate } from "react-router-dom"

interface ReponseProps {
    rubrique: RubriqueEvaluation[]
}
const RecapitulatifReponses: FC<ReponseProps> = ({ rubrique }) => {
    const navigate = useNavigate()
    const { handleReset } = useContext(StepContext)
    const handleModifier = () => {
        handleReset()
    }
    const { soumettreReponseEtudiant } = useContext(EvaluationEtudiantContext)
    const [reponse, setReponse] = useState<ReponseEvaluation>({
        idEvaluation: {
            id: 0,
        },
        commentaire: "",
        nom: "",
        prenom: "",
        reponseQuestions: [],
    })

    useEffect(() => {
        const rep = localStorage.getItem("reponseEvaluation")

        if (rep) setReponse(JSON.parse(rep))
    }, [])
    const trouverPositionnementParId = (
        reponse: ReponseEvaluation,
        id: number
    ): number => {
        const reponseQuestion = reponse.reponseQuestions.find(
            (question) => question.idQuestionEvaluation.id === id
        )
        if (!reponseQuestion) return 0
        return reponseQuestion.positionnement
    }
    const handleReponse = async () => {
        console.log("eee", reponse)
        await soumettreReponseEtudiant(reponse)
        navigate("/dashboard/etudiant")
    }
    return (
        <div>
            <Typography
                style={{ margin: "32px", textAlign: "center" }}
                variant="h5"
                gutterBottom
            >
                Recapitulatif des réponses
            </Typography>
            <Paper elevation={0}>
                {rubrique.map((rub, index) => (
                    <div key={index}>
                        <Typography
                            style={{ margin: "32px", textAlign: "center" }}
                            variant="h5"
                            gutterBottom
                        >
                            {rub.idRubrique.designation}
                        </Typography>

                        {rub.questionEvaluations &&
                            rub.questionEvaluations.map(
                                (questionItem, qIndex) => (
                                    <div
                                        key={qIndex}
                                        style={{ marginBottom: "20px" }}
                                    >
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            <Divider
                                                style={{
                                                    backgroundColor:
                                                        "transparent",
                                                }}
                                            >
                                                {questionItem.intitule}
                                            </Divider>
                                        </Typography>

                                        <div
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginBottom: "20px",
                                            }}
                                        >
                                            <Typography
                                                style={{
                                                    width: "100px",
                                                    textAlign: "right",
                                                    marginRight: "16px",
                                                    fontSize: "14px",
                                                }}
                                                variant="body1"
                                            >
                                                {
                                                    questionItem.idQuestion
                                                        .idQualificatif.minimal
                                                }
                                            </Typography>
                                            <Chip
                                                style={{ fontSize: "24px" }}
                                                label={trouverPositionnementParId(
                                                    reponse,
                                                    questionItem.id
                                                )}
                                                //label={"2"}
                                                color="primary"
                                                size="medium"
                                            />
                                            <Typography
                                                style={{
                                                    width: "100px",
                                                    textAlign: "left",
                                                    marginLeft: "16px",
                                                    fontSize: "14px",
                                                }}
                                                variant="body1"
                                            >
                                                {
                                                    questionItem.idQuestion
                                                        .idQualificatif.maximal
                                                }
                                            </Typography>
                                        </div>
                                    </div>
                                )
                            )}
                    </div>
                ))}
                <div
                    style={{
                        margin: "auto",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <ButtonComponent
                        text="Réinitialiser"
                        onClick={handleModifier}
                    />
                    <ButtonComponent text="Soumettre" onClick={handleReponse} />
                </div>
            </Paper>
        </div>
    )
}
export default RecapitulatifReponses
