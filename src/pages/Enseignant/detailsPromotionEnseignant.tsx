import { useContext, useEffect } from "react"
import { Promotion } from "../../types"
import { PromotionEnseignantContext } from "../../context/promotionContextEnseignant"
import DetailsPromotionComponent from "../../components/detailsPromotionComponent"
import UeListComponent from "../../components/UeListComponent"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import { ArrowDropDown } from "@mui/icons-material"
import { Typography } from "@mui/material"
import Header from "../../Layout/Header"
import ListEtudiantPage from "./listEtudiants"
import { EtudiantEnseignantContext } from "../../context/ListEtudiantsEnseignantContext"
import { useParams } from "react-router-dom"
const textStyle: React.CSSProperties = {
    fontFamily: "cursive",
    color: "#e3a12f",
    //marginTop: "20px",
    // marginBottom: "50px",
    margin: "auto",
    textAlign: "center",
}
const DetailsPromotionEnseignant = () => {
    const { getUeList, ueList } = useContext(PromotionEnseignantContext)
    const codeFormation  = useParams().codeFormation
const anneeUniversitaire = useParams().anneeUniversitaire
    const promotionStorage = localStorage.getItem("promotion")
    const promotion: Promotion = JSON.parse(promotionStorage || "0")

    useEffect(() => {
        getUeList(codeFormation)
    }, [getUeList,codeFormation])
    
    const {getList, etudiantList} = useContext(EtudiantEnseignantContext)
    useEffect(() => {
        getList(anneeUniversitaire, codeFormation);

    }, [getList,anneeUniversitaire,codeFormation]);
 
   
    const nombreEtudiants = (liste: any[] | null): number => {
            if (liste) {
                return liste.length;
            } else {
                return 0;
            }
        };

    return (
        <>
            <Header />
            <DetailsPromotionComponent
                effectifReel= {nombreEtudiants(etudiantList)}
                promotion={promotion}
                urlRetour="/dashboard/enseignant/Promotion"
            />
            <div
                style={{
                    marginTop: "32px",
                    maxWidth: "100%",
                    marginBottom: "64px",
                    // margin: "auto",
                    //display: "flex",
                    //flexDirection: "column",
                    //alignItems: "center",
                }}
            >
                {" "}
                <Accordion defaultExpanded>
                    <AccordionSummary
                        sx={{
                            marginRight: "150px",
                            marginLeft: "150px",
                            //backgroundColor: "#ffe",
                        }}
                        expandIcon={<ArrowDropDown />}
                    >
                        <Typography variant="h4" gutterBottom style={textStyle}>
                            Liste des UE
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <UeListComponent ue={ueList} />
                    </AccordionDetails>
                    
                </Accordion>
                
                <Accordion defaultExpanded>
                    <AccordionSummary
                        sx={{
                            marginRight: "150px",
                            marginLeft: "150px",
                          
                        }}
                        expandIcon={<ArrowDropDown />}
                    >
                        <Typography variant="h4" gutterBottom style={textStyle}>
                            Liste des Etudiants
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                    <ListEtudiantPage listEtudiant={etudiantList} />
                    </AccordionDetails>
                    
                </Accordion>
            </div>
        </>
    )
}

export default DetailsPromotionEnseignant
