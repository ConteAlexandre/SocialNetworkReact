import React, { Component } from "react";
import { forgotPassword } from "../auth";

class ForgotPassword extends Component {

    //On établi nos états
    state = {
        email: "",
        message: "",
        error: ""
    };

    //On fait appel à notre fonction dans index.js de auth
    forgotPassword = e => {
        e.preventDefault();
        this.setState({ message: "", error: "" });

        //API
        forgotPassword(this.state.email).then(data => {
            if (data.error) {
                console.log(data.error);
                this.setState({ error: data.error });
            } else {
                console.log(data.message);
                this.setState({ message: data.message });
            }
        });
    };

    //Voici le rendu
    render() {

        const {message, email ,error} = this.state

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Veuillez entrer votre email pour le reset du mot de passe</h2>

                {/*Si message existant ou error*/}
                {message && (
                    <h4 className="bg-success">{message}</h4>
                )}
                {error && (
                    <h4 className="bg-warning">{error}</h4>
                )}

                <form>
                    <div className="form-group mt-5">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Votre adresse mail"
                            value={email}
                            name="email"
                            //Ici on dit que si le champs change alors error devient nul et message aussi et que email devient la valur du champs
                            onChange={e =>
                                this.setState({
                                    email: e.target.value,
                                    message: "",
                                    error: ""
                                })
                            }
                            autoFocus
                        />
                    </div>
                    <button
                        onClick={this.forgotPassword}
                        className="btn btn-raised btn-primary"
                    >
                        Confirmer
                    </button>
                </form>
            </div>
        );
    }
}

export default ForgotPassword;