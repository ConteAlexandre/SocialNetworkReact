import React, {Component} from 'react';
import {MDBBtn, MDBContainer} from "mdbreact";
import {follow, unfollow} from "./apiUser";


class FollowProfileButton extends Component {

    //On détermine des propriétés dont ce qui compose notre Composant lorsque l'on appel dans un autre fichier
    followClick = () => {
        //On fait appel aux méthode de l'API pour les propriétés
        this.props.onButtonClick(follow)
    }

    unfollowClick = () => {
        this.props.onButtonClick(unfollow)
    }

    //Voici le rendu
    render() {
        return (
            <MDBContainer>
                {
                    !this.props.following ? (
                        <MDBBtn
                            onClick={this.followClick}
                            color="success"
                        >Suivre</MDBBtn>
                    ) : (
                        <MDBBtn
                            onClick={this.unfollowClick}
                            color="unique"
                        >Ne plus suivre</MDBBtn>
                    )
                }
            </MDBContainer>
        );
    }
}

export default FollowProfileButton;