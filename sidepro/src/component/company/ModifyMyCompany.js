import React, { Component } from "react";
import axios from "axios";
import Saisie from '../Saisie'
import { Link } from 'react-router-dom'

class ModifyMycompany extends Component {
    state = {
        modifyInputValue: { is_visible: "1" }
    };

    componentDidMount() {
        this.getMyCompanyInfo();
    }
    handleChange = (e) => {
        console.log(e.target.value, e.target.name)
        this.setState({
            modifyInputValue: {
                ...this.state.modifyInputValue,
                [e.target.name]: e.target.value,
            }
        });
    };

    getMyCompanyInfo = () => {
        this.setState({ isLoading: true })
        axios
            .get("http://localhost:3002/company/info")
            .then(response => this.setState({ modifyInputValue: response.data[0], isLoading: false }))

        // .then(window.location.reload());

    };


    submitModifyMyCompany = e => {
        e.preventDefault();

        axios
            .put(`http://localhost:3002/company/modify/1` , this.state.modifyInputValue)
            .then(window.history.back());
        alert("Les modifications sont enregistrées")

    };

    render() {

        return (
            <div>
                <form onSubmit={this.submitModifyMyCompany}>

                    <fieldset><legend>Modifier les information de l'entreprise {this.state.modifyInputValue.name}</legend>

                        <Saisie name="name" label="Nom*: " value={this.state.modifyInputValue.name} handleChange={this.handleChange} isRequired={"required"} />
                        <Saisie name="street_number" label="Numero de la rue: " value={this.state.modifyInputValue.street_number} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="street_name" label="Nom de la rue: " value={this.state.modifyInputValue.street_name} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="postal_code" label="Code postal: " value={this.state.modifyInputValue.postal_code} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="location" label="Lieu: " value={this.state.modifyInputValue.location} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="city" label="Ville: " value={this.state.modifyInputValue.city} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="phone_number_1" label="Telephone n°1: " value={this.state.modifyInputValue.phone_number_1} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="phone_number_2" label="Telephone n°2: " value={this.state.modifyInputValue.phone_number_2} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="mail" label="E-mail: " value={this.state.modifyInputValue.mail} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="siret" label="Siret: " value={this.state.modifyInputValue.siret} handleChange={this.handleChange} isRequired={false} />


                        <div><button type="submit">Soumettre</button></div>
                        <Link to ={'/'}><button>Retourner au Menu</button></Link>

                    </fieldset>
                </form>

            </div>
        );
    }
}

export default ModifyMycompany;
