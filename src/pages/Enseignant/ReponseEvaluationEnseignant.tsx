import React, { useContext, useEffect } from "react"
import ReponsesEvaluationDetails from "../../components/ReponsesEvaluationEnseignantDetails"
import DetailsEvaluationComponent from "../../components/EvaeReponsesDetails"
import { Typography } from "@mui/material"
import { EvaluationContext } from "../../context/evaluationEnseignantContext"
import { useParams } from "react-router-dom"
import Header from "../../Layout/Header"
import SideBarEnseignant from "../../Layout/sideBar/SideBarEnseignant"

export default function ReponseEvaluationEnseignant() {
    const textStyle: React.CSSProperties = {
        fontFamily: "cursive",
        color: "#e3a12f",
        marginTop: "20px",
        marginBottom: "50px",
    }

    const { getStatistiques, statistiqueList } = useContext(EvaluationContext)
    const idEvaluation = useParams().id

    useEffect(() => {
        getStatistiques(idEvaluation)
    }, [getStatistiques, idEvaluation])

    return (
        <>
            <SideBarEnseignant></SideBarEnseignant>
            <Header></Header>

            <DetailsEvaluationComponent
                urlRetour="/dashboard/enseignant/unitésEnseignement"
                evaluation={statistiqueList ?? []}
            />

            <div
                style={{
                    maxWidth: "90%",
                    marginLeft: "50px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" gutterBottom style={textStyle}>
                    Détails des Réponses
                </Typography>
            </div>
            <div>
                <ReponsesEvaluationDetails evaluation={statistiqueList ?? []} />
            </div>
        </>
    )
}
