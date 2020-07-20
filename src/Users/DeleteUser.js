//Importation des différents composants qui vont être utilisés
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {MDBBtn} from "mdbreact";
import {isAuthenticated} from "../auth";
import {remove} from "./apiUser";
import {signout} from "../auth";

class DeleteUser extends Component {
    state = {
        redirect: false
    }

    //Fonction qui fait appel à remove pour agir sur la bdd
    deleteAccount = () => {
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        remove(userId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    //signout user
                    signout(() => {console.log('Utilisateur supprimé')})
                    //redirect
                    this.setState({redirect: true})
                }
            })
    };

    //Fonction qui fait afficher la pop up pour demander la confirmation de la suppression du compte
    deleteConfirmed = () => {
        let answer = window.confirm("Etes-vous sur de vouloir vous désinscrire?")
        if (answer) {
            this.deleteAccount()
        }
    };

    //Voici le rendu
    render() {

        if (this.state.redirect){
            return <Redirect to={"/"}/>
        }

        return (
            <MDBBtn
                gradient={"young-passion"}
                onClick={this.deleteConfirmed}
            >Supprimer</MDBBtn>
        );
    }
}

export default DeleteUser;