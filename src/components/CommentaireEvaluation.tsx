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
} from "@mui/material"
import ButtonComponent from "../common/Button"
import { ThemeProvider, createTheme } from "@mui/material/styles"

import Header from "../Layout/Header"
import { StepContext } from "../context/stepperContext"
import { ReponseEvaluation } from "../types"
import { COLORS } from "../constants"
import { EvaluationEtudiantContext } from "../context/evaluationEtudiantContext"

const defaultTheme = createTheme()

interface CommentaireProps {
    handleSubmit: () => void
}

const CommentaireEvaluation: React.FC<CommentaireProps> = ({
    handleSubmit,
}) => {
    const { activeStep, handleBack } = React.useContext(StepContext)
    const { updateNomPrenomCommentaire } = React.useContext(
        EvaluationEtudiantContext
    )

    const {
        register,

        handleSubmit: handleSubmitForm,
        formState: { errors },
    } = useForm({
        mode: "all",
    })

    const [nomDefault, setNomDefault] = React.useState<string>("")
    const [prenomDefault, setPrenomDefault] = React.useState<string>("")
    const [commentaireDefault, setCommentaireDefault] =
        React.useState<string>("")
    React.useEffect(() => {
        const rep = localStorage.getItem("reponseEvaluation")

        if (rep) {
            const evae: ReponseEvaluation = JSON.parse(rep)
            console.log("🚀 ~ React.useEffect ~ evae.nom:", evae.nom)
            setNomDefault(evae.nom)
            setPrenomDefault(evae.prenom)
            setCommentaireDefault(evae.commentaire)
        }
    }, [])
    const onSubmit = (data: any) => {
        updateNomPrenomCommentaire(data.nom, data.prenom, data.commentaire)
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
                                    marginBottom: "96px",
                                    marginTop: "48px",
                                }}
                            >
                                <Typography
                                    style={{
                                        margin: "16px",
                                        color: COLORS.color3,
                                    }}
                                    component="h1"
                                    variant="h5"
                                >
                                    Complément d'information (OPTIONNEL)
                                </Typography>

                                <Grid
                                    container
                                    //component="form"

                                    sx={{
                                        mt: 0,
                                        margin: "auto",
                                        width: "70%",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    spacing={2}
                                >
                                    <Grid item xs={3} sm={3}>
                                        <FormControl>
                                            <TextField
                                                // margin="normal"

                                                id="nom"
                                                label="Nom"
                                                defaultValue={nomDefault}
                                                autoComplete="nom"
                                                error={!!errors.nom}
                                                //   defaultValue={"nom"}
                                                {...register("nom")}
                                            />
                                            {typeof errors.nom?.message ===
                                                "string" && (
                                                <FormHelperText error>
                                                    {errors.nom.message}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3} sm={3}>
                                        <FormControl>
                                            <TextField
                                                id="prenom"
                                                label="Prénom "
                                                defaultValue={prenomDefault}
                                                autoComplete="prenom"
                                                error={!!errors.prenom}
                                                //defaultValue={defaultValues.profession}
                                                {...register("prenom")}
                                            />
                                            {typeof errors.prenom?.message ===
                                                "string" && (
                                                <FormHelperText error>
                                                    {errors.prenom.message}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <FormControl>
                                            <TextField
                                                multiline
                                                //  minRows={3}
                                                defaultValue={
                                                    commentaireDefault
                                                }
                                                id="commentaire"
                                                label="Commentaire "
                                                autoComplete="commentaire"
                                                error={!!errors.prenom}
                                                //defaultValue={defaultValues.profession}
                                                {...register("commentaire")}
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
