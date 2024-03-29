import axios from "axios"

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwtToken")
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("jwtToken")
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)
