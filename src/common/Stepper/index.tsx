import * as React from "react"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepButton from "@mui/material/StepButton"
import { StepContext } from "../../context/stepperContext"

import { styled } from "@mui/material/styles"

import StepLabel from "@mui/material/StepLabel"
import Check from "@mui/icons-material/Check"

import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector"
import { StepIconProps } from "@mui/material/StepIcon"
const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: "calc(-50% + 16px)",
        right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#784af4",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#784af4",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderTopWidth: 3,
        borderRadius: 1,
    },
}))

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color:
            theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
        display: "flex",
        height: 22,
        alignItems: "center",
        ...(ownerState.active && {
            color: "#784af4",
        }),
        "& .QontoStepIcon-completedIcon": {
            color: "#784af4",
            zIndex: 1,
            fontSize: 32,
        },
        "& .QontoStepIcon-circle": {
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "currentColor",
        },
    })
)

function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    )
}

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
                <Stepper
                    nonLinear
                    activeStep={activeStep}
                    connector={<QontoConnector />}
                >
                    {[...Array(stepsCount)].map((_, index) => (
                        <Step key={index} completed={completed[index]}>
                            <StepButton
                                sx={{ color: "#000" }}
                                onClick={handleStep(index)}
                                disabled={!completed[index]}
                            >
                                <StepLabel StepIconComponent={QontoStepIcon}>
                                    Etape {index + 1}
                                </StepLabel>
                                {/* {index + 1}lk */}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>

                <div style={{ marginTop: "72px", marginBottom: "72px" }}>
                    {children[activeStep]}
                </div>
            </Box>
        </div>
    )
}
export default StepperComponent
