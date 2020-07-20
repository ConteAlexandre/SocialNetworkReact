//Voici une constante qui va nous permettre de s'inscrire en faisant appel a l'url de l'api rest
export const signup = user => {
    return fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        //On lui signale qu'il faut retourner la réponse de l'api si elle esxiste
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
};

//Constante permettant de se connecter avec l'url de l'api pour la bdd
export const signin = user => {
    return fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        //Body nous permet d'enregistrer les données du token
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
};

//Constante qui permet d'enregistrer le token dans le navigateur
export const authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt" , JSON.stringify(jwt));
        next();
    }
};

//Constante qui permet de se deconnecter en supprimer le token qui est dans le navigateur
export const signout = (next) => {
    if (typeof window !== "undefined")  localStorage.removeItem("jwt");
    next();
    return fetch("http://localhost:8080/signout", {
        method: "GET",
    })
        .then(response => {
            console.log("signout", response)
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
};

//Consatnte qui permet de mettre un menu différent si le toekn est existant dans le nav ou pas
export const isAuthenticated = () => {
    if (typeof window == "undefined"){
        return false
    }

    if (localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
};

//Fonction qui permet de faire appel à la méthode dans l'api
export const forgotPassword = email => {
    console.log("email: ", email);
    return fetch(`http://localhost:8080/forgot-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

//Ici la méthode pour reset le password
export const resetPassword = resetInfo => {
    return fetch(`http://localhost:8080/reset-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};