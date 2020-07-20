//Importation de nos package pour les utliser
import React, {Component} from 'react';
import { MDBContainer } from 'mdbreact';
import Posts from '../Posts/Posts'

class Home extends Component {
    render() {
        return (
            <MDBContainer>
                <h2>Home</h2>
                <p>Bienvenue sur la partie ReactJs</p>
                <Posts/>
            </MDBContainer>
        );
    }
}

export default Home;