import React from "react";
import ListComponent from "../../components/common/List/list";
import QualificatifForm from "../../components/QualificatifForm";
import { useContext } from "react";
import { QualificatifContext } from "../../context/qualificatifContext";
import { QUALIFICATIF_COLUMNS } from "../../constants";
import {
    supprimerColonnesId,
    trouverIdQualificatif,
} from "../../context/qualificatifContext";

const QualificatifPage: React.FC = () => {
    const {
        qualificatifList,
        qualificatifListError,
        removeQualificatif,
        deleteQualificatifError,
        modifyQualificatifError,
        updateQualificatifMaximal,
        updateQualificatifMinimal,
    } = useContext(QualificatifContext);


    // Données fictives
    const dat = supprimerColonnesId(qualificatifList);

    // Handlers pour les actions

    const handleEdit = (rowData: any) => {
        console.log("Modifier:", rowData);
        updateQualificatifMinimal(rowData.minimal);
        updateQualificatifMaximal(rowData.maximal);
    };

    const handleDelete = (rowData: any) => {
        console.log("Supprimer:", rowData);
        const id_supp = trouverIdQualificatif(rowData, qualificatifList);
        removeQualificatif(id_supp);
    };

    return (
        <div>
            <div style={{ textAlign: "center", color: "red" }}>
                {qualificatifListError && qualificatifListError}
                {deleteQualificatifError && deleteQualificatifError}
                {modifyQualificatifError&& modifyQualificatifError}
            </div>
            <ListComponent
            
                title={"Liste des qualificatifs"}
                columns={QUALIFICATIF_COLUMNS}
                data={dat.reverse()}
                actions={true}
                remove={true}
                deleteHandler={handleDelete}
                modify={true}
                modifyElement={
                    <div>
                        <QualificatifForm add={false} />
                    </div>
                }
                modifyHandler={handleEdit}
                addElement={
                    <div>
                        <QualificatifForm add={true} />
                    </div>
                }
            />
        </div>
    );
};

export default QualificatifPage;
