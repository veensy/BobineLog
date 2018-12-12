import React, { Component } from "react";
import axios from "axios";
import Saisie from '../Saisie'
import { Link } from 'react-router-dom'

class ModifyMyClientsList extends Component {
    state = {
        modifyInputValue: { is_visible: "1" }
    };

    componentDidMount() {
        this.getMyClienstList();
    }
    handleChange = (e) => {
        this.setState({
            modifyInputValue: {
                ...this.state.modifyInputValue,
                [e.target.name]: e.target.value,
            }
        });
    };

    getMyClienstList = e => {
        this.setState({ isLoading: true })
        const id = this.props.match.params.id;
           
        axios
            .get(`http://localhost:3002/clients/listid/${id}`)
            .then(response => this.setState({ modifyInputValue: response.data[0], isLoading: false }))

        // .then(window.location.reload());

    };


    submitModifyMyClientsList = e => {
        e.preventDefault();
        const id = this.props.match.params.id;

        axios
            .put(`http://localhost:3002/clients/modify/${id}` , this.state.modifyInputValue)
            .then(window.history.back());
        alert("Les modifications sont enregistrées")
        console.log(this.state.modifyInputValue);
        

    };

    render() {

        return (
            <div>
                <form onSubmit={this.submitModifyMyClientsList}>

                    <fieldset><legend>Modifier les informations du client </legend>

                        <Saisie name="name" label="Nom*: " value={this.state.modifyInputValue.name} handleChange={this.handleChange} isRequired={"required"} />
                        <Saisie name="street_number" label="Numero de la rue: " value={this.state.modifyInputValue.street_number} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="street_name" label="Nom de la rue: " value={this.state.modifyInputValue.street_name} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="postal_code" label="Code postal: " value={this.state.modifyInputValue.postal_code} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="lieu" label="Lieu: " value={this.state.modifyInputValue.lieu} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="city" label="Ville: " value={this.state.modifyInputValue.city} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="phone_number" label="Telephone: " value={this.state.modifyInputValue.phone_number} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="mail" label="E-mail: " value={this.state.modifyInputValue.mail} handleChange={this.handleChange} isRequired={false} />

                        <div><button type="submit">Soumettre</button></div>
                        <Link to ={'/'}><button>Retourner au Menu</button></Link>

                    </fieldset>
                </form>

            </div>
        );
    }
}

export default ModifyMyClientsList;
