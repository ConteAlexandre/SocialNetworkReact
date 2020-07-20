import React, {Component} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBBtn
} from "mdbreact";
import {findPeople, follow} from "./apiUser";
import DefaultAvatar from '../img/avatar.png'
import {isAuthenticated} from "../auth";

class FindPeople extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            error: "",
            open: false,
        }
    }

    //Fonction qui est appeler lorsque l'on appui sur le bouton
    clickFollow = (user, i) => {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token

        //API
        follow(userId, token, user._id)
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error })
                } else {
                    let toFollow = this.state.users
                    toFollow.splice(i, 1)
                    this.setState({
                        users: toFollow,
                        open: true,
                        FollowMessage: `Vous suivez ${user.name} maintenant!`
                    })
                }
            })
    }

    //On donne une valeur à notre état user
    componentDidMount() {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token

        //API
        findPeople(userId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({ users: data })
            }
        })
    }

    //Fonction pour notre rendu
    renderUser = users => (
        <>
            {
                users.map((user, i) => (
                    <MDBCol md="6" lg="4" key={i}>
                        <MDBCard personal className="my-5 text-center">
                            <MDBCardImage
                                top
                                src={`http://localhost:8080/user/photo/${user._id}`}
                                onError={i => i.target.src = `${DefaultAvatar}`}
                                alt={user.name}
                            />
                            <MDBCardBody>
                                <MDBCardTitle className={"text-center"}>
                                    <a
                                        href={`/profile/${user._id}`}
                                        className="title-one"
                                    >
                                        {user.name}
                                    </a>
                                </MDBCardTitle>
                                {/*<p className="card-meta">Inscrit le {new Date(user.createdAt).toLocaleDateString()}</p>*/}
                                <hr/>
                                <MDBBtn
                                    onClick={() => {this.clickFollow(user, i)}}
                                >
                                    Follow
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                ))
            }
        </>
    )


    render() {

        const {users, FollowMessage, open} = this.state

        return (
            <MDBContainer>
                <h2 className={"mt-5 mb-5"}>
                    A la recherche
                </h2>

                {open && (
                    <div>
                        <p>{FollowMessage}</p>
                    </div>
                )}

                <MDBRow>
                    {this.renderUser(users)}
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default FindPeople;