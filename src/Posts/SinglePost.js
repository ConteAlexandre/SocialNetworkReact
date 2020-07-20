import React, {Component} from 'react';
import {MDBCard, MDBCardBody, MDBCardImage, MDBBtn, MDBCol, MDBContainer} from "mdbreact";
import {remove, singlePost, like, unlike} from "./apiPost";
import DefaultPost from "../img/postdefault.jpg";
import {Link, Redirect} from "react-router-dom";
import {isAuthenticated} from "../auth";
import Like from '../img/heart.png';
import Unlike from '../img/broken-heart.png';
import Comment from "./Comment";

class SinglePost extends Component {

    //On définit ses états par défauts
    state = {
        post: "",
        redirectToHome: false,
        redirectToLogin: false,
        like: false,
        likes: 0,
        comments: []
    };

    //Fonction qui permet de checker les likes en bdd pour le post
    checklike = (likes) => {
        const userId = isAuthenticated() && isAuthenticated().user._id
        let match = likes.indexOf(userId) !== -1
        return match
    };

    //Fonction qui nous permet d'adapter les états par rapport à une propriété
    componentDidMount = () => {
        const postId = this.props.match.params._id
        singlePost(postId)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    this.setState({
                        post: data,
                        likes: data.likes.length,
                        like: this.checklike(data.likes),
                        comments: data.comments
                    })
                }
            })
    };

    //Fonction pour supprimer le post
    deletePost = () => {
        const postId = this.props.match.params._id;
        const token = isAuthenticated().token;
        //On appel API
        remove(postId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    this.setState({
                        redirectToHome: true
                    })
                }
            })
    }

    //Pop up pour confirmer
    deleteConfirmed = () => {
        let answer = window.confirm("Etes-vous sur de vouloir supprimer le post?")
        if (answer) {
            this.deletePost()
        }
    };

    //Fonction pour mettre à jour les commentaires dès que l'on en rajoute ou supprimer un commentaire
    updateComments = comments => {
        this.setState({comments})
    }

    //Fonction pour ajouter un like ou enlever son like
    likesToggle = () => {
        if(!isAuthenticated()) {
            this.setState({ redirectToLogin: true })
            return false
        }
        //On fait appel ici aux fonctions de l'API pour le like et le unlike
        let callApi = this.state.like ? unlike : like
        const userID = isAuthenticated().user._id
        const postId = this.state.post._id
        const token = isAuthenticated().token

        //On exécute les fonctions ici
        callApi(userID, token, postId)
            .then(data => {
                if(data.error) {
                    console.log(data.error)
                } else {
                    this.setState({
                        like: !this.state.like,
                        likes: data.likes.length
                    })
                }
            })
    }

    //Voici notre rendu
    renderPost = (post) => {

        const posterId = post.postedBy ? post.postedBy._id : ""
        const posterName = post.postedBy ? post.postedBy.name : "";
        const photopost = `http://localhost:8080/post/photo/${this.props.match.params._id}`;
        const { like, likes} = this.state

        return (
            <>
                <MDBCol md="6" lg="4">
                    <MDBCard personal className="my-5">
                        <MDBCardImage
                            top
                            src={photopost}
                            onError={i => i.target.src = `${DefaultPost}`}
                        />

                        {like ? (
                                <h4 onClick={this.likesToggle}><img src={Unlike} alt={'unlike'} style={{padding: '10px'}}/>{ likes } Like</h4>
                            )
                            :
                            (
                                <h4 onClick={this.likesToggle}><img src={Like} alt={'like'} style={{padding: '10px'}}/>{ likes } Like</h4>
                            )}

                        <MDBCardBody>
                            <p className={"text-center"}>{post.body}</p>
                            <p>Posté par {" "}
                                <Link
                                    to={`/profile/${posterId}`}
                                >
                                    {posterName}
                                </Link>
                                {" "}le {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                            <hr/>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBContainer>
                    {/*Si on est authentifier et que cela correspond avec l'id user du post*/}
                    {isAuthenticated().user && isAuthenticated().user._id === posterId &&(
                        <Link to={`/post/edit/${post._id}`}>
                            <MDBBtn>Modifier</MDBBtn>
                        </Link>
                    )}

                    <Link to={"/"}>
                        <MDBBtn>Accueil</MDBBtn>
                    </Link>

                    {isAuthenticated().user && isAuthenticated().user._id === posterId && (
                        <MDBBtn
                            onClick={this.deleteConfirmed}
                        >Supprimer</MDBBtn>
                    )}
                </MDBContainer>
            </>
        )
    }

    render() {

        const {post, redirectToHome, redirectToLogin, comments} = this.state

        if (redirectToHome) {
            return <Redirect to={"/"}/>
        }
        if (redirectToLogin) {
            return <Redirect to={"/signin"}/>
        }

        return (
            <>
                <MDBContainer className={"text-center"}>
                    <h2>{post.title}</h2>
                    {this.renderPost(post)}

                    {/*Ici on appel le bloc comment pour les afficher*/}
                    <Comment
                        postId={post._id}
                        comments={comments.reverse()}
                        updateComments={this.updateComments}
                    />
                </MDBContainer>
            </>
        );
    }
}

export default SinglePost;