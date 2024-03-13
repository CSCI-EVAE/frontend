import React from "react"
import ReponsesEvaluationDetails from "../../components/ReponsesEvaluationEnseignantDetails"
import DetailsEvaluationComponent from "../../components/EvaeReponsesDetails"
import { Typography } from "@mui/material"

export default function ReponseEvaluationEnseignant() {
    const textStyle: React.CSSProperties = {
        fontFamily: "cursive",
        color: "#e3a12f",
        marginTop: "20px",
        marginBottom: "50px",
    }
    return (
        <>
            <DetailsEvaluationComponent urlRetour="/enseignant/unitésEnseignement" />
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
            <div
            // style={{
            //     maxWidth: "90%",
            //     marginLeft: "150px",
            //     display: "flex",
            //     flexDirection: "column",
            //     alignItems: "center",
            // }}
            >
                <ReponsesEvaluationDetails />
            </div>
        </>
    )
}
