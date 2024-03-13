import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react"
// import {ApiResponse, Etudiant} from "../types/index"
import { NotificationContext } from "./notificationContext";
import { EtudiantDTO } from "../types";
// import { getRequest } from "../api/axios";

interface EtudiantListProps {
    children: ReactNode
}

const etudiantData: EtudiantDTO[] = [
    {
        noEtudiant: "2024001",
        nom: "Dupont",
        prenom: "Jean",
        sexe: "M",
        dateNaissance: "1999-05-15",
        lieuNaissance: "Paris",
        nationalite: "Française",
        telephone: "0123456789",
        mobile: "0612345678",
        email: "jean.dupont@example.com",
        emailUbo: "jdupont@etudiant.univ-bretagne.fr",
        adresse: "123 Rue de la Paix",
        codePostal: "75001",
        ville: "Paris",
        paysOrigine: "France",
        universiteOrigine: "Université Paris-Sorbonne",
        groupeTp: 1,
        groupeAnglais: 2,
        CodeFormation: "INFO123",
        anneeUniversitaire: "2024-2025"
    },
    {
        noEtudiant: "2024001",
        nom: "Dupont",
        prenom: "Jean",
        sexe: "M",
        dateNaissance: "1999-05-15",
        lieuNaissance: "Paris",
        nationalite: "Française",
        telephone: "0123456789",
        mobile: "0612345678",
        email: "jean.dupont@example.com",
        emailUbo: "jdupont@etudiant.univ-bretagne.fr",
        adresse: "123 Rue de la Paix",
        codePostal: "75001",
        ville: "Paris",
        paysOrigine: "France",
        universiteOrigine: "Université Paris-Sorbonne",
        groupeTp: 1,
        groupeAnglais: 2,
        CodeFormation: "INFO123",
        anneeUniversitaire: "2024-2025"
    }
  ];


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

const [etudiantList, setEtudiantList] = useState<EtudiantDTO[] | undefined>();
const {showNotification} = useContext(NotificationContext)

const updateEtudiantList = useCallback((value: EtudiantDTO[])=> {
    setEtudiantList(value);
},[])

useEffect(() => {
    const getList = async () => {
        try {
           // const response: ApiResponse = await getRequest("etudiant/getEtudiant");
            // if (!response.success) {
            //     showNotification("Erreur", response.message, "error");
            //     return;
            // }
           
            //let list = response.data.body.data;
            //updateEtudiantList(AdjustColumns(list));
            updateEtudiantList(etudiantData);
            
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération de la liste des évaluations :", error);
            showNotification("Erreur", "Une erreur s'est produite lors de la récupération de la liste des évaluations.", "error");
        }
    };

    getList();
}, [updateEtudiantList, showNotification]);

return(
    <EtudiantListContext.Provider
    value={
        {updateEtudiantList,
        etudiantList}
    }>
        {children}
    </EtudiantListContext.Provider>
)

}