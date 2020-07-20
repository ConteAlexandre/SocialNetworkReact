import React, {Component} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCol,
    MDBContainer,
    MDBRow
} from "mdbreact";
import {list } from "./apiUser";
import DefaultAvatar from '../img/avatar.png'

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({ users: data })
            }
        })
    }

    renderUser = users => (
        <>
            {
                users.map((user, i) => (
                    <MDBCol md="6" lg="4" key={i}>
                        <MDBCard personal className="my-5">
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
                                <p className={"text-center"}>Email: {user.email}</p>
                                {/*<p className="card-meta">Inscrit le {new Date(user.createdAt).toLocaleDateString()}</p>*/}
                                <hr/>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                ))
            }
        </>
    )


    render() {

        const {users} = this.state

        return (
            <MDBContainer>
                <h2 className={"mt-5 mb-5"}>
                    Utilisateurs
                </h2>
                <MDBRow>
                    {this.renderUser(users)}
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default Users;