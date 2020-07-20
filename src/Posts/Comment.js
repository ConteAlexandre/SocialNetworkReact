import React, {Component} from 'react';
import {MDBInput, MDBBtn} from "mdbreact";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth";
import {uncomment, comment} from "./apiPost";

class Comment extends Component {

    //On détermine les différents états de la classe
    state = {
        text: "",
        error: "",
    }

    //On établit la méthode qui fait que les champs change en fonction de ce que l'on note
    handleChange = event => {
        this.setState({ error: "" })
        return this.setState({ text: event.target.value })
    }

    //On étbalit une vérification des champs
    isValid = () => {
        const {text} = this.state
        if (text.length < 10){
            this.setState({ error: 'Le commentaire doit contenir plus de 10 caractères' })
            return false
        }
        if (text.length > 150) {
            this.setState({ error: 'Le commentaire doit avoir un maximum de 150 caractères' })
            return false
        }
        return true
    }

    //Méthode pour ajouter le commentaire
    addComment = e => {
        e.preventDefault()

        //Si il n'est pas authentifié
        if (!isAuthenticated()) {
            this.setState({ error: 'Veuillez vous connecteé pour laisser un commentaire' })
            return false
        }

        //Vérification des champs
        if (this.isValid()){
            const userId = isAuthenticated().user._id
            const token = isAuthenticated().token
            const postId = this.props.postId

            //Voici la méthode qui fait appel a l'api
            comment(userId, token, postId, {text: this.state.text})
                .then(data => {
                    if (data.error) {
                        console.log(data.error)
                    } else {
                        this.setState({text: ""})
                        this.props.updateComments(data.comments)
                    }
                })
        }

    };

    //Méthode pour supprimer
    deleteComment = (comment) => {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        const postId = this.props.postId

        //Méthode avec l'api
        uncomment(userId, token, postId, comment)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    this.props.updateComments(data.comments)
                }
            })
    };

    //Pop pour confirmer la suppression
    deleteConfirmed = (comment) => {
        let answer = window.confirm("Etes-vous sur de vouloir supprimer le commentaire?")
        if (answer) {
            this.deleteComment(comment)
        }
    };

    render() {

        const {comments} = this.props
        const {error} = this.state

        return (
            <div>
                <h2>Ecrire un commentaire</h2>

                <div
                    className={"alert alert-primary"}
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <form onSubmit={this.addComment}>
                    <MDBInput label="Commentaire" value={this.state.text} onChange={this.handleChange}/>
                    <MDBBtn type={'submit'} color={'success'}>
                        Commenter
                    </MDBBtn>
                </form>

                <h3 className={'mt-3'}>{comments.length} Commentaires</h3>

                {comments.map((comment, i ) => (

                    <div key={i}>

                        <h5>Posté par <Link to={`/profile/${comment.postedBy._id}`}>
                            {comment.postedBy.name}</Link> le {new Date(comment.createdAt).toLocaleDateString()}
                        </h5>

                        {/*Boyuton delete affihcer que si on est co et que les id correposndent*/}
                        {isAuthenticated().user && isAuthenticated().user._id === comment.postedBy._id && (
                            <span
                                style={{color: 'red', cursor: "pointer" }}
                                onClick={ () => this.deleteConfirmed(comment)}
                            >Supprimer</span>
                        )}

                        <p>{comment.text}</p>

                        <hr/>

                    </div>

                ))}
            </div>
        );
    }
}

export default Comment;