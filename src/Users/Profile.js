//Importation des différents paquets utilisés
import React, {Component} from 'react';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCard,
    MDBBtn,
    MDBCardText
} from "mdbreact";
import {isAuthenticated} from "../auth";
import {Redirect} from 'react-router-dom';
import {read} from "./apiUser";
import DeleteUser from "./DeleteUser";
import DefaultAvatar from "../img/avatar.png";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";
import {listByUser} from "../Posts/apiPost";


class Profile extends Component {

    //etat qui seront amené à être changé
    constructor(props) {
        super(props);
        this.state = {
            user: { following: [], followers: [] },
            redirectToLogin: false,
            following: false,
            error: "",
            posts: []
        }
    }

    //Check follow
    checkFollow = user => {
        const jwt =isAuthenticated();
        const match = user.followers.find(follower => {
            return follower._id === jwt.user._id
        });
        return match
    };

    //Fonction pour le bouton follow quand tu es sur le profile
    clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        //On fait appel au parametres
        callApi(userId, token, this.state.user._id)
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error })
                } else {
                    this.setState({ user: data, following: !this.state.following })
                }
            })
    };

    //Récup de données des utilisateurs
    init = (userId) => {
        const token = isAuthenticated().token;

        //API
        read(userId, token)
            .then(data => {
                if (data.error) {
                    this.setState({redirectToLogin: true})
                } else {
                    let following = this.checkFollow(data);
                    this.setState({ user: data, following });
                    this.loadPosts(data._id)
                }
            })
    };

    //On charge les post de l'utilisateurs
    loadPosts = userId => {
        const token = isAuthenticated().token;
        listByUser(userId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    this.setState({ posts: data })
                }
            })
    };

    componentDidMount() {
        const userId = this.props.match.params._id;
        this.init(userId)
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params._id;
        this.init(userId)
    }


    render() {

        const { user, redirectToLogin, posts } = this.state

        if (redirectToLogin) return <Redirect to={"/signin"}/>;

        //Constante qui nous permet de récup la photo en bdd ou sinon photo par défault
        const photourl = user._id ? `http://localhost:8080/user/photo/${user._id}?${new Date().getTime()}` : DefaultAvatar

        return (
            <MDBContainer className={'text-center'}>
                <h2 className={"mt-5 mb-5"}>
                    Profile
                </h2>
                <MDBRow>
                    <MDBCol md="6" lg="4">
                        <MDBCard personal className="my-5">
                            <MDBCardImage
                                top
                                onError={i => i.target.src = `${DefaultAvatar}`}
                                src={photourl}
                                alt={user.name}
                            />
                            <MDBCardBody>
                                <MDBCardTitle className={"text-center"}>
                                    <p className="title-one">
                                        {user.name}
                                    </p>
                                </MDBCardTitle>
                                <p className={"text-center"}>Email: {user.email}</p>
                                <MDBCardText>
                                    {user.about}
                                </MDBCardText>
                                <p className="card-meta text-center">Inscrit le {new Date(user.createdAt).toLocaleDateString()}</p>
                                <hr />
                                {isAuthenticated().user && isAuthenticated().user._id === user._id ? (

                                    <div className={"text-center"}>

                                        <MDBBtn
                                            gradient="winter-neva"
                                            href={`/post/create/`}
                                        >Créer Post</MDBBtn>

                                        <MDBBtn
                                            gradient="morpheus-den"
                                            href={`/user/edit/${user._id}`}
                                        >Modifier</MDBBtn>

                                        <DeleteUser userId={user._id}/>

                                    </div>

                                ) : (

                                    <FollowProfileButton
                                        following={this.state.following}
                                        onButtonClick={this.clickFollowButton}
                                    />

                                )
                                }
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <hr/>
                <ProfileTabs
                    followers={user.followers}
                    following={user.following}
                    posts={posts}
                />
            </MDBContainer>
        );
    }
}

export default Profile;