import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import moment from 'moment'

class MyClientsList extends Component {
  state = {
    myClientsList: [],
    isLoading: false
  };

  componentDidMount() {
    this.getMyClientsList();
  }


  getMyClientsList = e => {
    this.setState({ isLoading: true })
    axios
      .get("http://localhost:3002/clients/list/")
      .then(response => this.setState({ myClientsList: response.data, isLoading: false }))


  };

  render() {
    if (!this.state.isLoading)
      return (
        <div>
          <fieldset>
            <legend>Mes clients</legend>
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Adresse</th>
                  <th>Code postal</th>
                  <th>Localité</th>
                  <th>Ville</th>
                  <th>Télephone</th>
                  <th>E-mail</th>
                  <th>Date de creation</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {this.state.myClientsList.map((el, idx) =>

                  <tr key = {idx}>
                    <td>{el.name}</td>
                    <td>{el.street_number} {el.street_name}</td>
                    <td>{el.postal_code}</td>
                    <td>{el.lieu}</td>
                    <td>{el.city}</td>
                    <td>{el.phone_number}</td>
                    <td>{el.mail}</td>
                    <td>{moment(el.date_creation).format('DD/MM/YY')}</td>
                    <td className="options">
                      <Link to={'/modifymyclientsList/' + el.id}><button>Modifier un client</button></Link>
                      <Link to={'/createbills/' + el.id}><button>Editer une facture</button></Link>
                      <Link to={'/clientsbills/' + el.id}><button>Liste des factures</button></Link>
                    </td>



                  </tr>
                )
                }

              </tbody>
            </table>
            <Link to={'/'}><button>Retourner au Menu</button></Link>
          </fieldset>
        </div>
      );
    else return (<div> Loading ....</div>)
  }
}

export default MyClientsList;
