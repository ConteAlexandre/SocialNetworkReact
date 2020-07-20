import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCardImage } from "mdbreact";
import {isAuthenticated} from "../auth";
import {read, update, updateUser} from "./apiUser";
import DefaultAvatar from '../img/avatar.png'

class EditProfile extends Component {

    //On établi nos état qui seront amené à être changé
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            email: "",
            about: "",
            password: "",
            error: "",
            fileSize: 0,
            redirectToProfile: false
        }
    }


    //Voici la fonction qui nous permet de rendre les infos utilisateurs que l'on connait déjà
    init = (userId) => {
        const token = isAuthenticated().token
        read(userId, token)
            .then(data => {
                if (data.error) {
                    this.setState({redirectToProfile: true})
                } else {
                    this.setState({
                        id: data._id,
                        name: data.name,
                        email: data.email,
                        about: data.about,
                        error: ""
                    })
                }
            })
    }

    componentDidMount() {
        this.userData = new FormData()
        const userId = this.props.match.params._id;
        this.init(userId)
    }

    //Fonction qui nous permet d'établir les validations sur les champs
    isValid = () => {
        const { name, email, password, fileSize } = this.state

        if (fileSize > 2000000) {
            this.setState({ error: 'L\'image doit faire moins de 2mb' })
            return false
        }

        if (name.length < 4) {
            this.setState({ error: 'Le nom doit être composé de 4 caractères minimum' })
            return false
        }

        if (!/^\w+(]?\w+)*@\w+(]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({ error: 'L\'email doit être valide' })
            return false
        }

        if (password.length >= 1 && password.length <= 2) {
            this.setState({ error: 'Le mot de passe doit contenir au moins 2 caractères' })
            return false
        }

        return true

    }

    //Contante qui permet de modifier la valeur en fonction du champs du formulaire
    handleChange = (name) => (event) => {
        this.setState({ error: "" })
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        const fileSize = name === 'photo' ? event.target.files[0].size : 0
        this.userData.set(name, value)
        this.setState({[name]: value, fileSize })
    }

    //Fonction qui détermine ce qui se passe quand on clique sur connecter
    clickSubmit = event => {
        event.preventDefault();
        if (this.isValid()) {
            // console.log(user)
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token
            update(userId, token, this.userData)
                .then(data => {
                    if (data.error) this.setState({error: data.error });
                    else
                        updateUser(data, () => {
                            this.setState({
                                redirectToProfile: true
                            })
                        })
                })
        }
    }

    //Voici notre formulaire pour editer son profil
    editForm = (name, email, password, about) => (
        <form>
            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                Avatar
            </label>
            <input
                onChange={this.handleChange("photo")}
                type="file"
                accept={"image/*"}
                id="defaultFormRegisterNameEx"
                className="form-control"
            />
            <br />
            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                Votre nom
            </label>
            <input
                onChange={this.handleChange("name")}
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control"
                value={name}
            />
            <br />
            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                Votre email
            </label>
            <input
                onChange={this.handleChange("email")}
                type="email"
                id="defaultFormRegisterEmailEx"
                className="form-control"
                value={email}
            />
            <br />
            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                Votre description
            </label>
            <textarea
                onChange={this.handleChange("about")}
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control"
                value={about}
            />
            <br />
            <label
                htmlFor="defaultFormRegisterPasswordEx"
                className="grey-text"
            >
                Votre mot de passe
            </label>
            <input
                onChange={this.handleChange("password")}
                type="password"
                id="defaultFormRegisterPasswordEx"
                className="form-control"
                value={password}
            />
            <div className="text-center mt-4">
                <MDBBtn
                    color="unique"
                    type="submit"
                    onClick={this.clickSubmit}
                >
                    Modifier
                </MDBBtn>
            </div>
        </form>
    )

    render() {

        const { id, name, email, about, password, redirectToProfile, error } = this.state

        if (redirectToProfile) return <Redirect to={`/profile/${id}`}/>

        //Cette constante nous permet de récupérer la photo de l'user qui l'as upload et si y en a pas alors photo par defaut
        const photourl = id ? `http://localhost:8080/user/photo/${id}?${new Date().getTime()}` : DefaultAvatar

        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6" className={"text-center"}>
                        <p className="h4 text-center mb-4">Modifier Profile</p>
                        <div
                            className={"alert alert-primary"}
                            style={{ display: error ? "" : "none" }}
                        >
                            {error}
                        </div>

                        <MDBCardImage
                            top
                            src={photourl}
                            onError={i => i.target.src = `${DefaultAvatar}`}
                            alt={name}
                        />

                        {this.editForm(name, email, password, about)}

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default EditProfile;