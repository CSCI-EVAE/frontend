import React from "react"
import ListComponent from "../../common/List/list"
import { useContext } from "react"
import { UE_COLUMNS_LISTEtudiant } from "../../constants/index"
import { EtudiantEnseignantContext } from "../../context/ListEtudiantsEnseignantContext"


const ListEtudiantPage: React.FC = () => {
    const {
     etudiantList
    } = useContext(EtudiantEnseignantContext);
    
    const dat = etudiantList ? etudiantList: [];


    return (
       
     <div>
                
          
            <ListComponent
                    title={"Liste des etudiants"}
                    columns={UE_COLUMNS_LISTEtudiant}
                    data={dat.reverse()}
                    actions={true}
                   // details={true}
                   noBoutonAjouter={true}
                    

                    filter={true}
                    
                   
                />
     </div>  
    );
 }
 
 export default ListEtudiantPage;