import * as React from "react"
import { Controller, useForm } from "react-hook-form"

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
    RadioGroup,
    FormControlLabel,
    Radio,
    InputAdornment,
} from "@mui/material"
import ButtonComponent from "../common/Button"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import SelectComponent from "../common/Select/newSelect"
import { GENDERS, PAYS_OPTIONS, UNIVERSITE_ORIGINE_OPTIONS } from "../constants"
import { EtudiantDTO } from "../types"
import Header from "../Layout/Header"
import { useNavigate, useParams } from "react-router-dom"
import { useContext } from "react"
import { EtudiantListContext } from "../context/etudiantListContext"

const defaultTheme = createTheme()


export default function CreerEtudiant() {
    
    const { codeFormation, anneeUniversitaire } = useParams<{ codeFormation: string, anneeUniversitaire: string }>();
    const {addNewEtudiant} = useContext(EtudiantListContext)
    const [universiteError, setUniversiteError] = React.useState("")

    const [universite, setUniversite] = React.useState<string>("")
    const [pays, setPays] = React.useState<string>("")
    const [paysError, setPaysError] = React.useState<string>("")
    const navigate = useNavigate();

    const {
        register,

        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
    } = useForm({
        mode: "all",
    })
    const validateOtherElements = (data: any) => {
        if (universite === "") {
            setUniversiteError("l'université est obligatoire")
            return
        }
        if (pays === "") {
            setPaysError("Le pays est obligatoire")
            return
        }

        onSubmit(data)
    }
    const onSubmit = (data: any) => {
        const etudiant: EtudiantDTO = {
            adresse: data.adresse,
            codePostal: data.code,
            dateNaissance: data.date,
            email: data.mail,
            emailUbo: data.mailUBO + "@etudiant.univ-brest.fr",
            groupeAnglais: data.groupeAnglais,
            groupeTp: data.groupeTP,
            lieuNaissance: data.lieu,
            mobile: data.mobile,
            nationalite: data.nationalite,
            noEtudiant: data.noEtudiant,
            nom: data.nom,
            paysOrigine: pays,
            prenom: data.prenom,
            sexe: data.sexe,
            telephone: data.telephone,
            universiteOrigine: universite,
            ville: data.ville,
            CodeFormation: codeFormation,
            anneeUniversitaire: anneeUniversitaire
        }
        console.log("🚀 ~ onSubmit ~ etudiant:", etudiant)
        addNewEtudiant(etudiant,anneeUniversitaire, codeFormation)
        navigate(`/dashboard/details-promotion/${codeFormation}/${anneeUniversitaire}`)
        
    }
    const validateDateOfBirth = (date: any) => {
        const sixteenYearsAgo = new Date()
        sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16)
        const inputDate = new Date(date)

        return (
            inputDate <= sixteenYearsAgo ||
            "L'étudiant doit avoir au moins 16 ans pour s'inscrire à l'UBO"
        )
    }


    const textStyle: React.CSSProperties = {
        fontFamily: "cursive",
        color: "#e3a12f",
        marginTop: "50px",
        marginBottom: "50px",
    }

    const styleInput: React.CSSProperties = {
        width: "70%",
        marginLeft: "60px",
        marginTop: "10px"
    }

    return (
        <>

            <Header />
            <ThemeProvider theme={defaultTheme}>
                <Grid
                    container
                    component="main"
                    sx={{
                        mt: "-5",
                        //height: "100vh",
                        display: "flex",
                        justifyContent: "center",

                       paddingBottom: "100px"
                      
                        //width: "500px",
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
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >

                            <Typography component="h1" variant="h4" style={textStyle}>
                                Ajouter un nouveau étudiant
                            </Typography>

                            <Grid
                                container
                                //component="form"

                                sx={{
                                    mt: 0,
                                    margin: "auto",
                                    width: "90%",
                                    marginBottom:"60px"

                                }}
                                spacing={2}
                            >

<Grid item xs={12} sm={6}>
                                    <FormControl style={styleInput}>
                                        <TextField
                                            // margin="normal"
                                            required

                                            id="noEtudiant"
                                            label="No étudiant"
                                            autoComplete="noEtudiant"
                                            error={!!errors.noEtudiant}
                                          
                                            {...register("noEtudiant", {
                                                required:
                                                    "Le numéro étudiant est obligatoire..",
                                                validate: (value) =>
                                                    value.trim() !== "" ||
                                                    "Le numéro étudiant pas être vide",
                                                maxLength: {
                                                    value: 50,
                                                    message:
                                                        "Le numéro étudiant ne doit pas excéder 50 caractères...!",
                                                },
                                            })}
                                        />
                                        {typeof errors.noEtudiant?.message ===
                                            "string" && (
                                                <FormHelperText error>
                                                    {errors.noEtudiant.message}
                                                </FormHelperText>
                                            )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl style={styleInput}>
                                        <TextField
                                            // margin="normal"
                                            required

                                            id="nom"
                                            label="Nom"
                                            autoComplete="nom"
                                            error={!!errors.nom}
                                            //   defaultValue={"nom"}
                                            {...register("nom", {
                                                required:
                                                    "Le nom est obligatoire..",
                                                validate: (value) =>
                                                    value.trim() !== "" ||
                                                    "Le nom ne peut pas être vide",
                                                maxLength: {
                                                    value: 50,
                                                    message:
                                                        "Le nom ne doit pas excéder 50 caractères...!",
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
                                            //defaultValue={defaultValues.profession}
                                            {...register("prenom", {
                                                required:
                                                    "Le prenom est obligatoire..",
                                                validate: (value) =>
                                                    value.trim() !== "" ||
                                                    "Le prenom ne peut pas être vide",
                                                maxLength: {
                                                    value: 50,
                                                    message:
                                                        "Le prenom ne doit pas excéder 50 caractères...!",
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
                                            {...register("mail", {
                                                required:
                                                    "L'adresse mail est obligatoire...!",
                                                pattern: {
                                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message:
                                                        "L'adresse mail doit etre  valide...!",
                                                },
                                                maxLength: {
                                                    value: 255,
                                                    message:
                                                        "L'adresse mail ne doit pas excéder 255 caractères...!",
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
                                            error={!!errors.mailUBO}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">@etudiant.univ-brest.fr</InputAdornment>,
                                            }}
                                            {...register("mailUBO", {
                                                required: "L'adresse mail UBO est obligatoire...!",
                                                pattern: {
                                                      value: /^[^@\s]+$/,
                                                    message: "L'adresse mail UBO doit être valide...!",
                                                },
                                                maxLength: {
                                                    value: 255,
                                                    message: "L'adresse mail UBO ne doit pas excéder 255 caractères...!",
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
                                            //defaultValue={defaultValues.telephone}
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
                                                    value: 10,
                                                    message:
                                                        "Le Numéro de téléphone doit avoir au moins 10 caractères...!",
                                                },
                                                maxLength: {
                                                    value: 20,
                                                    message:
                                                        "Le Numéro de téléphone doit avoir au plus 20 caractères...!",
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
                                            //defaultValue={defaultValues.telephone}
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
                                                    value: 10,
                                                    message:
                                                        "Le Mobile doit avoir au moins 10 caractères...!",
                                                },
                                                maxLength: {
                                                    value: 20,
                                                    message:
                                                        "Le Mobile doit avoir au plus 20 caractères...!",
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
                                            //defaultValue={defaultValues.profession}
                                            {...register("lieu", {
                                                required:
                                                    "Le lieu de Naissance est obligatoire..",
                                                validate: (value) =>
                                                    value.trim() !== "" ||
                                                    "Le lieu de Naissance ne peut pas être vide",
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
                                            //defaultValue={defaultValues.profession}
                                            {...register("nationalite", {
                                                required:
                                                    "La nationalité est obligatoire..",
                                                validate: (value) =>
                                                    value.trim() !== "" ||
                                                    "La nationalité ne peut pas être vide",
                                                maxLength: {
                                                    value: 50,
                                                    message:
                                                        "La nationalité ne doit pas excéder 50 caractères...!",
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
                                            //defaultValue={defaultValues.profession}
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
                                            //defaultValue={defaultValues.profession}
                                            {...register("code", {
                                                required:
                                                    "Le code Postal est obligatoire..",
                                                validate: (value) =>
                                                    value.trim() !== "" ||
                                                    "Le code Postal ne peut pas être vide",
                                                pattern: {
                                                    value: /^[0-9]*$/, // Expression régulière pour vérifier que le numéro contient uniquement des chiffres
                                                    message:
                                                        "Le code Postal doit contenir uniquement des chiffres",
                                                },
                                                maxLength: {
                                                    value: 10,
                                                    message:
                                                        "Le code Postal ne doit pas excéder 10 caractères...!",
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        "Le code Postal doit avoir au moins 3 caractère...!",
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
                                            //defaultValue={defaultValues.profession}
                                            {...register("ville", {
                                                required:
                                                    "La ville est obligatoire..",
                                                validate: (value) =>
                                                    value.trim() !== "" ||
                                                    "La ville ne peut pas être vide",
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
                                    <FormControl  style={styleInput}
                                        error={!!errors.sexe}
                                        component="fieldset"
                                    >
                                        <FormLabel required component="legend">
                                            Sexe
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            {...register("sexe", {
                                                required:
                                                    "Le sexe est obligatoire..",
                                                validate: (value) => {
                                                    if (!value) {
                                                        return "Veuillez sélectionner le sexe."
                                                    }
                                                    return true
                                                },
                                            })}
                                            //defaultValue={defaultValues.sexe}
                                            render={({ field }) => (
                                                <RadioGroup {...field} row>
                                                    <FormControlLabel
                                                        value={
                                                            GENDERS.homme.value
                                                        }
                                                        control={<Radio />}
                                                        label={
                                                            GENDERS.homme.label
                                                        }
                                                    />
                                                    <FormControlLabel
                                                        value={
                                                            GENDERS.femme.value
                                                        }
                                                        control={<Radio />}
                                                        label={
                                                            GENDERS.femme.label
                                                        }
                                                    />
                                                </RadioGroup>
                                            )}
                                        />
                                        {typeof errors.sexe?.message ===
                                            "string" && (
                                                <FormHelperText error>
                                                    {errors.sexe.message}
                                                </FormHelperText>
                                            )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl style={styleInput}
                                        required
                                      
                                        error={!!universite}
                                    >
                                        <SelectComponent
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
                                            //defaultValue={defaultValues.dateDeNaissance}
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
                                    <FormControl style={styleInput}>
                                        <TextField
                                            //margin="normal"
                                            type="number"
                                            required
                                            id="groupeTP"
                                            label="Groupe de TP"
                                            autoComplete="groupeTP"
                                            //defaultValue={defaultValues.description}
                                            //  autoFocus
                                            {...register("groupeTP", {
                                                required:
                                                    "Le groupe de TP est obligatoire...!",
                                                validate: (value) =>
                                                    value.trim() !== "" ||
                                                    "Le groupe de TP ne peut pas être vide",
                                                pattern: {
                                                    value: /^[0-9]*$/, // Expression régulière pour vérifier que le numéro contient uniquement des chiffres
                                                    message:
                                                        "Le groupe TP doit contenir uniquement des chiffres",
                                                },
                                            })}
                                            error={!!errors.groupeTP} // Set error prop based on the presence of errors
                                        />
                                        {typeof errors.groupeTP?.message ===
                                            "string" && (
                                                <FormHelperText error>
                                                    {errors.groupeTP.message}
                                                </FormHelperText>
                                            )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl style={styleInput}>
                                        <TextField
                                            //margin="normal"
                                            type="number"
                                            required
                                            id="groupeAnglais"
                                            label="Groupe d'Anglais"
                                            autoComplete="groupeAnglais"
                                            //defaultValue={defaultValues.description}
                                            //  autoFocus
                                            {...register("groupeAnglais", {
                                                required:
                                                    "Le groupe d'Anglais est obligatoire...!",
                                                validate: (value) =>
                                                    value.trim() !== "" ||
                                                    "Le groupe d'Anglais ne peut pas être vide",
                                                pattern: {
                                                    value: /^[0-9]*$/, // Expression régulière pour vérifier que le numéro contient uniquement des chiffres
                                                    message:
                                                        "Le groupe Anglais doit contenir uniquement des chiffres",
                                                },
                                            })}
                                            error={!!errors.groupeAnglais} // Set error prop based on the presence of errors
                                        />
                                        {typeof errors.groupeAnglais
                                            ?.message === "string" && (
                                                <FormHelperText error>
                                                    {errors.groupeAnglais.message}
                                                </FormHelperText>
                                            )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <div style={{marginBottom:"40px"}}>
                                <ButtonComponent
                                   
                                    type="submit"
                                    variant="contained"
                                    text="Creer"

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
