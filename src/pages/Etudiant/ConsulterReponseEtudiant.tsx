import { Chip, Divider, Paper, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import ButtonComponent from "../../common/Button"
import { EvaluationEtudiantContext } from "../../context/evaluationEtudiantContext"
import { useNavigate, useParams } from "react-router-dom"
import { RubriqueEvaluation } from "../../types/EvaluationTypes"

const ConsulterReponseEtudiant = () => {
    const navigate = useNavigate()
    const idEvaluation = useParams().idEvaluation
    const handleModifier = () => {
        navigate("/dashboard/etudiant")
    }
    const { getEvaluationReponse, consulterReponse } = useContext(
        EvaluationEtudiantContext
    )

    useEffect(() => {
        getEvaluationReponse(idEvaluation)
    }, [idEvaluation, getEvaluationReponse])
    const [reponse, setReponse] =
        useState<RubriqueEvaluation[]>(consulterReponse)
    useEffect(() => {
        setReponse(consulterReponse)
    }, [consulterReponse])

    return (
        <div
            style={{
                maxWidth: "80%",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                //   alignItems: "center",
            }}
        >
            <Typography
                style={{ margin: "32px", textAlign: "center" }}
                variant="h5"
                gutterBottom
            >
                Vos réponses
            </Typography>
            <Paper elevation={0}>
                {reponse &&
                    reponse.map((rep, index) => (
                        <div key={index}>
                            <Typography
                                style={{ margin: "32px", textAlign: "center" }}
                                variant="h5"
                                gutterBottom
                            >
                                {rep.idRubrique.designation}
                            </Typography>

                            {rep.questionEvaluations &&
                                rep.questionEvaluations.map(
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
                                                    {
                                                        questionItem.idQuestion
                                                            .intitule
                                                    }
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
                                                            .idQualificatif
                                                            .minimal
                                                    }
                                                </Typography>
                                                <Chip
                                                    style={{ fontSize: "24px" }}
                                                    label={
                                                        questionItem.positionnement
                                                    }
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
                                                            .idQualificatif
                                                            .maximal
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
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <ButtonComponent
                        text="Modifier les réponses"
                        onClick={handleModifier}
                    />
                </div>
            </Paper>
        </div>
    )
}
export default ConsulterReponseEtudiant
