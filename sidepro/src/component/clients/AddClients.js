import React, { Component } from 'react';
import Saisie from '../Saisie'
import axios from 'axios'
import { Link } from 'react-router-dom'

class AddClients extends Component {
    state = {
        addInputValue: []
      };
    
      handleChange = e => {
        const addInputValue = { ...this.state.addInputValue }
        addInputValue[e.target.name] = e.target.value;
        this.setState({ addInputValue });
      };
    
    
      submitAddClients = e => {
        e.preventDefault();
    
        axios
          .post("http://localhost:3002/clients/edit", this.state.addInputValue)
          .then(this.setState({}))
         .then(window.history.back() );
        alert("Client créée !")
        console.log(this.state.addInputValue);

      };
    render() {
        
        
        return (
            <div>
                <form onSubmit={this.submitAddClients}>
                    <fieldset>
                        <legend>Ajouter un client</legend>

                        <Saisie name="name" label="Nom*: " value={this.state.addInputValue.name} handleChange={this.handleChange} isRequired={"required"} />
                        <Saisie name="street_number" label="Numero de la rue: " value={this.state.addInputValue.street_number} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="street_name" label="Nom de la rue: " value={this.state.addInputValue.street_name} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="postal_code" label="Code postal: " value={this.state.addInputValue.postal_code} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="lieu" label="Lieu: " value={this.state.addInputValue.lieu} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="city" label="Ville: " value={this.state.addInputValue.city} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="phone_number" label="Telephone : " value={this.state.addInputValue.phone_number} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="mail" label="E-mail: " value={this.state.addInputValue.mail} handleChange={this.handleChange} isRequired={false} />
                        <div> <button type="submit">Ajouter</button></div>
                        <Link to ={'/'}><button>Retourner au Menu</button></Link>




                    </fieldset>
                </form>
            </div>
        )
    }
}
export default AddClients