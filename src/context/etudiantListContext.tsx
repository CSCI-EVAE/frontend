import { ReactNode, createContext, useCallback, useContext, useState } from "react"
// import {ApiResponse, Etudiant} from "../types/index"
import { NotificationContext } from "./notificationContext";
import { ApiResponse, EtudiantDTO } from "../types";
import { getRequest} from "../api/axios";
// import { getRequest } from "../api/axios";

interface EtudiantListProps {
    children: ReactNode
}

export const EtudiantListContext = createContext<any>(null);

export const EtudiantListContextPorvider: React.FC<EtudiantListProps> = ({children}) => {

// const [etudiantList, setEtudiantList] = useState<EtudiantDTO[] | undefined>();
const [etudiantList, setEtudiantList] = useState<EtudiantDTO[]>([]); 
const {showNotification} = useContext(NotificationContext)

const updateEtudiantList = useCallback((value: EtudiantDTO[])=> {
    setEtudiantList(value);
},[])

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
   
  };




const getList = useCallback(async (anneeUniversitaire: number, codeFormation: string) => {
    try {
        const response: ApiResponse = await getRequest(`/etudiant/${anneeUniversitaire}/${codeFormation}/etudiants`);
        if (!response.success) {
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
    <EtudiantListContext.Provider
    value={
        {updateEtudiantList,
            getList,
        etudiantList}
    }>
        {children}
    </EtudiantListContext.Provider>
)

}