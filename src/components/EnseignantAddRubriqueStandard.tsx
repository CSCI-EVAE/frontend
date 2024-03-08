import React, { useContext } from "react"
import { Box, Typography } from "@mui/material"
import ButtonComponent from "../common/Button"

import { ListContext } from "../context/listContext"
import { RubriqueContext } from "../context/rubriqueContext"
import { Rubrique } from "../types"
import CheckboxComponent from "../common/Checkbox"
import {
    RubriqueEnseignantContext,
    elementsNonSelectionnees,
    rubriqueStandardToRubriqueCompose,
} from "../context/rubriqueEnseignantContext"

const EnseignantAddRubriqueStandard = () => {
    const { rubriqueList } = useContext(RubriqueContext)
    const {
        updateRubriqueAddedByList,
        rubriqueAdded,
        updateRubriqueSelected,
        rubriqueSelected,
    } = useContext(RubriqueEnseignantContext)

    const [dataset, setDataset] = React.useState<
        { label: string; value: string }[]
    >([])

    const [selectedRubriqueStandardList, setSelectedRubriqueStandardList] =
        React.useState<string[]>([])

    // setSelectedRubriqueCompose(rubriqueCompose.designation);
    const { updateModalOpen } = useContext(ListContext)

    React.useEffect(() => {
        const newDataset = getRubriqueListe(rubriqueSelected, rubriqueList)

        setDataset(newDataset)
    }, [rubriqueAdded, rubriqueSelected, rubriqueList])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newRubrique = rubriqueList.filter((rubrique: Rubrique) =>
            selectedRubriqueStandardList.includes(rubrique.designation)
        )

        updateRubriqueSelected([...rubriqueSelected, ...newRubrique])

        const newRubriqueCompose =
            rubriqueStandardToRubriqueCompose(newRubrique)

        updateRubriqueAddedByList([...rubriqueAdded, ...newRubriqueCompose])

        setSelectedRubriqueStandardList([])
        updateModalOpen(false)
    }
    const handleReset = () => {
        updateModalOpen(false)
    }

    const getRubriqueListe = (liste1: Rubrique[], liste2: Rubrique[]) => {
        return elementsNonSelectionnees(liste1, liste2).map(
            (rubriqueList: Rubrique) => ({
                label: `${rubriqueList.designation}`,
                value: `${rubriqueList.designation}`,
                //idLabel: "ID qualificatif",
                //idValue: qualificatif.id
            })
        )
    }

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

            <>
                <Box sx={{ display: "flex", gap: "1rem" }}>
                    <CheckboxComponent
                        label="Choisissez la Rubrique"
                        options={dataset}
                        value={selectedRubriqueStandardList}
                        onChange={(value) =>
                            setSelectedRubriqueStandardList(value as string[])
                        }
                        sx={{ width: "50%" }} // Ajustez la largeur comme vous le souhaitez
                    />
                </Box>
            </>

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
    )
}

export default EnseignantAddRubriqueStandard
