import { ReactNode, createContext, useCallback, useContext, useState } from "react"
// import {ApiResponse, Etudiant} from "../types/index"
import { NotificationContext } from "./notificationContext";
import { ApiResponse, EtudiantDTO } from "../types";
import { getRequest1 } from "../api/axios";
// import { getRequest } from "../api/axios";

interface EtudiantListProps {
    children: ReactNode
}

export const EtudiantListContext = createContext<any>(null);

// export function AdjustColumns(etudiantList:EtudiantDTO[]):any[]{
// if(etudiantList){
//     return etudiantList.map((etudiant:EtudiantDTO) => {
//         const{
//             noEtudiant,
//             nom,
//             prenom,
//             sexe,
//             datenaissance,
//             nationalite,
//             telephone,
//             email,
//             ...rest
//         } = etudiant;

//         return{
//             noEtudiant,
//             promotion,
//             nom,
//             prenom,
//             sex,
//             datenaissance,
//             nationalite,
//             telephone,
//             email,
//             ...rest
//         }
//     });
// } else {
//     return [];
// }


// }

export const EtudiantListContextPorvider: React.FC<EtudiantListProps> = ({children}) => {

// const [etudiantList, setEtudiantList] = useState<EtudiantDTO[] | undefined>();
const [etudiantList, setEtudiantList] = useState<EtudiantDTO[]>([]); 
const {showNotification} = useContext(NotificationContext)

const updateEtudiantList = useCallback((value: EtudiantDTO[])=> {
    setEtudiantList(value);
},[])




const getList = useCallback(async (anneeUniversitaire: number, codeFormation: string) => {
    try {
        const response: ApiResponse = await getRequest1(`/promotions/${anneeUniversitaire}/${codeFormation}/etudiants`);
        if (!response.success) {
            showNotification("Erreur", response.message, "error");
            return;
        }
        const { data } = response.data; 
        updateEtudiantList(data);
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