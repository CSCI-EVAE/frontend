import React, { useEffect, useState } from "react"
import ListComponent from "../../common/List/list"
import { UE_COLUMNS_LISTEtudiant } from "../../constants/index"
import { EtudiantDTO } from "../../types"

type PromotionProps = {
    etudiantList : any[]
}


const EtudiantListPage: React.FC<PromotionProps> = ({etudiantList}:PromotionProps) => {
    


    const handleDelete = (rowData: any) => {
        console.log("Supprimer:", rowData)
       
    } 
    
    const [data, setData] = useState<EtudiantDTO[]>([]);

    useEffect(() => {
        if (etudiantList && Array.isArray(etudiantList)) {
            setData([...etudiantList].reverse());
        } else {
            setData([]);
        }
    }, [etudiantList]); 


    return (
       
     <div>
             
          
            <ListComponent
                    title={"Liste des etudiants"}
                    columns={UE_COLUMNS_LISTEtudiant}
                    data={data}
                    actions={true}
                    remove={true}
                    deleteHandler={handleDelete}
                    modify={true}
                    filter={true}
                    noBoutonRetour={true}
                    redirectEdit={true}
                    urlEdit="/dashboard/modifier-etudiant"
                    urlAdd="/dashboard/creer-etudiant"
                    redirectAdd={true}
                />
     </div>  
    );
 }
 
 export default EtudiantListPage;