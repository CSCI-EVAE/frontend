import React, { useContext } from "react"
import {
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material"
import { RubriqueComposeContext } from "../context/rubriqueComposeContext"

const RubriqueComposeView = () => {
    const { currentRubriqueCompose } = useContext(RubriqueComposeContext)

    const title = currentRubriqueCompose.designation

    const rubriqueItems = currentRubriqueCompose.questions

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            <Divider />

            <List style={{ maxHeight: "400px", overflow: "auto" }}>
                {rubriqueItems.map((item: any, index: number) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={item.intitule}
                            primaryTypographyProps={{ align: "left" }} // Aligner le texte primaire à gauche
                            secondary={`${item.maximal} - ${item.minimal}`}
                            secondaryTypographyProps={{
                                align: "right",
                                color: "black",
                            }} // Aligner le texte secondaire à droite
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default RubriqueComposeView
