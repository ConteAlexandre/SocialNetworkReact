import React, {Component} from 'react';
import {create} from "./apiPost";
import {isAuthenticated} from "../auth";
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {Redirect} from 'react-router-dom';


class NewPost extends Component {
    //On établi nos état qui seront amené à être changé
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            body: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            redirectToProfile: false
        }
    }

    componentDidMount() {
        this.postData = new FormData()
        this.setState({ user: isAuthenticated().user })
    }

    //Fonction qui nous permet d'établir les validations sur les champs
    isValid = () => {
        const { title, body, fileSize } = this.state

        if (fileSize > 2000000) {
            this.setState({ error: 'L\'image doit faire moins de 2mb' })
            return false
        }

        if (title.length < 4) {
            this.setState({ error: 'Le titre doit être composé de 4 caractères minimum' })
            return false
        }


        if (body.length < 20) {
            this.setState({ error: 'Faites un effort pour écrire un post la !!!!!' })
            return false
        }

        return true

    }

    //Contante qui permet de modifier la valeur en fonction du champs du formulaire
    handleChange = (name) => (event) => {
        this.setState({ error: "" })
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        const fileSize = name === 'photo' ? event.target.files[0].size : 0
        this.postData.set(name, value)
        this.setState({[name]: value, fileSize })
    }

    //Fonction qui détermine ce qui se passe quand on clique sur connecter
    clickSubmit = event => {
        event.preventDefault();
        if (this.isValid()) {
            // console.log(user)
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token
            create(userId, token, this.postData)
                .then(data => {
                    if (data.error) this.setState({error: data.error });
                    else {
                        this.setState({ title: "", body: "", redirectToProfile: true })
                    }
                })
        }
    }

    //Voici notre formulaire pour editer son profil
    newPostForm = (title, body) => (
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
                Titre
            </label>
            <input
                onChange={this.handleChange("title")}
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control"
                value={title}
            />
            <br />
            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                Contenu
            </label>
            <textarea
                onChange={this.handleChange("body")}
                type="text"
                id="defaultFormRegisterEmailEx"
                className="form-control"
                value={body}
            />
            <div className="text-center mt-4">
                <MDBBtn
                    color="unique"
                    type="submit"
                    onClick={this.clickSubmit}
                >
                    Créer
                </MDBBtn>
            </div>
        </form>
    )

    render() {

        const { title, body, user, error, redirectToProfile } = this.state

        if (redirectToProfile) return <Redirect to={`/profile/${user._id}`}/>

        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="12" className={"text-center"}>
                        <p className="h4 text-center mb-4">Créer un Post</p>
                        <div
                            className={"alert alert-primary"}
                            style={{ display: error ? "" : "none" }}
                        >
                            {error}
                        </div>

                        {this.newPostForm(title, body)}

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default NewPost;