import * as React from "react"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepButton from "@mui/material/StepButton"
import Typography from "@mui/material/Typography"
import { StepContext } from "../../context/stepperContext"

interface StepperComponentProps {
    stepsCount: number
    children: React.ReactNode[]
}

const StepperComponent: React.FC<StepperComponentProps> = ({
    stepsCount,
    children,
}) => {
    const {
        activeStep,

        handleStep,

        completed,
        updateTotalStep,
    } = React.useContext(StepContext)

    React.useEffect(() => {
        updateTotalStep(stepsCount)
    })

    return (
        <div
            style={{
                maxWidth: "90%",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box sx={{ width: "100%" }}>
                <Stepper nonLinear activeStep={activeStep}>
                    {[...Array(stepsCount)].map((_, index) => (
                        <Step key={index} completed={completed[index]}>
                            <StepButton
                                color="inherit"
                                onClick={handleStep(index)}
                                disabled={!completed[index]}
                            >
                                {index + 1}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                            Step {activeStep + 1}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                pt: 2,
                            }}
                        ></Box>
                    </React.Fragment>
                </div>
                <div>{children[activeStep]}</div>
            </Box>
        </div>
    )
}
export default StepperComponent
