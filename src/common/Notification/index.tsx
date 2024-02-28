import React, { useContext } from "react"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { AlertTitle } from "@mui/material"
import { NotificationContext } from "../../context/notificationContext"

const Notification: React.FC = () => {
    const { message, type, title, toggle } = useContext(NotificationContext)
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        if (message && type) {
            // console.log('notif');
            setOpen(true)
        }
    }, [message, type, title, toggle])

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return
        }
        setOpen(false)
    }

    return (
        <>
            {type === "success" && (
                <Snackbar
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    sx={{ zIndex: 10000 }}
                >
                    <Alert
                        onClose={handleClose}
                        severity={"success"}
                        sx={{ width: "100%" }}
                    >
                        <AlertTitle>{title}</AlertTitle>
                        {message}
                    </Alert>
                </Snackbar>
            )}
            {type === "info" && (
                <Snackbar
                    sx={{ zIndex: 10000 }}
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert
                        onClose={handleClose}
                        severity={"info"}
                        sx={{ width: "100%" }}
                    >
                        <AlertTitle>{title}</AlertTitle>
                        {message}
                    </Alert>
                </Snackbar>
            )}
            {type === "warning" && (
                <Snackbar
                    sx={{ zIndex: 10000 }}
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert
                        onClose={handleClose}
                        severity={"warning"}
                        sx={{ width: "100%" }}
                    >
                        <AlertTitle>{title}</AlertTitle>
                        {message}
                    </Alert>
                </Snackbar>
            )}
            {type === "error" && (
                <Snackbar
                    sx={{ zIndex: 10000 }}
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <Alert
                        onClose={handleClose}
                        severity={"error"}
                        sx={{ width: "100%" }}
                    >
                        <AlertTitle>{title}</AlertTitle>
                        {message}
                    </Alert>
                </Snackbar>
            )}
        </>
    )
}

export default Notification
