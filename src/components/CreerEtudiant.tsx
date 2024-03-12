import * as React from "react"
import { Controller, useForm } from "react-hook-form"

import {
    Grid,
    Typography,
    Avatar,
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
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import ButtonComponent from "../common/Button"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import SelectComponent from "../common/Select/newSelect"
import { GENDERS, PAYS_OPTIONS, UNIVERSITE_ORIGINE_OPTIONS } from "../constants"
import { EtudiantDTO } from "../types"
import Header from "../Layout/Header"

const defaultTheme = createTheme()

export default function CreerEtudiant() {
    const generateRandomStudentNumber = (length: number) =>
        Array.from({ length }, () => Math.floor(Math.random() * 10)).join("")
    const [universiteError, setUniversiteError] = React.useState("")

    const [universite, setUniversite] = React.useState<string>("")
    const [pays, setPays] = React.useState<string>("")
    const [paysError, setPaysError] = React.useState<string>("")

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
            groupeAnglais: data.groupeAnglais,
            groupeTp: data.groupeTP,
            lieuNaissance: data.lieu,
            mobile: data.mobile,
            nationalite: data.nationalite,
            noEtudiant: generateRandomStudentNumber(8),
            nom: data.nom,
            paysOrigine: pays,
            prenom: data.prenom,
            sexe: data.sexe,
            telephone: data.telephone,
            universiteOrigine: universite,
            ville: data.ville,
        }
        console.log("🚀 ~ onSubmit ~ etudiant:", etudiant)
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
                            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Création d'un étudiant
                            </Typography>

                            <Grid
                                container
                                //component="form"

                                sx={{
                                    mt: 0,
                                    margin: "auto",
                                    width: "70%",
                                }}
                                spacing={2}
                            >
                                <Grid item xs={12} sm={6}>
                                    <FormControl>
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
                                    <FormControl>
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
                                    <FormControl>
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
                                    <FormControl>
                                        <TextField
                                            //margin="normal"
                                            required
                                            id="mailUBO"
                                            label="Adresse mail UBO"
                                            autoComplete="mailUBO"
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
                                    <FormControl>
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
                                                    value: 8,
                                                    message:
                                                        "Le Numéro de téléphone doit avoir au moins 8 caractères...!",
                                                },
                                                maxLength: {
                                                    value: 15,
                                                    message:
                                                        "Le Numéro de téléphone doit avoir au plus 15 caractères...!",
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
                                    <FormControl>
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
                                                    value: 8,
                                                    message:
                                                        "Le Mobile doit avoir au moins 8 caractères...!",
                                                },
                                                maxLength: {
                                                    value: 15,
                                                    message:
                                                        "Le Mobile doit avoir au plus 15 caractères...!",
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
                                    <FormControl>
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
                                    <FormControl>
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
                                    <FormControl>
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
                                    <FormControl>
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
                                                maxLength: {
                                                    value: 10,
                                                    message:
                                                        "Le code Postal ne doit pas excéder 10 caractères...!",
                                                },
                                                pattern: {
                                                    value: /^[0-9]*$/, // Expression régulière pour vérifier que le numéro contient uniquement des chiffres
                                                    message:
                                                        "Le code Postal doit contenir uniquement des chiffres",
                                                },

                                                minLength: {
                                                    value: 1,
                                                    message:
                                                        "Le code Postal doit avoir au moins 1 caractère...!",
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
                                    <FormControl>
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
                                    <FormControl
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
                                    <FormControl
                                        required
                                        sx={{ width: "250px" }}
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
                                        sx={{ width: "250px" }}
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
                                    <FormControl sx={{ width: "250px" }}>
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
                                    <FormControl>
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
                                    <FormControl>
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
                            <div>
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
