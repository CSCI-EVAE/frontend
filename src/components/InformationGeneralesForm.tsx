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
import { useLocation, useNavigate } from "react-router-dom"
import { UEContext } from "../context/UeContext"
import SelectComponent from "../common/Select/newSelect"
import { Promotion } from "../types"


const InfoGenerales: React.FC = () => {



    const navigate = useNavigate()
    const { state } = useLocation()
    const infoGenerale = state?.rowDataInfo
    const [dateDebutError, setDateDebutError] = useState(false);
    const [dateFinError, setDateFinError] = useState(false);

    const [designationError, setDesignationError] = useState(false);
    const [designation, setDesignation] = useState("")
    const [dateDebut, setDateDebut] = useState("")

    const [dateFin, setDateFin] = useState("")
    const [periode, setPeriode] = useState("")
    const [error, setError] = useState("")
    const [anneePro, setAnneePro] = useState<string>('');




    interface PromotionOption {
        value: string;
        label: string;
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
        fontFamily: "cursive",
        marginTop: "20px",
        marginBottom: "50px",
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

        if (!designation || !dateDebut || !dateFin || !anneePro) {
            setError("Veuillez remplir les champs obligatoires de date debut et fin et designation.")
            setDesignationError(!designation);
            setDateDebutError(!dateDebut);
            setDateFinError(!dateFin);

            return
        }

        if (dateDebut > dateFin) {
            setError(
                "Choisir une date valid : Date de fin inferieur a date de début"
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
        }

        const infoSup = {
            anneePro: anneePro,
            periode: periode
        }

        localStorage.setItem("formData", JSON.stringify(infoGenerales))
        localStorage.setItem("data", JSON.stringify(infoSup))
        navigate(`/dashboard/enseignant/rubrique-evaluation`)
        setDesignation("")
        setDateDebut("")
        setDateFin("")
        setAnneePro("")
        setError("")

        // Supprimer les données du localStorage apres 10 minutes
        setTimeout(
            () => {
                localStorage.removeItem("formData")
            },
            10 * 60 * 1000
        )


    }


    const { promotionList, getPromotionList } = useContext(UEContext) || {};

    useEffect(() => {
        if (getPromotionList) {
            getPromotionList(infoGenerale.codeFormation);
        }
    }, [getPromotionList, infoGenerale.codeFormation]);


    let promotionOptions: PromotionOption[] = [];
    if (promotionList) {
        promotionOptions = promotionList.map((promotion: Promotion) => ({
            value: promotion.anneeUniversitaire,
            label: promotion.anneeUniversitaire,
        }));
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
                        fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                        fontSize: "14px",
                    }}
                >
                <Typography variant="h4" gutterBottom style={textStyle}>
                    Formulaire d'Informations Générales
                </Typography>
                </div>
                <form onSubmit={handleSubmit} style={infoPreDefinie}>
                    {error && <Alert severity="error">{error}</Alert>}

                    <Grid container spacing={2}>
                        <Grid item xs={10} sm={9}>
                            <Typography variant="body1" >
                                <strong>Formation : </strong>{infoGenerale.nomFormation} - {infoGenerale.codeFormation}

                            </Typography>
                        </Grid>



                        <Grid item xs={10} sm={6}>
                            <Typography variant="body1">
                                <strong>Unité enseignement : </strong>{infoGenerale.codeUE}

                            </Typography>
                        </Grid>
                        <Grid item xs={10} sm={6}>
                            {infoGenerale.codeEC &&
                                <Typography variant="body1">
                                    <strong>Elément constitutif : </strong>{infoGenerale.codeEC}

                                </Typography>
                            }
                        </Grid>
                        <Grid item xs={10} sm={6}>
                            <TextField
                                label="Désignation *"
                                variant="outlined"
                                fullWidth
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                error={designationError}
                                helperText={designationError ? 'La désignation ne peut pas être vide.' : ''}
                                style={{
                                    ...textFieldStyle,
                                    borderColor: designationError ? 'red' : '',
                                }}
                            />
                        </Grid>


                        <Grid item xs={10} sm={6}>
                            <TextField
                                label="periode"
                                variant="outlined"
                                fullWidth
                                value={periode}
                                onChange={(e) => setPeriode(e.target.value)}



                                style={{
                                    ...textFieldStyle,
                                    borderColor: designationError ? 'red' : '',
                                }}
                            />
                        </Grid>

                        <Grid item xs={10} sm={4}>

                            <SelectComponent
                                onChange={(selectedAnneeUniversitaire) => {
                                    console.log(selectedAnneeUniversitaire)
                                    setAnneePro(selectedAnneeUniversitaire as string)
                                }}
                                placeholder="Année Universitaire *"
                                name="Année Universitaire"
                                label="Année Universitaire"
                                options={promotionOptions}
                                error={designationError}
                               
                            />

                        </Grid>

                        <Grid item xs={10} sm={4}>
                            <TextField
                                label="Date de début"
                                type="date"
                                variant="outlined"
                                fullWidth
                                value={dateDebut}
                                onChange={(e) => setDateDebut(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={dateDebutError}
                                helperText={dateDebutError ? 'La date de début ne peut pas être vide.' : ''}
                                style={{
                                    ...textFieldStyle,
                                    borderColor: dateDebutError ? 'red' : '',
                                }}
                            />
                        </Grid>
                        <Grid item xs={10} sm={4}>
                            <TextField
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
                                helperText={dateFinError ? 'La date de fin ne peut pas être vide.' : ''}
                                style={{
                                    ...textFieldStyle,
                                    borderColor: dateFinError ? 'red' : '',
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
