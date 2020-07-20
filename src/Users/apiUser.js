//Ceci est la fonction nous permettant de communiquer avec l'API pour récupérer la partie profile de l'user
export const read = (userId, token) => {
    return  fetch(`http://localhost:8080/profile/${userId}`, {
        //La méthode doit être la même qu'on utilise dans l'API ça peut être POST GET DELETE PUT
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

//La fonction qui nous permet de mettre à jour notre utilisateur dans la bdd grâce à l'appel sur l'API
export const update = (userId, token, user) => {
    // console.log("USER DATA UPDATE: ", user)
    return  fetch(`http://localhost:8080/user/edit/${userId}`, {
        //La méthode doit être la même qu'on utilise dans l'API ça peut être POST GET DELETE PUT
        method: 'PUT',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

//Fonction pour supprimer l'utilisateurs
export const remove = (userId, token) => {
    return  fetch(`http://localhost:8080/user/delete/${userId}`, {
        //La méthode doit être la même qu'on utilise dans l'API ça peut être POST GET DELETE PUT
        method: 'DELETE',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

//Fonction pour récupérer tout les utilisateurs
export const list = () => {
    return  fetch(`http://localhost:8080/users`, {
        //La méthode doit être la même qu'on utilise dans l'API ça peut être POST GET DELETE PUT
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

//Fonction qui nous permet de stocker les modifications dans le stockage du navigateur et du coup d'empeche le déco reco pour vois les modifications
//Pas besoin de l'API car tout se passe côté client
export const updateUser = (user, next) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("jwt")) {
            let auth = JSON.parse(localStorage.getItem('jwt'))
            auth.user = user
            localStorage.setItem('jwt', JSON.stringify(auth))
            next();
        }
    }
}

//Fonction qui permet d'appeler le fait de follow
export const follow = (userId, token, followId) => {
    return  fetch(`http://localhost:8080/user/follow`, {
        //La méthode doit être la même qu'on utilise dans l'API ça peut être POST GET DELETE PUT
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, followId })
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

//Fonction qui permet d'appeler le fait de unfollow
export const unfollow = (userId, token, unfollowId) => {
    return  fetch(`http://localhost:8080/user/unfollow`, {
        //La méthode doit être la même qu'on utilise dans l'API ça peut être POST GET DELETE PUT
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, unfollowId })
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

//Fonction qui nous permet d'appler l'API pour trouver les personnes non follow
export const findPeople = (userId, token) => {
    return  fetch(`http://localhost:8080/user/findpeople/${userId}`, {
        //La méthode doit être la même qu'on utilise dans l'API ça peut être POST GET DELETE PUT
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};