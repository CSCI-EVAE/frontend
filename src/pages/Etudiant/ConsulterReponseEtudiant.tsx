import { Chip, Divider, Paper, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import ButtonComponent from "../../common/Button"
import { EvaluationEtudiantContext } from "../../context/evaluationEtudiantContext"
import { useNavigate, useParams } from "react-router-dom"
import { RubriqueEvaluation } from "../../types/EvaluationTypes"
import { KeyboardBackspace } from "@mui/icons-material"
import { COLORS } from "../../constants"
import Header from "../../Layout/Header"

const ConsulterReponseEtudiant = () => {
    const navigate = useNavigate()
    const idEvaluation = useParams().idEvaluation
    // const handleModifier = () => {
    //     navigate("/dashboard/etudiant")
    // }
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
        <>
            <Header />
            <div
                style={{
                    maxWidth: "90%",
                    marginLeft: "150px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginBottom: "50px",
                }}
            >
                <ButtonComponent
                    text="Retour "
                    variant="contained"
                    icon={<KeyboardBackspace />}
                    onClick={() => {
                        navigate("/dashboard/etudiant")
                    }}
                />
            </div>
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
                        fontFamily: "system-ui",
                        color: COLORS.color3,
                        marginTop: "20px",
                        marginBottom: "50px",
                    }}
                    variant="h4"
                    gutterBottom
                >
                    Vos réponses
                </Typography>

                {reponse &&
                    reponse.map((rep, index) => (
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
                                        margin: "24px",
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
                                        {rep.idRubrique.designation}
                                    </span>
                                </Typography>

                                {rep.questionEvaluations &&
                                    rep.questionEvaluations.map(
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
                                                            flexDirection:
                                                                "row",
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
                                                                label={
                                                                    questionItem.positionnement
                                                                }
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
        </>
    )
}
export default ConsulterReponseEtudiant
