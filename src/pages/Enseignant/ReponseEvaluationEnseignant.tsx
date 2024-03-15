import React, { useContext, useEffect } from "react"
import ReponsesEvaluationDetails from "../../components/ReponsesEvaluationEnseignantDetails"
import DetailsEvaluationComponent from "../../components/EvaeReponsesDetails"
import { Typography } from "@mui/material"
import { EvaluationContext } from "../../context/evaluationEnseignantContext"
import { useParams } from "react-router-dom"

export default function ReponseEvaluationEnseignant() {
    const textStyle: React.CSSProperties = {
        fontFamily: "cursive",
        color: "#e3a12f",
        marginTop: "20px",
        marginBottom: "50px",
    }

   const {getStatistiques, statistiqueList} = useContext(EvaluationContext);
      const idEvaluation = useParams().id
   
console.log("aaa",statistiqueList)
   useEffect(()=> {
    getStatistiques(idEvaluation)

   },[getStatistiques,idEvaluation])


    return (
        <>
            <DetailsEvaluationComponent urlRetour="/enseignant/unitésEnseignement" evaluation={statistiqueList ?? []} />

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
                <ReponsesEvaluationDetails evaluation={statistiqueList ??[]} />
            </div>
        </>
    )
}
