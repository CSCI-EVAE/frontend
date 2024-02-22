import React, { useContext } from "react";
import { TextField, Box, Typography } from "@mui/material";
import ButtonComponent from "./common/Button";
import {
    QualificatifContext,
    trouverIdQualificatif,
} from "../context/qualificatifContext";
import { ListContext } from "../context/listContext";
interface qualificatifFormProps {
    add: boolean; 
}

const QualificatifForm: React.FC<qualificatifFormProps> = ({ add }) => {
    const {
        qualificatifMaximal,
        qualificatifMinimal,
        updateQualificatifMinimal,
        updateQualificatifMaximal,
        addNewQualificatif,
        modifyQualificatif,
        qualificatifList,
    } = useContext(QualificatifContext);
    const { updateModalOpen, selectedRow } = useContext(ListContext);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (add === true) {
            addNewQualificatif({
                minimal: qualificatifMinimal,
                maximal: qualificatifMaximal,
            });
        } else {
            const id = trouverIdQualificatif(selectedRow, qualificatifList);
            console.log("mod2", id);
            modifyQualificatif(id, {
                minimal: qualificatifMinimal,
                maximal: qualificatifMaximal,
            });
        }

        updateModalOpen(false);
    };
    const handleReset = () => {
        updateModalOpen(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {" "}
                Entrez les informations
            </Typography>
            <Box sx={{ display: "flex", gap: "1rem" }}>
                <TextField
                    label="Minimal"
                    variant="outlined"
                    value={qualificatifMinimal}
                    onChange={(e) => updateQualificatifMinimal(e.target.value)}
                    required
                />
                <TextField
                    label="Maximal"
                    variant="outlined"
                    value={qualificatifMaximal}
                    onChange={(e) => updateQualificatifMaximal(e.target.value)}
                    required
                    // placeholder={qualificatifMaximal}
                />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "start", gap: "1rem" }}>
                <ButtonComponent
                    text="Valider"
                    type="submit"
                    variant="contained"
                />

                <ButtonComponent
                    text="Annuler"
                    onClick={handleReset}
                    type="reset"
                    variant="contained"
                />
            </Box>
        </form>
    );
};

export default QualificatifForm;
