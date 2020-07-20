import React, {Component} from 'react';
import {MDBBtn, MDBCardImage, MDBContainer} from "mdbreact";
import {isAuthenticated} from "../auth";
import {singlePost, update} from "./apiPost";
import {Redirect} from 'react-router-dom';
import DefaultPost from "../img/postdefault.jpg";

class EditPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: "",
            body: "",
            fileSize: 0,
            error: "",
            open: false,
            redirectToProfile: false
        }
    }

    //Voici la fonction qui nous permet de rendre les infos utilisateurs que l'on connait déjà
    init = (postId) => {
        //On fait appel à l méthode qui appel api
        singlePost(postId)
            .then(data => {
                if (data.error) {
                    this.setState({redirectToProfile: true})
                } else {
                    this.setState({
                        id: data._id,
                        title: data.title,
                        body: data.body,
                        error: ""
                    })
                }
            })
    };

    //On prédifini comment récupérer les paramètres
    componentDidMount() {
        this.postData = new FormData()
        const postId = this.props.match.params._id;
        this.init(postId)
    };

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

    };

    //Contante qui permet de modifier la valeur en fonction du champs du formulaire
    handleChange = (name) => (event) => {
        this.setState({ error: "" })
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        const fileSize = name === 'photo' ? event.target.files[0].size : 0
        this.postData.set(name, value)
        this.setState({[name]: value, fileSize })
    };

    //Fonction qui détermine ce qui se passe quand on clique sur connecter
    clickSubmit = event => {
        event.preventDefault();
        if (this.isValid()) {
            // console.log(user)
            const postId = this.state.id;
            const token = isAuthenticated().token
            update(postId, token, this.postData)
                .then(data => {
                    if (data.error) this.setState({error: data.error });
                    else {
                        this.setState({ title: "", body: "", redirectToProfile: true })
                    }
                })
        }
    };

    //Voici notre formulaire pour editer son profil
    editPostForm = (title, body) => (
        <form>
            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                Post Photo
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
                    Modifier
                </MDBBtn>
            </div>
        </form>
    )


    render() {

        const {id, title, body, error, redirectToProfile} = this.state

        if (redirectToProfile) {
            return <Redirect to={`/profile/${isAuthenticated().user._id}`}/>
        }

        return (
            <MDBContainer>
                <h2>{title}</h2>

                <div
                    className={"alert alert-primary"}
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <MDBCardImage
                    width={'100%'}
                    height={'512px'}
                    onError={i => i.target.src = `${DefaultPost}`}
                    src={`http://localhost:8080/post/photo/${id}`}
                    alt={title}
                />

                {this.editPostForm(title, body)}
            </MDBContainer>
        );
    }
}

export default EditPost;