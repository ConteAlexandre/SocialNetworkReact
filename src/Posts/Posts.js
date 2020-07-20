import React, {Component} from 'react';
import {list} from "./apiPost";
import {MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBContainer, MDBRow, MDBCardImage} from "mdbreact";
import {Link} from "react-router-dom";
import DefaultPost from '../img/postdefault.jpg';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    };

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({ posts: data })
            }
        })
    };

    renderPosts = posts => {
        return(
            <>
                {posts.map((post, i) => {
                    const posterId = post.postedBy ? post.postedBy._id :"";
                    const posterName = post.postedBy ? post.postedBy.name : "";
                    const photopost = `http://localhost:8080/post/photo/${post._id}`;

                    return (
                        <MDBCol md="6" lg="4" key={i}>
                            <MDBCard personal className="my-5">
                                <MDBCardImage
                                    top
                                    src={photopost}
                                    onError={i => i.target.src = `${DefaultPost}`}
                                />
                                <MDBCardBody>
                                    <MDBCardTitle className={"text-center"}>
                                        <a
                                            href={`/posts/${post._id}`}
                                            className="title-one"
                                        >
                                            {post.title}
                                        </a>
                                    </MDBCardTitle>
                                    <p className={"text-center"}>{post.body.substring(0, 30)}</p>
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
                    )
                })}
            </>
        );
    };


    render() {

        const {posts} = this.state

        return (
            <MDBContainer>
                <h2 className={"mt-5 mb-5"}>
                    Posts
                </h2>
                <MDBRow>
                    {this.renderPosts(posts)}
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default Posts;