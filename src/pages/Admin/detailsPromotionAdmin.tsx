import { useContext, useEffect } from "react"
import { Promotion } from "../../types"
import DetailsPromotionComponent from "../../components/detailsPromotionComponent"
import UeListComponent from "../../components/UeListComponent"
import { PromotionAdminContext } from "../../context/promotionContextAdmin"
import Header from "../../Layout/Header"
import EtudiantListPage from "./etudiantList"
import { EtudiantListContext } from "../../context/etudiantListContext"
import { useParams } from "react-router-dom"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material"
import { ArrowDropDown } from "@mui/icons-material"
import Sidebar from "../../Layout/sideBar/SidebarPage"
import { COLORS } from "../../constants"
const textStyle: React.CSSProperties = {
    fontFamily: "system-ui",
    color: "#e3a12f",
    margin: "auto",
    textAlign: "center",
    fontSize: "1.7rem",
}

const DetailsPromotionAdmin = () => {
    const { getUeList, ueList } = useContext(PromotionAdminContext)
    const codeFormation = useParams().codeFormation
    const anneeUniversitaire = useParams().anneeUniversitaire
    const promotionStorage = localStorage.getItem("promotion")
    const promotion: Promotion = JSON.parse(promotionStorage || "0")
    useEffect(() => {
        getUeList(codeFormation)
    }, [getUeList, codeFormation])

    const { getList, etudiantList } = useContext(EtudiantListContext)

    useEffect(() => {
        getList(anneeUniversitaire, codeFormation)
    }, [getList, anneeUniversitaire, codeFormation])

    const nombreEtudiants = (liste: any[] | null): number => {
        if (liste) {
            return liste.length
        } else {
            return 0
        }
    }

    return (
        <>
            <Sidebar />
            <Header />

            <DetailsPromotionComponent
                effectifReel={nombreEtudiants(etudiantList)}
                promotion={promotion}
                urlRetour="/dashboard/promotions"
            />
            <div
                style={{
                    marginTop: "32px",
                    maxWidth: "100%",
                    marginBottom: "64px",
                }}
            >
                <Accordion
                    defaultExpanded
                    style={{
                        marginBottom: "32px",
                        background: COLORS.color5,
                    }}
                >
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

                <Accordion
                    defaultExpanded
                    style={{
                        background: COLORS.color5,
                    }}
                >
                    <AccordionSummary
                        sx={{
                            marginRight: "150px",
                            marginLeft: "150px",
                            //backgroundColor: "#ffe",
                        }}
                        expandIcon={<ArrowDropDown />}
                    >
                        <Typography variant="h4" gutterBottom style={textStyle}>
                            Liste des Etudiants
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <EtudiantListPage etudiantList={etudiantList} />
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    )
}

export default DetailsPromotionAdmin
