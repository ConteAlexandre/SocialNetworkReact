//Importation de nos packages
import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from 'mdbreact';
import Load from '../img/804.gif';
//On importante nos constantes qui sont dans index.js
import {signin, authenticate} from "../auth";

class Signin extends Component {

    //On déclare les états de notre classe donc ce qui va etre modifier
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        }
    }

    //Contante qui permet de modifier la valeur en fonction du champs du formulaire
    handleChange = (name) => (event) => {
        this.setState({ error: "" });
        this.setState({[name]: event.target.value });
    }

    //Fonction qui détermine ce qui se passe quand on clique sur connecter
    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })
        const { email, password } = this.state;
        const user = {
            email,
            password,
        }
        console.log(user)
        //On appel notre constante qui communique avec l'API
        signin(user)
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error, loading: false })
                } else {
                    //Authenticate
                    authenticate(data, () => {
                        this.setState({ redirectToReferer: true })
                    })

                }
            })
    }

    //Constante qui est notre formulaire
    signinForm = ( email, password) => (
        <form>
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Votre email
            </label>
            <input
                type="email"
                id="defaultFormLoginEmailEx"
                className="form-control"
                onChange={this.handleChange("email")}
                value={email}
            />
            <br />
            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                Votre mot de passe
            </label>
            <input
                type="password"
                id="defaultFormLoginPasswordEx"
                className="form-control"
                onChange={this.handleChange("password")}
                value={password}
            />
            <div className="text-center mt-4">
                <MDBBtn
                    color="indigo"
                    type="submit"
                    onClick={this.clickSubmit}
                >
                    Login
                </MDBBtn>
            </div>
        </form>
    )


    render() {

        const { email, password, error, redirectToReferer, loading } = this.state

        //Si l'état redirectToReferer est existant ou vrai alors redirect à Home
        if (redirectToReferer) {
            return <Redirect to={"/"} />
        }

        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="8" className={'mx-auto mt-5'}>
                        <p className="h4 text-center mb-4">Sign In</p>

                        <div
                            className={"alert alert-primary"}
                            style={{ display: error ? "" : "none" }}
                        >
                            {error}
                        </div>
                        
                        { loading ? (
                            <div><img src={Load} alt=""/></div>
                        ) 
                            : ""
                        }

                        {this.signinForm( email, password)}

                        <p>
                            <Link to="/forgot-password" className="text-danger">
                                {" "}
                                Forgot Password
                            </Link>
                        </p>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default Signin;