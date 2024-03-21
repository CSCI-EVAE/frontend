import * as React from "react"
import { useForm } from "react-hook-form"

import {
    Grid,
    Typography,
    Paper,
    Box,
    CssBaseline,
    TextField,
    FormControl,
    FormHelperText,
    FormLabel,
} from "@mui/material"
import ButtonComponent from "../common/Button"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import SelectComponent from "../common/Select/newSelect"
import { PAYS_OPTIONS, UNIVERSITE_ORIGINE_OPTIONS } from "../constants"
import { EtudiantDTO } from "../types"
import Header from "../Layout/Header"
import { useNavigate, useParams } from "react-router-dom"
import { EtudiantListContext } from "../context/etudiantListContext"
import Sidebar from "../Layout/sideBar/SidebarPage"
import { KeyboardBackspace } from "@mui/icons-material"

const defaultTheme = createTheme()
export function contientChiffre(chaine: string) {
    return /\d/.test(chaine)
}
export default function ModifierEtudiant() {
    const etudiantContext = React.useContext(EtudiantListContext)
    const { noEtudiant = "" } = useParams<{ noEtudiant?: string }>()
    const [universiteError, setUniversiteError] = React.useState("")
    const [universite, setUniversite] = React.useState<string>("")
    const [pays, setPays] = React.useState<string>("")
    const [paysError, setPaysError] = React.useState<string>("")
    const [etudiant, setEtudiant] = React.useState<EtudiantDTO>()
    const { codeFormation, anneeUniversitaire } = useParams<{
        codeFormation: string
        anneeUniversitaire: string
    }>()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const etud = await etudiantContext.getEtudiant(noEtudiant)
                console.log(etud)
                setUniversite(etud.universiteOrigine)
                setPays(etud.paysOrigine)
                setEtudiant(etud)
                setGroupeAnglais(String(etud.groupeAnglais))
                setGroupeTp(String(etud.groupeTp))
                setIsLoading(false) // Data fetching is completed
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des données de l'étudiant:",
                    error
                )
                setIsLoading(false) // Handle errors and set isLoading to false
            }
        }

        fetchData()
    }, [noEtudiant, etudiantContext])

    React.useEffect(() => {
        console.log(etudiant)
    }, [etudiant])
    const {
        register,

        handleSubmit: handleSubmitForm,
        formState: { errors },
    } = useForm({
        mode: "all",
    })
    const [sexe, setSexe] = React.useState(etudiant?.sexe)
    React.useEffect(() => {
        setSexe(etudiant?.sexe)
    }, [etudiant])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSexe(event.target.value)
    }

    const [sexeError, setSexeError] = React.useState("")

    const [groupeTp, setGroupeTp] = React.useState("0")
    const [groupeTpError, setGroupeTpError] = React.useState("")
    const [groupeAnglais, setGroupeAnglais] = React.useState("0")
    const [groupeAnglaisError, setGroupeAnglaisError] = React.useState("")

    const validateOtherElements = (data: any) => {
        if (universite === "") {
            setUniversiteError("l'université est obligatoire")
            return
        }
        if (pays === "") {
            setPaysError("Le pays est obligatoire")
            return
        }
        if (sexe === "") {
            setSexeError("Le sexe est obligatoire")
            return
        }
        if (groupeTp === "0") {
            setGroupeTpError("Le groupe de Tp est obligatoire")
            return
        }
        if (groupeAnglais === "0") {
            setGroupeAnglaisError("Le groupe de Tp est obligatoire")
            return
        }

        // setVilleError("");
        onSubmit(data)
    }
    const onSubmit = (data: any) => {
        const etudiant: EtudiantDTO = {
            adresse: data.adresse,
            codePostal: data.code,
            dateNaissance: data.date,
            email: data.mail,
            emailUbo: data.mailUBO,
            groupeAnglais: Number(groupeAnglais),
            groupeTp: Number(groupeTp),
            lieuNaissance: data.lieu,
            mobile: data.mobile,
            nationalite: data.nationalite,
            nom: data.nom,
            paysOrigine: pays,
            prenom: data.prenom,
            sexe: sexe ?? "",
            telephone: data.telephone,
            universiteOrigine: universite,
            ville: data.ville,
            anneeUniversitaire: anneeUniversitaire,
            CodeFormation: codeFormation,
            noEtudiant: noEtudiant,
        }

        etudiantContext.modifyEtudiant(
            noEtudiant,
            etudiant,
            anneeUniversitaire,
            codeFormation
        )
        navigate(
            `/dashboard/details-promotion/${codeFormation}/${anneeUniversitaire}`
        )
    }

    // Conditional rendering based on isLoading
    if (isLoading) {
        return <div>Loading...</div>
    }

    const validateDateOfBirth = (date: any) => {
        const eighteenYearsAgo = new Date()
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear())
        const inputDate = new Date(date)

        return (
            inputDate <= eighteenYearsAgo ||
            "La date ne peut pas etre inférieure à la date actuelle."
        )
    }
    const validateNationalite = (value: string) => {
        if (value.trim() === "") return "La nationalité ne peut pas être vide"
        if (contientChiffre(value))
            return "La nationalité ne doit pas contenir des chiffres."

        return true
    }
    const validateVille = (value: string) => {
        if (value.trim() === "") return "La ville ne peut pas être vide"
        if (contientChiffre(value))
            return "La ville ne doit pas contenir des chiffres."

        return true
    }
    const validateLieu = (value: string) => {
        if (value.trim() === "")
            return "Le lieu de naissance ne peut pas être vide"
        if (contientChiffre(value))
            return "Le lieu de naissance ne doit pas contenir des chiffres."

        return true
    }
    const styleInput: React.CSSProperties = {
        width: "70%",
        marginLeft: "60px",
        marginTop: "10px",
    }

    const textStyle: React.CSSProperties = {
        fontFamily: "cursive",
        color: "#e3a12f",
        marginTop: "50px",
        marginBottom: "50px",
    }

    return (
        <>
            <Sidebar />
            <Header />
            <ThemeProvider theme={defaultTheme}>
                <div
                    style={{
                        maxWidth: "90%",
                        marginLeft: "100px",
                        marginBottom: "48px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}
                >
                    <ButtonComponent
                        text="Retour"
                        variant="contained"
                        icon={<KeyboardBackspace />}
                        onClick={() => {
                            navigate(
                                `/dashboard/details-promotion/${codeFormation}/${anneeUniversitaire}`
                            )
                        }}
                    />
                </div>
                <Grid
                    container
                    component="main"
                    sx={{
                        mt: "-5",
                        //height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        //width: "500px",
                        paddingBottom: "100px",
                    }}
                >
                    <CssBaseline />

                    <Grid
                        item
                        //xs={12}
                        //sm={8}
                        md={8}
                        component={Paper}
                        elevation={6}
                        square
                    >
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmitForm(validateOtherElements)}
                            sx={{
                                //my: 1,
                                //mx: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                style={textStyle}
                            >
                                Modifier un étudiant
                            </Typography>

                            <Grid
                                container
                                sx={{
                                    mt: 0,
                                    margin: "auto",
                                    width: "90%",
                                    marginBottom: "60px",
                                }}
                                spacing={2}
                            >
                                <Grid item xs={12} sm={6}>
                                    <FormControl style={styleInput}>
                                        <TextField
                                            // margin="normal"
                                            required
                                            id="nom"
                                            label="Nom"
                                            autoComplete="nom"
                                            error={!!errors.nom}
                                            defaultValue={
                                                etudiant ? etudiant.nom : ""
                                            }
                                            {...register("nom", {
                                                required:
                                                    "Le nom est obligatoire..",
                                                validate: (value) =>
                                                    value.trim() !== "" ||
                                                    "Le nom ne peut pas être vide",
                                                maxLength: {
                                                    value: 255,
                                                    message:
                                                        "Le nom ne doit pas excéder 255 caractères...!",
                                                },
                                            })}
                                        />
                                        {typeof errors.nom?.message ===
                                            "string" && (
                                            <FormHelperText error>
                                                {errors.nom.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl style={styleInput}>
                                        <TextField
                                            //margin="normal"
                                            required
                                            id="prenom"
                                            label="Prénom "
                                            autoComplete="prenom"
                                            error={!!errors.prenom}
                                            defaultValue={
                                                etudiant ? etudiant.prenom : ""
                                            }
                                            {...register("prenom", {
                                                required:
                                                    "Le prenom est obligatoire..",
                                                validate: (value) =>
                                                    value.trim() !== "" ||
                                                    "Le prenom ne peut pas être vide",
                                                maxLength: {
                                                    value: 255,
                                                    message:
                                                        "Le prenom ne doit pas excéder 255 caractères...!",
                                                },
                                            })}
                                        />
                                        {typeof errors.prenom?.message ===
                                            "string" && (
                                            <FormHelperText error>
                                                {errors.prenom.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl style={styleInput}>
                                        <TextField
                                            //margin="normal"
                                            required
                                            id="mail"
                                            label="Adresse mail"
                                            autoComplete="mail"
                                            error={!!errors.mail}
                                            defaultValue={
                                                etudiant ? etudiant.email : ""
                                            }
                                            {...register("mail", {
                                                required:
                                                    "L'adresse mail est obligatoire...!",
                                                pattern: {
                                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message:
                                                        "L'adresse mail doit etre  valide...!",
                                                },
                                            })}
                                        />
                                        {typeof errors.mail?.message ===
                                            "string" && (
                                            <FormHelperText error>
                                                {errors.mail.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl style={styleInput}>
                                        <TextField
                                            //margin="normal"
                                            required
                                            id="mailUBO"
                                            label="Adresse mail UBO"
                                            autoComplete="mailUBO"
                                            defaultValue={
                                                etudiant
                                                    ? etudiant.emailUbo
                                                    : ""
                                            }
                                            error={!!errors.mailUBO}
                                            {...register("mailUBO", {
                                                required:
                                                    "L'adresse mail UBO est obligatoire...!",
                                                pattern: {
                                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message:
                                                        "L'adresse mail UBO doit etre  valide...!",
                                                },
                                            })}
                                        />
                                        {typeof errors.mailUBO?.message ===
                                            "string" && (
                                            <FormHelperText error>
                                                {errors.mailUBO.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl style={styleInput}>
                                        <TextField
                                            //margin="normal"
                                            type="tel"
                                            required
                                            id="telephone"
                                            label="Numéro de téléphone"
                                            autoComplete="telephone"
                                            defaultValue={
                                                etudiant
                                                    ? etudiant.telephone
                                                    : ""
                                            }
                                            // autoFocus
                                            {...register("telephone", {
                                                required:
                                                    "Le Numéro de téléphone est obligatoire...!",
                                                validate: (value) =>
                                                    value.trim() !== "" ||
                                                    "Le Numéro de téléphone ne peut pas être vide",
                                                pattern: {
                                                    value: /^[0-9]*$/, // Expression régulière pour vérifier que le numéro contient uniquement des chiffres
                                                    message:
                                                        "Le numéro de téléphone doit contenir uniquement des chiffres",
                                                },

                                                minLength: {
                                                    value: 8,
                                                    message:
                                                        "Le Numéro de téléphone doit avoir au moins 8 caractères...!",
                                                },
                                                maxLength: {
                                                    value: 13,
                                                    message:
                                                        "Le Numéro de téléphone doit avoir au plus 13 caractères...!",
                                                },
                                            })}
                                            error={!!errors.telephone} // Set error prop based on the presence of errors
                                        />
                                        {typeof errors.telephone?.message ===
                                            "string" && (
                                            <FormHelperText error>
                                                {errors.telephone.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl style={styleInput}>
                                        <TextField
                                            //margin="normal"
                                            type="mobile"
                                            required
                                            id="mobile"
                                            label="Mobile"
                                            autoComplete="mobile"
                                            defaultValue={
                                                etudiant ? etudiant.mobile : ""
                                            }
                                            // autoFocus
                                            {...register("mobile", {
                                                required:
                                                    "Le Mobile est obligatoire...!",
                                                validate: (value) =>
                                                    value.trim() !== "" ||
                                                    "Le Mobile ne peut pas être vide",
                                                pattern: {
                                                    value: /^[0-9]*$/, // Expression régulière pour vérifier que le numéro contient uniquement des chiffres
                                                    message:
                                                        "Le mobile doit contenir uniquement des chiffres",
                                                },

                                                minLength: {
                                                    value: 8,
                                                    message:
                                                        "Le Mobile doit avoir au moins 8 caractères...!",
                                                },
                                                maxLength: {
                                                    value: 13,
                                                    message:
                                                        "Le Mobile doit avoir au plus 13 caractères...!",
                                                },
                                            })}
                                            error={!!errors.mobile} // Set error prop based on the presence of errors
                                        />
                                        {typeof errors.mobile?.message ===
                                            "string" && (
                                            <FormHelperText error>
                                                {errors.mobile.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl style={styleInput}>
                                        <TextField
                                            //margin="normal"
                                            required
                                            id="lieu"
                                            label="Lieu de Naissance"
                                            autoComplete="lieu"
                                            error={!!errors.lieu}
                                            defaultValue={
                                                etudiant
                                                    ? etudiant.lieuNaissance
                                                    : ""
                                            }
                                            {...register("lieu", {
                                                required:
                                                    "Le lieu de Naissance est obligatoire..",
                                                validate: validateLieu,

                                                maxLength: {
                                                    value: 255,
                                                    message:
                                                        "Le lieu de Naissance ne doit pas excéder 255 caractères...!",
                                                },
                                            })}
                                        />
                                        {typeof errors.lieu?.message ===
                                            "string" && (
                                            <FormHelperText error>
                                                {errors.lieu.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl style={styleInput}>
                                        <TextField
                                            //margin="normal"
                                            required
                                            id="nationalite"
                                            label="Nationalité"
                                            autoComplete="nationalité"
                                            error={!!errors.nationalité}
                                            defaultValue={
                                                etudiant
                                                    ? etudiant.nationalite
                                                    : ""
                                            }
                                            {...register("nationalite", {
                                                required:
                                                    "La nationalité est obligatoire..",
                                                validate: validateNationalite,
                                                maxLength: {
                                                    value: 255,
                                                    message:
                                                        "La nationalité ne doit pas excéder 255 caractères...!",
                                                },
                                            })}
                                        />
                                        {typeof errors.nationalite?.message ===
                                            "string" && (
                                            <FormHelperText error>
                                                {errors.nationalite.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl style={styleInput}>
                                        <TextField
                                            //margin="normal"
                                            required
                                            id="adresse"
                                            label="Adresse"
                                            autoComplete="adresse"
                                            error={!!errors.adresse}
                                            defaultValue={
                                                etudiant ? etudiant.adresse : ""
                                            }
                                            {...register("adresse", {
                                                required:
                                                    "L'adresse est obligatoire..",
                                                validate: (value) =>
                                                    value.trim() !== "" ||
                                                    "L'adresse ne peut pas être vide",
                                                maxLength: {
                                                    value: 255,
                                                    message:
                                                        "L'adresse ne doit pas excéder 255 caractères...!",
                                                },
                                            })}
                                        />
                                        {typeof errors.adresse?.message ===
                                            "string" && (
                                            <FormHelperText error>
                                                {errors.adresse.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl style={styleInput}>
                                        <TextField
                                            //margin="normal"
                                            required
                                            id="code"
                                            label="Code Postal"
                                            autoComplete="code"
                                            error={!!errors.code}
                                            defaultValue={
                                                etudiant
                                                    ? etudiant.codePostal
                                                    : ""
                                            }
                                            {...register("code", {
                                                required:
                                                    "Le code Postal est obligatoire..",
                                                validate: (value) =>
                                                    value.trim() !== "" ||
                                                    "Le code Postal ne peut pas être vide",
                                                maxLength: {
                                                    value: 5,
                                                    message:
                                                        "Le code Postal ne doit pas excéder 5 caractères...!",
                                                },
                                                pattern: {
                                                    value: /^[0-9]*$/, // Expression régulière pour vérifier que le numéro contient uniquement des chiffres
                                                    message:
                                                        "Le code Postal doit contenir uniquement des chiffres",
                                                },

                                                minLength: {
                                                    value: 5,
                                                    message:
                                                        "Le code Postal doit avoir au moins 5 caractère...!",
                                                },
                                            })}
                                        />
                                        {typeof errors.code?.message ===
                                            "string" && (
                                            <FormHelperText error>
                                                {errors.code.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl style={styleInput}>
                                        <TextField
                                            //margin="normal"
                                            required
                                            id="ville"
                                            label="Ville"
                                            autoComplete="ville"
                                            error={!!errors.ville}
                                            defaultValue={
                                                etudiant ? etudiant.ville : ""
                                            }
                                            {...register("ville", {
                                                required:
                                                    "La ville est obligatoire..",
                                                validate: validateVille,
                                                maxLength: {
                                                    value: 255,
                                                    message:
                                                        "La ville ne doit pas excéder 255 caractères...!",
                                                },
                                            })}
                                        />
                                        {typeof errors.ville?.message ===
                                            "string" && (
                                            <FormHelperText error>
                                                {errors.ville.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        style={styleInput}
                                        error={!!errors.sexe}
                                        component="fieldset"
                                    >
                                        <FormLabel required component="legend">
                                            Sexe
                                        </FormLabel>

                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                            }}
                                        >
                                            <label
                                                style={{
                                                    marginLeft: "10px",
                                                    marginRight: "10px",
                                                }}
                                            >
                                                <input
                                                    style={{
                                                        marginRight: "12px",
                                                    }}
                                                    type="radio"
                                                    value="H"
                                                    checked={sexe === "H"}
                                                    onChange={handleChange}
                                                />
                                                Homme
                                            </label>
                                            <br />
                                            <label>
                                                <input
                                                    style={{
                                                        marginRight: "12px",
                                                    }}
                                                    type="radio"
                                                    value="F"
                                                    checked={sexe === "F"}
                                                    onChange={handleChange}
                                                />
                                                Femme
                                            </label>
                                            <br />
                                        </div>
                                        {sexeError !== "" && (
                                            <FormHelperText error>
                                                {sexeError}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        required
                                        style={styleInput}
                                        error={!!universite}
                                    >
                                        <SelectComponent
                                            defaultValue={
                                                etudiant?.universiteOrigine
                                            }
                                            onChange={(selectedValue) => {
                                                setUniversite(
                                                    selectedValue as string
                                                )
                                            }}
                                            placeholder="Université d'origine"
                                            name="universite"
                                            label="Université d'origine"
                                            options={UNIVERSITE_ORIGINE_OPTIONS}
                                        />
                                        {universiteError !== "" && (
                                            <FormHelperText error>
                                                {universiteError}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        required
                                        style={styleInput}
                                        error={!!pays}
                                    >
                                        <SelectComponent
                                            defaultValue={etudiant?.paysOrigine}
                                            onChange={(selectedValue) => {
                                                setPays(selectedValue as string)
                                            }}
                                            placeholder="Pays"
                                            name="pays"
                                            label="Pays d'origine"
                                            options={PAYS_OPTIONS}
                                        />
                                        {paysError !== "" && (
                                            <FormHelperText error>
                                                {paysError}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl style={styleInput}>
                                        <TextField
                                            //margin="normal"
                                            type="date"
                                            required
                                            id="date"
                                            label="Date de Naissance"
                                            autoComplete="date"
                                            defaultValue={
                                                etudiant
                                                    ? etudiant.dateNaissance
                                                    : ""
                                            }
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            error={!!errors.date}
                                            {...register("date", {
                                                required:
                                                    "La date est obligatoire...!",
                                                validate: validateDateOfBirth,
                                            })}
                                        />
                                        {typeof errors.date?.message ===
                                            "string" && (
                                            <FormHelperText error>
                                                {errors.date.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        required
                                        style={styleInput}
                                        error={!!groupeTpError}
                                    >
                                        <SelectComponent
                                            defaultValue={String(
                                                etudiant?.groupeTp
                                            )}
                                            onChange={(selectedValue) => {
                                                setGroupeTp(
                                                    selectedValue as string
                                                )
                                            }}
                                            placeholder="Groupe TP"
                                            name="groupeTP"
                                            label="Groupe de Tp *"
                                            options={[
                                                {
                                                    label: "Groupe 1",
                                                    value: "1",
                                                },
                                                {
                                                    label: "Groupe 2",
                                                    value: "2",
                                                },
                                            ]}
                                            value={groupeTp}
                                        />
                                        {groupeTpError !== "" && (
                                            <FormHelperText error>
                                                {groupeTpError}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        required
                                        style={styleInput}
                                        error={!!groupeAnglaisError}
                                    >
                                        <SelectComponent
                                            defaultValue={"1"}
                                            onChange={(selectedValue) => {
                                                setGroupeAnglais(
                                                    selectedValue as string
                                                )
                                            }}
                                            placeholder="Groupe d'Anglais"
                                            name="groupeAnglais"
                                            label="Groupe d'anglais*"
                                            options={[
                                                {
                                                    label: "Groupe 1",
                                                    value: "1",
                                                },
                                                {
                                                    label: "Groupe 2",
                                                    value: "2",
                                                },
                                            ]}
                                            value={groupeAnglais}
                                        />
                                        {groupeAnglaisError !== "" && (
                                            <FormHelperText error>
                                                {groupeAnglaisError}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <div style={{ marginBottom: "40px" }}>
                                <ButtonComponent
                                    type="submit"
                                    variant="contained"
                                    text="Modifier"

                                    //  disabled={isSubmiting}
                                />
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}
