import { KeyboardBackspace } from "@mui/icons-material"
import ButtonComponent from "../../common/Button"
import InfoGenarales from "../../components/InformationGeneralesForm"
import Header from "../../Layout/Header"
import SideBarEnseignant from "../../Layout/sideBar/SideBarEnseignant"
import { useNavigate } from "react-router-dom"

const InfoGeneralesPage = () => {
    const navigate = useNavigate()
    return (
        <>
            <SideBarEnseignant />
            <Header />
            <div
                style={{
                    maxWidth: "90%",
                    marginLeft: "100px",
                    marginBottom: "48px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}
            >
                <ButtonComponent
                    text="Retour"
                    variant="contained"
                    icon={<KeyboardBackspace />}
                    onClick={() => {
                        navigate(`/dashboard/enseignant/unitésEnseignement`)
                    }}
                />
            </div>
            <InfoGenarales />
        </>
    )
}
export default InfoGeneralesPage
