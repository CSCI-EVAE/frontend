import * as React from "react"
import { useForm } from "react-hook-form"

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
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import ButtonComponent from "../common/Button"
import { ThemeProvider, createTheme } from "@mui/material/styles"

import Header from "../Layout/Header"
import { StepContext } from "../context/stepperContext"

const defaultTheme = createTheme()

interface CommentaireProps {
    handleNomPrenomCommentaire: (
        nom: string,
        prenom: string,
        commentaire: string
    ) => void
    handleSubmit: () => void
}

const CommentaireEvaluation: React.FC<CommentaireProps> = ({
    handleNomPrenomCommentaire,
    handleSubmit,
}) => {
    const { activeStep, handleBack } = React.useContext(StepContext)
    const {
        register,

        handleSubmit: handleSubmitForm,
        formState: { errors },
    } = useForm({
        mode: "all",
    })

    const onSubmit = (data: any) => {
        handleNomPrenomCommentaire(data.nom, data.prenom, data.commentaire)
        handleSubmit()
    }

    return (
        <>
            <Header />
            <ThemeProvider theme={defaultTheme}>
                <form noValidate onSubmit={handleSubmitForm(onSubmit)}>
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
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    marginBottom: "32px",
                                }}
                            >
                                <Avatar
                                    sx={{ m: 1, bgcolor: "secondary.main" }}
                                >
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Complément d'information
                                </Typography>

                                <Grid
                                    container
                                    //component="form"

                                    sx={{
                                        mt: 0,
                                        margin: "auto",
                                        width: "70%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                    spacing={2}
                                >
                                    <Grid item xs={12} sm={12}>
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
                                    <Grid item xs={12} sm={12}>
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
                                    <Grid item xs={12} sm={12}>
                                        <FormControl>
                                            <TextField
                                                //margin="normal"
                                                required
                                                multiline
                                                minRows={3}
                                                id="commentaire"
                                                label="commentaire "
                                                autoComplete="commentaire"
                                                error={!!errors.prenom}
                                                //defaultValue={defaultValues.profession}
                                                {...register("commentaire", {
                                                    required:
                                                        "Le commentaire est obligatoire..",
                                                    validate: (value) =>
                                                        value.trim() !== "" ||
                                                        "Le commentaire ne peut pas être vide",
                                                    maxLength: {
                                                        value: 50,
                                                        message:
                                                            "Le commentaire ne doit pas excéder 50 caractères...!",
                                                    },
                                                })}
                                            />
                                            {typeof errors.commentaire
                                                ?.message === "string" && (
                                                <FormHelperText error>
                                                    {errors.commentaire.message}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                {/* <div>
                                <ButtonComponent
                                    type="submit"
                                    variant="contained"
                                    text="Continuer"

                                    //  disabled={isSubmiting}
                                />
                            </div> */}
                            </Box>
                        </Grid>
                    </Grid>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "20px",
                        }}
                    >
                        <ButtonComponent
                            text="Retour"
                            variant="contained"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                        />
                        <ButtonComponent
                            text="Suivant"
                            variant="contained"
                            type="submit"
                            //onClick={handleValidate}
                        />
                    </div>
                </form>
            </ThemeProvider>
        </>
    )
}

export default CommentaireEvaluation
