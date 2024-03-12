import React, { useContext, useState } from "react"
import { TextField } from "@mui/material"
import ButtonComponent from "../common/Button"
import { useNavigate } from "react-router-dom"
import { userInfos } from "../utils/authUtils"
import { ROLE } from "../constants"
import { AuthContext } from "../context/authContext"
import Notification from "../common/Notification"

interface Props {
    onLoginSuccess: () => void
   
}

const LoginForm: React.FC<Props> = ({ onLoginSuccess}) => {
    const { login } = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const response = await login({ username, password })
            if (response) {
                onLoginSuccess()
                const role = userInfos().role

                if (role === ROLE.admin) {
                    navigate("/dashboard/admin")
                } else if (role === ROLE.enseigannt) {
                    navigate("/dashboard/enseignant")
                } else if (role === ROLE.etudiant) {
                    navigate("/dashboard/etudiant")
                }
            }
           
        } catch (error: any) {
            console.log("Login failed")
            
        }
    }
 
    return (
        <>
        <Notification />

            <form onSubmit={handleSubmit}>
                
                <TextField
                    label="Nom d'utilisateur"
                    variant="outlined"
                    required
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Entrez votre nom d'utilisateur"
                />
                <TextField
                    label="Mot de Passe"
                    type="password"
                    variant="outlined"
                    required
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                />
                <ButtonComponent
                    text="Se Connecter"
                    type="submit"
                    variant="contained"
                />
            </form>
        </>
    )
}

export default LoginForm


