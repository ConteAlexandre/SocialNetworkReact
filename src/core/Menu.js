//Importation de nos packages
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import {signout, isAuthenticated} from "../auth";

//Constante nous permettant de changer les couleurs des liens de la navbar en fonction si on est dessus ou pas
const isActive = (history, path) => {
    if (history.location.pathname === path) return {color: "#1f38ff"}
    else return {color: '#fff'}
}

class Menu extends Component {

    render() {

        //Déclaration de nos propriétés
        const history = this.props.history

        return (
            <div>
                {/*Voici la partie visible dans tout les cas*/}
                <MDBNav className="justify-content-end bg-dark">
                    <MDBNavItem>
                        <MDBNavLink
                            to="/"
                            style={isActive(history, "/")}
                        >Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink
                            to="/users"
                            style={isActive(history, "/users")}
                        >Utilisateurs</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink
                            to={`/post/create`}
                            style={isActive(history, `/post/create`)}
                        >Créer un post</MDBNavLink>
                    </MDBNavItem>

                    {/*Si on n'est pas authentifier ceci est rajouté*/}
                    {!isAuthenticated() && (
                        <>
                            <MDBNavItem>
                                <MDBNavLink
                                    to="/signup"
                                    style={isActive(history, "/signup")}
                                >S'inscrire</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to="/signin"
                                    style={isActive(history, "/signin")}
                                >Connexion</MDBNavLink>
                            </MDBNavItem>
                        </>
                    )}

                    {/* Si on est authentifier ceci est rajouté*/}
                    {isAuthenticated() && (
                        <>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/profile/${isAuthenticated().user._id}`}
                                    style={isActive(history, `/profile/${isAuthenticated().user._id}`)}
                                >{isAuthenticated().user.name}</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/findpeople`}
                                    style={isActive(history, `/findpeople`)}
                                >Personnes non suivies</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <span
                                    className={"nav-link"}
                                    style={isActive(history, "/signout"), {cursor: "pointer", color: "white"}}
                                    onClick={() => signout(() => history.push('/'))}

                                >Déconnexion</span>
                            </MDBNavItem>
                        </>
                    )}

                </MDBNav>
            </div>
        );
    }
}

export default withRouter(Menu);