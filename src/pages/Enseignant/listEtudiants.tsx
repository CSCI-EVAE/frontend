import React, { useEffect, useState } from "react"
import ListComponent from "../../common/List"
import { UE_COLUMNS_LISTEtudiant } from "../../constants/index"
import { EtudiantDTO } from "../../types"

type PromotionProps = {
    listEtudiant : any[]
}


const ListEtudiantPage: React.FC<PromotionProps> = ({listEtudiant}:PromotionProps) => {
    
    const [data, setData] = useState<EtudiantDTO[]>([]);

    useEffect(() => {
        if (listEtudiant && Array.isArray(listEtudiant)) {
            setData([...listEtudiant].reverse());
        } else {
            setData([]);
        }
    }, [listEtudiant]); 


    return (
     <div>       
            <ListComponent
                    title={""}
                    columns={UE_COLUMNS_LISTEtudiant}
                    data={data}
                    actions={false}
                   // details={true}
                 
                    filter={true}
                />
     </div>  
    );
 }
 
 export default ListEtudiantPage;