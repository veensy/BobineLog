import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'

export default class ClientsBills extends Component {

    state = { clientsBills: [], isLoading: false , clientsAmountByMonth : 0 ,clientsAmountByYear : 0, clientsUnpayed : 0 }

    getClientsBills = async () => {

        this.setState({ isLoading : true })
        const id = this.props.match.params.id;

        axios
            .get(`http://localhost:3002/bills/listclient/${id}`)
            .then(response => this.setState({ clientsBills: response.data, isLoading: false }))
    }

    getClientsAmountByMonth = async () => {
        this.setState({ isLoading : true })
        const id = this.props.match.params.id;
        axios
            .get(`http://localhost:3002/clients/billsperclientsamountmonth/${id}`)
            .then(response => this.setState({ clientsAmountByMonth : response.data , isLoading : false }))
        
        
    }

    getClientsAmountByYear = async () => {
        this.setState({ isLoading : true })
        const id = this.props.match.params.id;
        axios
            .get(`http://localhost:3002/clients/billsperclientsamountyear/${id}`)
            .then(response => this.setState({ clientsAmountByYear : response.data , isLoading : false }))
    }

    getClientsUnpayed = async () => {
        this.setState({ isLoading : true })
        const id = this.props.match.params.id;
        axios
            .get(`http://localhost:3002/clients/billsunpayed/${id}`)
            .then(response => this.setState({ clientsUnpayed : response.data , isLoading : false }))
    }


    componentDidMount(){ this.getClientsBills() ; this.getClientsAmountByMonth() ; this.getClientsAmountByYear() ; this.getClientsUnpayed() }
   
    
    
    render() {
                
        if (!this.state.isLoading)

            return (
                <div>
                    <fieldset>
            <legend>Mes factures</legend>
            <table>
              <thead>
                <tr>
                  <th>reference</th>
                  <th>accompte</th>
                  <th>Montant de la facture</th>
                  <th>Payé</th>
                  <th>Date de la dernière facture</th>
                
                </tr>
              </thead>
              <tbody>
                  {this.state.clientsBills.map((el,idx) => 
    
                  
                  <tr key ={idx}>
                  <td>{el.id}</td>
                  <td>{el.deposit}</td>
                  <td>{el.amount}</td>
                  <td>{el.is_payed ? "Oui" : "Non"}</td>
                  <td>{moment(el.update_date).format('DD/MM/YYYY')}</td>
                  </tr>

                )}

                  </tbody>
                  </table>
                  <Link to ={'/myclientslist'}><button>Retourner à la liste des clients</button></Link>
                  </fieldset>

                  <fieldset>
                      <legend>Montant des factures</legend>
                      <table>
                          <thead>
                              <tr>
                                  <th>Mois en cours</th>
                                  <th>Année en cours</th>
                                  <th>Impayé en cours</th>

                              </tr>
                          </thead>
                          <tbody>
                              
                              <tr>
                                  <td>{this.state.clientsAmountByMonth}</td>
                                  <td>{this.state.clientsAmountByYear}</td>
                                  <td>{this.state.clientsUnpayed}</td>

                              </tr>
                          </tbody>
                      </table>
                  </fieldset>

                </div>
            )
        else return (<div> Loading ....</div>)
    }
}
