import React, {Component} from 'react';
import {MDBContainer, MDBListGroupItem, MDBCardImage, MDBRow, MDBCol} from "mdbreact";
import {Link} from "react-router-dom";
import DefaultPost from "../img/postdefault.jpg";
import DefaultAvatar from '../img/avatar.png'

class ProfileTabs extends Component {
    render() {
        const {followers, following, posts} = this.props
        return (
            <MDBContainer>
                <h3 className={"mt-5 mb-5"}>Followers</h3>
                <MDBRow>
                    {followers.map((person, i ) => (
                        <MDBCol md="6" lg="4" key={i}>
                            <MDBListGroupItem>
                                <Link to={`/profile/${person._id}`}>
                                    <MDBCardImage
                                        height={"50px"}
                                        onError={i => (i.target.src = `${DefaultAvatar}`)}
                                        src={`http://localhost:8080/user/photo/${person._id}`}
                                        alt={person.name}
                                    />
                                    <div>
                                        <h4>{person.name}</h4>
                                    </div>
                                </Link>
                            </MDBListGroupItem>
                        </MDBCol>
                    ))}
                </MDBRow>
                <hr/>
                <h3 className="mt-5 mb-5">Following</h3>
                <MDBRow>
                    {following.map((person, i ) => (
                        <MDBCol md="6" lg="4" key={i}>
                            <MDBListGroupItem>
                                <Link to={`/profile/${person._id}`}>
                                    <MDBCardImage
                                        height={"50px"}
                                        onError={i => (i.target.src = `${DefaultAvatar}`)}
                                        src={`http://localhost:8080/user/photo/${person._id}`}
                                        alt={person.name}
                                    />
                                    <div>
                                        <h4>{person.name}</h4>
                                    </div>
                                </Link>
                            </MDBListGroupItem>
                        </MDBCol>
                    ))}
                </MDBRow>
                <hr/>
                <h3 className={"mt-5 mb-5"}>Posts</h3>
                <MDBRow>
                    {posts.map((post, i ) => (
                        <MDBCol md="6" lg="4" key={i}>
                            <MDBListGroupItem>
                                <MDBCardImage
                                    height={"50px"}
                                    onError={i => (i.target.src = `${DefaultPost}`)}
                                    src={`http://localhost:8080/post/photo/${post._id}`}
                                    alt={post.title}
                                />
                                <div>
                                    <Link to={`/posts/${post._id}`}>
                                        <h4>{post.title}</h4>
                                    </Link>
                                    <p>{post.body.substring(0, 30)}</p>
                                </div>
                            </MDBListGroupItem>
                        </MDBCol>
                    ))}
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default ProfileTabs;