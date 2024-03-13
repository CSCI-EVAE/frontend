import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react"
// import {ApiResponse, Etudiant} from "../types/index"
import { NotificationContext } from "./notificationContext";
import { Etudiant } from "../types";
// import { getRequest } from "../api/axios";

interface EtudiantListProps {
    children: ReactNode
}

const etudiantData: Etudiant[] = [
    {
      noEtudiant: "1",
      promotion: "2022",
      nom: "Doe",
      prenom: "John",
      sex: "M",
      datenaissance: "1990-01-01",
      nationalite: "France",
      telephone: "123456789",
      email: "john.doe@example.com"
    },
    {
      noEtudiant: "2",
      promotion: "2023",
      nom: "Smith",
      prenom: "Jane",
      sex: "F",
      datenaissance: "1992-05-15",
      nationalite: "USA",
      telephone: "987654321",
      email: "jane.smith@example.com"
    }
  ];


export const EtudiantListContext = createContext<any>(null);

export function AdjustColumns(etudiantList:Etudiant[]):any[]{
if(etudiantList){
    return etudiantList.map((etudiant:Etudiant) => {
        const{
            noEtudiant,
            promotion,
            nom,
            prenom,
            sex,
            datenaissance,
            nationalite,
            telephone,
            email,
            ...rest
        } = etudiant;

        return{
            noEtudiant,
            promotion,
            nom,
            prenom,
            sex,
            datenaissance,
            nationalite,
            telephone,
            email,
            ...rest
        }
    });
} else {
    return [];
}


}

export const EtudiantListContextPorvider: React.FC<EtudiantListProps> = ({children}) => {

const [etudiantList, setEtudiantList] = useState<Etudiant[] | undefined>();
const {showNotification} = useContext(NotificationContext)

const updateEtudiantList = useCallback((value: Etudiant[])=> {
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
            updateEtudiantList(AdjustColumns(etudiantData));
            
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