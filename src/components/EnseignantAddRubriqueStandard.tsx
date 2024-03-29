import React, { useContext } from "react"
import { Box } from "@mui/material"
import ButtonComponent from "../common/Button"

import { ListContext } from "../context/listContext"
import { RubriqueContext } from "../context/rubriqueContext"
import { Rubrique, RubriqueCompose } from "../types"
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

    const { updateModalOpen } = useContext(ListContext)

    React.useEffect(() => {
        const newDataset = getRubriqueListe(
            rubriqueSelected,
            rubriqueList,
            rubriqueAdded
        )

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

    const getRubriqueListe = (
        liste1: Rubrique[],
        liste2: Rubrique[],
        rubriqueAdded: RubriqueCompose[]
    ) => {
        return elementsNonSelectionnees(liste1, liste2)
            .filter(
                (rubrique: Rubrique) =>
                    !rubriqueAdded.some(
                        (addedRubrique: RubriqueCompose) =>
                            addedRubrique.designation === rubrique.designation
                    )
            )
            .map((rubriqueList: Rubrique) => ({
                label: `${rubriqueList.designation}`,
                value: `${rubriqueList.designation}`,
            }))
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
            <>
                <Box
                    sx={{
                        display: "flex",
                        gap: "1rem",
                        maxHeight: "300px",
                        overflow: "auto",
                    }}
                >
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
