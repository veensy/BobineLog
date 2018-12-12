import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class MenuFacure extends Component {
  render() {
    return (
      <div>
        <fieldset>
          <legend>Mes factures</legend>
        <div>
        <Link to={'/createbills/:id'}><button>Créer une facture</button></Link>
        </div>
        <div>
        <Link to={'/createbills/:id'}><button>Factures</button></Link>
        </div>
        <div>
        <Link to={'/turnover'}><button>Mon chiffre</button></Link>
        </div>
        </fieldset>
      </div>
    )
  }
}
