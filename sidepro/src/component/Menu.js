import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Menu extends Component {
  render() {
    return (
      <div>
        <fieldset>
          <legend>Menu</legend>
        <div>
        <Link to={'/createmycompany'}><button>Créer mon entreprise</button></Link>
        </div>
        <div>
        <Link to={'/mycompany'}><button>Mon entreprise</button></Link>
        </div>
        <div>
        <Link to={'/createclient'}><button>Créer une fiche client</button></Link>
        </div>
        <div>
        <Link to={'/myclientslist'}><button>Mes clients</button></Link>
        </div>
        <div>
        <Link to={'/turnover'}><button>Mon chiffre</button></Link>
        </div>
        </fieldset>
      </div>
    )
  }
}
