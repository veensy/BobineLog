import React, { Component } from 'react';
import Saisie from '../Saisie'
import axios from 'axios'
import { Link } from 'react-router-dom'

class CreateBills extends Component {
    state = {
        addInputValue: {is_payed:[], clients_id:this.props.match.params.id},
      };
    
      handleChange = e => {
        const addInputValue = { ...this.state.addInputValue }
        addInputValue[e.target.name] = e.target.value;
        this.setState({ addInputValue });
        console.log(addInputValue);
        
      };

      handleChangeRadio = (e) => {
          const radio = document.getElementsByName('isPayed');
          
          let valeur = ""
          for (var i = 0; i < radio.length; i++) {
              if (radio[i].checked) {
                  valeur = radio[i].value;
              }
              
          }
      
          this.setState({
            addInputValue:
              { ...this.state.addInputValue, is_payed: valeur,clients_id:this.props.match.params.id }
          })
          
      }
    
      submitCreateBills = e => {
        e.preventDefault();
    
        axios
          .post("http://localhost:3002/bills/create", this.state.addInputValue)
          .then(this.setState({}))
         .then(window.history.back() );
        alert("Facture créée !")
      };
    render() {
 console.log(this.state.addInputValue);
 
       
        
        
        return (
            <div>
                <form onSubmit={this.submitCreateBills}>
                    <fieldset>
                        <legend>Créer une facture</legend>

                        <Saisie name="description" label="Description: " value={this.state.addInputValue.description} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="article_number" label="Nombre d'article: " value={this.state.addInputValue.article_number} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="unit_price" label="Prix unitaire: " value={this.state.addInputValue.unit_price} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="amount" label="Montant: " value={this.state.addInputValue.amount} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="deposit" label="Accompte: " value={this.state.addInputValue.deposit} handleChange={this.handleChange} isRequired={false} />
                        <Saisie name="tva" label="Taxe: " value={this.state.addInputValue.tva} handleChange={this.handleChange} isRequired={false} />
                        
                        <fieldset>
                            <legend>Facture réglée</legend>
                        <input name="isPayed" id="Oui" type = "radio"  value = "1" onChange={this.handleChangeRadio} isRequired={false}  />
                        <label for="Oui">Oui</label>
                        <input name="isPayed" id="Non" type = "radio" value = "0"  onChange={this.handleChangeRadio} isRequired={false}  />
                        <label for="Non">Non</label>
                        </fieldset>
                      

                        <div> <button type="submit">Créer</button></div>
                        <Link to ={'/'}><button>Retourner au Menu</button></Link>
                        <Link to ={'/'}><button>Retourner au Menu</button></Link>




                    </fieldset>
                </form>
            </div>
        )
    }
}
export default CreateBills