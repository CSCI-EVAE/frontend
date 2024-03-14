import React from "react"
import ListComponent from "../../common/List/list"
import { useContext } from "react"
import { UE_COLUMNS_LISTEtudiant } from "../../constants/index"
import { EtudiantListContext } from "../../context/etudiantListContext"
const EtudiantListPage: React.FC = () => {
    const {
     etudiantList
    } = useContext(EtudiantListContext);
   
     const dat = etudiantList ? etudiantList : [];
     const handleEdit = (rowData: any) => {
        console.log("Modifier:", rowData)
       
    }

    const handleDelete = (rowData: any) => {
        console.log("Supprimer:", rowData)
       
    } 

    return (
       
     <div>
             
          
            <ListComponent
                    title={"Liste des etudiants"}
                    columns={UE_COLUMNS_LISTEtudiant}
                    data={dat.reverse()}
                    actions={true}
                    remove={true}
                    deleteHandler={handleDelete}
                    modify={true}
                    filter={true}
                    modifyElement={
                        <div>
                            <p>Update etudiant</p>
                        </div>
                    }
                    modifyHandler={handleEdit}
                    addElement={
                        <div>
                             <p>creer etudiant</p>
                        </div>
                    }
                  noBoutonRetour={true}
                    

                />
     </div>  
    );
 }
 
 export default EtudiantListPage;