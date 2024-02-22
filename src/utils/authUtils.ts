export const hasRole = (requiredRole: string): boolean => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.role && user.role===requiredRole;
};

export const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
};
export const getToken =() : string => {
const token = localStorage.getItem("jwtToken");
if(token){
    return token;
}
return "";

}
export const userInfos = () => {
   // const token = localStorage.getItem("jwtToken");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

 //if (user && token) {
    if (user ) {
    return {
   //     token: token,
        prenom: user.prenom,
        nom: user.nom,
        role: user.role,
    };
        }else {return {
           // token: '',
                prenom: '',
                nom: '',
                role: ''
        }}
};



export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwtToken");
    return !!token ;
    //&& isTokenValid(token);
};

export function isTokenValid(token: string): boolean {
    if (!token) {
        return false; // Le token est vide ou non défini
    }

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
        return false; // Le token n'a pas le format JWT attendu
    }

    try {
        const payload = JSON.parse(atob(tokenParts[1])); // Décodage du payload
        if (!payload || !payload.exp) {
            return false; // Le payload ne contient pas de date d'expiration
        }

        const currentTimestamp = Math.floor(Date.now() / 1000); // Timestamp actuel en secondes
        return currentTimestamp < payload.exp; // Vérifie si la date d'expiration est dans le futur
    } catch (error) {
        console.error("Error decoding or parsing token payload:", error);
        return false; // Erreur lors du décodage ou de l'analyse JSON du payload
    }
}

