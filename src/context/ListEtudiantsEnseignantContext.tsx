import { ReactNode, createContext, useCallback, useContext, useState } from "react"
// import {ApiResponse} from "../types/index"
import { NotificationContext } from "./notificationContext";
// import { getRequest } from "../api/axios";
import { ApiResponse, EtudiantDTO } from "../types";
import { getRequest } from "../api/axios";
import { formatDate } from "../components/detailsPromotionComponent";

interface EtudiantListProps {
    children: ReactNode
}

export const EtudiantEnseignantContext = createContext<any>(null);


export const EtudiantEnseignantContextProvider: React.FC<EtudiantListProps> = ({children}) => {

const [etudiantList, setEtudiantList] = useState<EtudiantDTO[] | undefined>();
const {showNotification} = useContext(NotificationContext)

const updateEtudiantList = useCallback((value: EtudiantDTO[]) => {
    setEtudiantList(value);
}, []);




const getList = useCallback(async (anneeUniversitaire: number, codeFormation: string) => {
    try {
        const response: ApiResponse = await getRequest(`/etudiant/${anneeUniversitaire}/${codeFormation}/etudiants`);        if (!response.success) {
            showNotification("Erreur", response.message, "error");
            return;
        }
        const { data } = response.data; 
        const newdata = data.map((d:any)=>{
            return {...d, dateNaissance :formatDate(d.dateNaissance)}
        })

        updateEtudiantList(newdata);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération de la liste des étudiants :", error);
        showNotification("Erreur", "Une erreur s'est produite lors de la récupération de la liste des étudiants.", "error");
    }
}, [showNotification, updateEtudiantList]);
                



return(
    <EtudiantEnseignantContext.Provider
    value={{
        etudiantList,
        updateEtudiantList,
        getList
    }}
>
    {children}
</EtudiantEnseignantContext.Provider>
)

}