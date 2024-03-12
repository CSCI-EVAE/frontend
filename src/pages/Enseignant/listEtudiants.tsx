import React from "react"
import ListComponent from "../../common/List/listEnseignantEtudiant"
import { useContext } from "react"
import { UE_COLUMNS_LISTEtudiant } from "../../constants/index"
import { EtudiantEnseignantContext } from "../../context/ListEtudiantsEnseignantContext"
import { AdjustColumns } from "../../context/ListEtudiantsEnseignantContext"
import Header from "../../Layout/Header"
import SideBarEnseignant from "../../Layout/sideBar/SideBarEnseignant"

const ListEtudiantPage: React.FC = () => {
    const {
     etudiantList
    } = useContext(EtudiantEnseignantContext);
   
     const dat = etudiantList ? AdjustColumns(etudiantList) : [];
     const handleEdit = (rowData: any) => {
        console.log("Modifier:", rowData)
       
    }

    const handleDelete = (rowData: any) => {
        console.log("Supprimer:", rowData)
       
    } 

    return (
       
     <div>
                 <SideBarEnseignant />
        <Header />
          
            <ListComponent
                    title={"Liste des etudiants"}
                    columns={UE_COLUMNS_LISTEtudiant}
                    data={dat.reverse()}
                    actions={true}
                    remove={true}
                    deleteHandler={handleDelete}
                    modify={true}
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
                />
     </div>  
    );
 }
 
 export default ListEtudiantPage;