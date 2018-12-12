import React, { Component } from 'react';
import Saisie from '../Saisie'
import axios from 'axios'
import { Link } from 'react-router-dom'

class CreateMyCompany extends Component {
    state = {
        addInputValue: []
      };
    
      handleChange = e => {
        const addInputValue = { ...this.state.addInputValue }
        addInputValue[e.target.name] = e.target.value;
        this.setState({ addInputValue });
      };
    
    
      submitCreateMyCompany = e => {
        e.preventDefault();
    
        axios
          .post("http://localhost:3002/company/edit", this.state.addInputValue)
          .then(this.setState({}))
         .then(window.history.back() );
        alert("Entreprise créée !")
      };
    render() {
        
        
        return (
            <div>
                <form onSubmit={this.submitCreateMyCompany}>
                    <fieldset>
                        <legend>Créer mon entreprise</legend>

                        <Saisie name="name" label="Nom*: " value={this.state.addInputValue.name} handleChange={this.handleChange} isRequired={"required"} />
                        <Saisie name="street_number" label="Numero de la rue: " value={this.state.addInputValue.street_number} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="street_name" label="Nom de la rue: " value={this.state.addInputValue.street_name} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="postal_code" label="Code postal: " value={this.state.addInputValue.postal_code} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="location" label="Lieu: " value={this.state.addInputValue.location} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="city" label="Ville: " value={this.state.addInputValue.city} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="phone_number_1" label="Telephone n°1: " value={this.state.addInputValue.phone_number_1} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="phone_number_2" label="Telephone n°2: " value={this.state.addInputValue.phone_number_2} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="mail" label="E-mail: " value={this.state.addInputValue.mail} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="siret" label="Siret: " value={this.state.addInputValue.siret} handleChange={this.handleChange} isRequired={false} />
                        <div> <Link to = {'/mycompany'}><button type="submit">Créer</button></Link></div>
                        <Link to ={'/'}><button>Retourner au Menu</button></Link>



                    </fieldset>
                </form>
            </div>
        )
    }
}
export default CreateMyCompany