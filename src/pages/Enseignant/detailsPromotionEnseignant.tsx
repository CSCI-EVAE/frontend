import { useContext, useEffect } from "react"
import { Promotion } from "../../types"
import { ListContext } from "../../context/listContext"
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
    const { selectedRow } = useContext(ListContext)
    const promotion: Promotion = selectedRow

    useEffect(() => {
        getUeList(promotion.codeFormation)
    }, [getUeList, promotion.codeFormation])

    return (
        <>
            <Header />
            <DetailsPromotionComponent
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
                <ListEtudiantPage/>
               
            </div>
        </>
    )
}

export default DetailsPromotionEnseignant
