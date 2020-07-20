//Immportation de nos packages
import React, {Component} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import {signup} from "../auth";
import {Link} from "react-router-dom";


class Signup extends Component {

    //Déclaration des états
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false,
        }
    }

    //Contante qui permet de modifier la valeur en fonction du champs du formulaire
    handleChange = (name) => (event) => {
        this.setState({ error: "" })
        this.setState({[name]: event.target.value })
    }

    //Fonction qui détermine ce qui se passe quand on clique sur connecter
    clickSubmit = event => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password,
        }
        // console.log(user)export
        signup(user)
            .then(data => {
                if (data.error) this.setState({error: data.error });
                else this.setState({
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    open: true
                })
            })
    }

    //Constante qui est notre formulaire
    signupForm = (name, email, password) => (
        <form>
            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                Votre Nom
            </label>
            <input
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control"
                onChange={this.handleChange("name")}
                value={name}
            />
            <br />
            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                Votre Email
            </label>
            <input
                type="email"
                id="defaultFormRegisterEmailEx"
                className="form-control"
                onChange={this.handleChange("email")}
                value={email}
            />
            <br />
            <label
                htmlFor="defaultFormRegisterPasswordEx"
                className="grey-text"
            >
                Votre Mot De Passe
            </label>
            <input
                type="password"
                id="defaultFormRegisterPasswordEx"
                className="form-control"
                onChange={this.handleChange("password")}
                value={password}
            />
            <div className="text-center mt-4">
                <MDBBtn
                    color="unique"
                    type="submit"
                    onClick={this.clickSubmit}
                >
                    Register
                </MDBBtn>
            </div>
        </form>
    )


    render() {

        const { name, email, password, error, open } = this.state

        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="8" className={'mx-auto mt-5'}>
                        <p className="h4 text-center mb-4">Sign up</p>

                        <div
                            className={"alert alert-primary"}
                            style={{ display: error ? "" : "none" }}
                        >
                            {error}
                        </div>

                        <div
                            className={"alert alert-success"}
                            style={{ display: open ? "" : "none" }}
                        >i
                            Vous Voilà inscrit! Allez maintenant vous <Link to={"/signin"}>connectez</Link> et plus vite que ça!!!
                        </div>
                        {this.signupForm(name, email, password)}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default Signup;