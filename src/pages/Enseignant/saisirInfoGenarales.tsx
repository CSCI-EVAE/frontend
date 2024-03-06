import InfoGenarales from "../../components/InformationGeneralesForm"
import Header from "../../Layout/Header"
import SideBarEnseignant from "../../Layout/sideBar/SideBarEnseignant"

const InfoGeneralesPage = () => {
    return (
        <>
                     <SideBarEnseignant />
        <Header />
            <InfoGenarales />
        </>
    )
}
export default InfoGeneralesPage
