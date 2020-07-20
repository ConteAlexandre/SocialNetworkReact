//Constante qui nous permet de faire appel a l'api pour créer des post
export const create = (userId, token, post) => {
    return  fetch(`http://localhost:8080/post/create/${userId}`, {
        //La méthode doit être la même qu'on utilise dans l'API ça peut être POST GET DELETE PUT
        method: 'POST',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

//Constante pour récup les post en bdd
export const list = () => {
    return  fetch(`http://localhost:8080/posts`, {
        //La méthode doit être la même qu'on utilise dans l'API ça peut être POST GET DELETE PUT
        method: 'GET',
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

//Constante pour récup un seul post par son id
export const singlePost = (postId) => {
    return  fetch(`http://localhost:8080/post/${postId}`, {
        //La méthode doit être la même qu'on utilise dans l'API ça peut être POST GET DELETE PUT
        method: 'GET',
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

//Consntante pour récupérer les post selon un utilisateur
export const listByUser = (userId, token) => {
    return fetch(`http://localhost:8080/posts/by/${userId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
};

//Constante pour supprimer un post
export const remove = (postId, token) => {
    return  fetch(`http://localhost:8080/post/delete/${postId}`, {
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

//constante pour modif un post
export const update = (postId, token, post) => {
    console.log("USER DATA UPDATE: ", post)
    return  fetch(`http://localhost:8080/post/edit/${postId}`, {
        //La méthode doit être la même qu'on utilise dans l'API ça peut être POST GET DELETE PUT
        method: 'PUT',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

//Constante qui permet de faire appel a l'api pour aime un post
export const like = (userId, token, postId) => {
    return  fetch(`http://localhost:8080/post/like`, {
        //La méthode doit être la même qu'on utilise dans l'API ça peut être POST GET DELETE PUT
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId })
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

//Constante qui fait l'inverse du dessus
export const unlike = (userId, token, postId) => {
    return  fetch(`http://localhost:8080/post/unlike`, {
        //La méthode doit être la même qu'on utilise dans l'API ça peut être POST GET DELETE PUT
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId })
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

//Constante pour ajouter un commentaire
export const comment = (userId, token, postId, comment) => {
    return  fetch(`http://localhost:8080/post/comment`, {
        //La méthode doit être la même qu'on utilise dans l'API ça peut être POST GET DELETE PUT
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId, comment })
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

//Constante pour supprimer le commentaire
export const uncomment = (userId, token, postId, comment) => {
    return  fetch(`http://localhost:8080/post/uncomment`, {
        //La méthode doit être la même qu'on utilise dans l'API ça peut être POST GET DELETE PUT
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId, comment })
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};