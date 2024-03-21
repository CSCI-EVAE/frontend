import { Chip, Divider, Paper, Typography } from "@mui/material"
import { FC, useContext } from "react"
import ButtonComponent from "../common/Button"
import { StepContext } from "../context/stepperContext"
import { RubriqueEvaluation } from "../types/EvaluationTypes"
import { ReponseEvaluation } from "../types"
import {
    EvaluationEtudiantContext,
    convertToReponseEvaluation,
} from "../context/evaluationEtudiantContext"
import { useNavigate } from "react-router-dom"
import { COLORS } from "../constants"

interface ReponseProps {
    rubrique: RubriqueEvaluation[]
}
const RecapitulatifReponses: FC<ReponseProps> = ({ rubrique }) => {
    const navigate = useNavigate()
    const { handleReset } = useContext(StepContext)
    const handleModifier = () => {
        handleReset()
        const reponse = convertToReponseEvaluation(
            rubrique ?? [],
            reponseEvae.idEvaluationId ?? 0
        )
        updateReponseEvaluationByReponse(reponse)
    }
    const {
        soumettreReponseEtudiant,
        reponseEvae,
        updateReponseEvaluationByReponse,
        // evaluationDetails
    } = useContext(EvaluationEtudiantContext)

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
        await soumettreReponseEtudiant({ ...reponseEvae })
        localStorage.removeItem("reponseEvaluation")
        handleModifier()
        navigate("/dashboard/etudiant")
    }
    return (
        <>
            <div
                style={{
                    maxWidth: "70%",
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    //   alignItems: "center",
                }}
            >
                <Typography
                    style={{
                        margin: "32px",
                        textAlign: "center",
                        color: COLORS.color3,
                    }}
                    variant="h5"
                    gutterBottom
                >
                    Recapitulatif des réponses
                </Typography>
                {rubrique.map((rub, index) => (
                    <Paper
                        elevation={4}
                        key={index}
                        sx={{
                            marginBottom: "24px",
                            background: COLORS.color7,
                        }}
                    >
                        <div>
                            <Typography
                                style={{
                                    margin: "16px",
                                    textAlign: "center",
                                }}
                                variant="h5"
                                gutterBottom
                            >
                                Rubrique :{" "}
                                <span
                                    style={{
                                        color: COLORS.color4,
                                        fontWeight: "bold",
                                    }}
                                >
                                    {rub.idRubrique.designation}
                                </span>
                            </Typography>

                            {rub.questionEvaluations &&
                                rub.questionEvaluations.map(
                                    (questionItem, qIndex) => (
                                        <div
                                            key={qIndex}
                                            style={{
                                                backgroundColor:
                                                    qIndex % 2 === 0
                                                        ? "#fff"
                                                        : "#f9f9f9",
                                            }}
                                        >
                                            <Divider />
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent:
                                                        "space-between",
                                                    width: "80%",
                                                    margin: "auto",
                                                }}
                                            >
                                                {/* Premier contenu aligné à gauche */}
                                                <div
                                                    style={{
                                                        margin: "16px",
                                                    }}
                                                >
                                                    <Typography>
                                                        {
                                                            questionItem
                                                                .idQuestion
                                                                .intitule
                                                        }
                                                    </Typography>
                                                </div>

                                                {/* Deuxième contenu aligné à droite */}
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        margin: "16px",
                                                    }}
                                                >
                                                    {/* Typographie pour la valeur minimale */}
                                                    <div
                                                        style={{
                                                            width: "100px",
                                                        }}
                                                    >
                                                        <Typography variant="body1">
                                                            {
                                                                questionItem
                                                                    .idQuestion
                                                                    .idQualificatif
                                                                    .minimal
                                                            }
                                                        </Typography>
                                                    </div>

                                                    {/* Chip avec une largeur fixe */}
                                                    <div
                                                        style={{
                                                            width: "100px",
                                                        }}
                                                    >
                                                        <Chip
                                                            style={{
                                                                fontSize:
                                                                    "24px",
                                                                width: "50px",
                                                                color: COLORS.color7,
                                                                background:
                                                                    COLORS.color3,
                                                            }}
                                                            label={trouverPositionnementParId(
                                                                reponseEvae,
                                                                questionItem.id
                                                            )}
                                                            size="medium"
                                                        />
                                                    </div>

                                                    {/* Typographie pour la valeur maximale */}
                                                    <div
                                                        style={{
                                                            width: "100px",
                                                        }}
                                                    >
                                                        <Typography variant="body1">
                                                            {
                                                                questionItem
                                                                    .idQuestion
                                                                    .idQualificatif
                                                                    .maximal
                                                            }
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                        </div>
                    </Paper>
                ))}
            </div>
            <div
                style={{
                    width: "100%",
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
        </>
    )
}
export default RecapitulatifReponses
