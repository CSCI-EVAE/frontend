import React, { useContext, useEffect, useState } from "react"
import {
    TextField,
    Alert,
    Container,
    Paper,
    Typography,
    Grid,
} from "@mui/material"
import ButtonComponent from "../common/Button"
import { useNavigate } from "react-router-dom"
import { UEContext } from "../context/UeContext"
import SelectComponent from "../common/Select/newSelect"
import { Promotion } from "../types"
import { EvaluationContext } from "../context/evaluationEnseignantContext"
import { formatDate } from "./detailsPromotionComponent"


const InfoGenerales: React.FC = () => {
    const navigate = useNavigate()

    const state = localStorage.getItem("state")

    const infoGenerale = JSON.parse(state ?? "{}")
    const [dateDebutError, setDateDebutError] = useState(false)
    const [dateFinError, setDateFinError] = useState(false)
    const { defaultValue } = useContext(EvaluationContext)

    const [designationError, setDesignationError] = useState(false)
    const [designation, setDesignation] = useState(defaultValue.designation)
    const [dateDebut, setDateDebut] = useState(defaultValue.dateDebut)

    const [dateFin, setDateFin] = useState(defaultValue.dateFin)
    const [error, setError] = useState("")
    const [anneePro, setAnneePro] = useState<string>(defaultValue.anneePro)

    interface PromotionOption {
        value: string
        label: string
    }

    const containerStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
    }

    const textStyle: React.CSSProperties = {
        fontFamily: "cursive",
        color: "#e3a12f",
        marginTop: "20px",
        marginBottom: "50px",
    }

    const infoPreDefinie: React.CSSProperties = {
        marginBottom: "10px",
        fontSize: "20px",
    }

    const paperStyle: React.CSSProperties = {
        padding: "1.5rem",
        width: "1200px",
        maxWidth: "90%",
    }

    const formStyle: React.CSSProperties = {
        width: "100%",
    }

    const textFieldStyle: React.CSSProperties = {
        marginBottom: "1rem",
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const auj = new Date()

        const year = auj.getFullYear()
        const month = String(auj.getMonth() + 1).padStart(2, "0")
        const day = String(auj.getDate()).padStart(2, "0")

        const formattedDate = `${year}-${month}-${day}`

        console.log(formattedDate)
        if (!designation || !dateDebut || !dateFin || !anneePro) {
            setError(
                "Veuillez remplir les champs obligatoires de date debut et fin et designation."
            )
            setDesignationError(!designation)
            setDateDebutError(!dateDebut)
            setDateFinError(!dateFin)

            return
        }

        if (dateDebut < formattedDate) {
            setError(
                "Sélectionnez une date valide en veillant à ce que la date de début soit antérieure à la date d'aujourd'hui."
            )

            return
        }

        if (dateDebut > dateFin) {
            setError(
                "Sélectionnez une date valide en veillant à ce que la date de fin soit antérieure à la date de début."
            )

            return
        }

        const infoGenerales = {
            nomFormation: infoGenerale.nomFormation,
            codeFormation: infoGenerale.codeFormation,
            codeUE: infoGenerale.codeUE,
            codeEC: infoGenerale.codeEC,
            designation,
            dateDebut,
            dateFin,
            periode:
                "Du " +
                formatDate(dateDebut) +
                " au " +
                formatDate(dateFin) +
                " ",
        }

        const infoSup = {
            anneePro: anneePro,
        }

        localStorage.setItem("formData", JSON.stringify(infoGenerales))
        localStorage.setItem("data", JSON.stringify(infoSup))
        navigate(`/dashboard/enseignant/rubrique-evaluation`)
        setDesignation("")
        setDateDebut("")
        setDateFin("")
        setAnneePro("")
        setError("")
    }

    const { promotionList, getPromotionList } = useContext(UEContext) || {}

    useEffect(() => {
        if (getPromotionList) {
            getPromotionList(infoGenerale.codeFormation)
        }
    }, [getPromotionList, infoGenerale.codeFormation])

    let promotionOptions: PromotionOption[] = []
    if (promotionList) {
        promotionOptions = promotionList.map((promotion: Promotion) => ({
            value: promotion.anneeUniversitaire,
            label: promotion.anneeUniversitaire,
        }))
    }

    return (
        <Container style={containerStyle}>
            <Paper elevation={3} style={paperStyle}>
                <div
                    style={{
                        maxWidth: "90%",
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontFamily:
                            "Helvetica Neue, Helvetica, Arial, sans-serif",
                        fontSize: "14px",
                    }}
                >
                    <Typography variant="h4" gutterBottom style={textStyle}>
                        Formulaire d'Informations Générales
                    </Typography>
                </div>
                <form onSubmit={handleSubmit} style={formStyle}>
                    {error && (
                        <Alert style={{ margin: "15px" }} severity="error">
                            {error}
                        </Alert>
                    )}

                    <Grid container spacing={2}>
                        <Grid item xs={10} sm={10}>
                            <Typography variant="body1" style={infoPreDefinie}>
                                <strong>Formation : </strong>
                                {infoGenerale.nomFormation} -{" "}
                                {infoGenerale.codeFormation}
                            </Typography>
                        </Grid>

                        <Grid item xs={10} sm={6}>
                            <Typography variant="body1" style={infoPreDefinie}>
                                <strong>Unité enseignement : </strong>
                                {infoGenerale.codeUE}
                            </Typography>
                        </Grid>
                        <Grid item xs={10} sm={6}>
                            {infoGenerale.codeEC && (
                                <Typography
                                    variant="body1"
                                    style={infoPreDefinie}
                                >
                                    <strong>Elément constitutif : </strong>
                                    {infoGenerale.codeEC}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={10} sm={4}>
                            <SelectComponent
                                defaultValue={defaultValue.anneePro}
                                onChange={(selectedAnneeUniversitaire) => {
                                    console.log(selectedAnneeUniversitaire)
                                    setAnneePro(
                                        selectedAnneeUniversitaire as string
                                    )
                                }}
                                placeholder="Année Universitaire *"
                                name="Année Universitaire"
                                label="Année Universitaire *"
                                options={promotionOptions}
                                error={designationError}
                            />
                        </Grid>

                        <Grid item xs={10} sm={4}>
                            <TextField
                                label="Date de début"
                                type="date"
                                // defaultValue={new Date(defaultValue.dateDebut)}
                                variant="outlined"
                                fullWidth
                                value={dateDebut}
                                onChange={(e) => setDateDebut(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={dateDebutError}
                                helperText={
                                    dateDebutError
                                        ? "La date de début ne peut pas être vide."
                                        : ""
                                }
                                style={{
                                    ...textFieldStyle,
                                    borderColor: dateDebutError ? "red" : "",
                                }}
                            />
                        </Grid>
                        <Grid item xs={10} sm={4}>
                            <TextField
                                defaultValue={new Date(defaultValue.dateFin)}
                                label="Date de fin"
                                type="date"
                                variant="outlined"
                                fullWidth
                                value={dateFin}
                                onChange={(e) => setDateFin(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={dateFinError}
                                helperText={
                                    dateFinError
                                        ? "La date de fin ne peut pas être vide."
                                        : ""
                                }
                                style={{
                                    ...textFieldStyle,
                                    borderColor: dateFinError ? "red" : "",
                                }}
                            />
                        </Grid>

                        <Grid item xs={10} sm={12}>
                            <TextField
                                label="Désignation *"
                                variant="outlined"
                                fullWidth
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                error={designationError}
                                helperText={
                                    designationError
                                        ? "La désignation ne peut pas être vide."
                                        : ""
                                }
                                style={{
                                    ...textFieldStyle,
                                    borderColor: designationError ? "red" : "",
                                }}
                            />
                        </Grid>
                    </Grid>
                    <div style={{ textAlign: "right" }}>
                        <ButtonComponent
                            text="Suivant"
                            type="submit"
                            variant="contained"
                        />
                    </div>
                </form>
            </Paper>
        </Container>
    )
}

export default InfoGenerales
