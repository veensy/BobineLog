import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateMyCompany from './component/company/CreateMyCompany'
import MyCompany from './component/company/MyCompany';
import Menu from './component/Menu'
import ModifyMyCompany from './component/company/ModifyMyCompany'
import './component/Style.css'
import AddClients from './component/clients/AddClients';
import MyClientsList from './component/clients/MyClientsList';
import ModifyMyClientsList from './component/clients/ModifyMyClients';
import CreateBills from './component/bills/CreateBills'
import ModifyBills from './component/bills/ModifyBills'
import ClientsBills from './component/bills/ClientsBills'
import MenuFacture from './component/MenuFacture'
import Turnover from './component/company/Turnover';

class App extends Component {
  render() {
    return (
      <div>
         <Switch>

            <Route exact path = '/' component = { Menu } />
            <Route path = "/mycompany" component = { MyCompany } />
            <Route path = "/createmycompany" component = { CreateMyCompany } />
            <Route path = "/modifymycompany" component = { ModifyMyCompany } />
            <Route path = "/myclientslist/" component = { MyClientsList } />
            <Route path = "/createclient" component = { AddClients} />
            <Route path = "/modifymyclientsList/:id" component = { ModifyMyClientsList } />
            <Route path = "/createbills/:id" component = { CreateBills } />
            <Route path = "/modifybills/:id" component = { ModifyBills } />
            <Route path = "/clientsbills/:id" component = { ClientsBills } />
            <Route path = "/bills/:id" component = { MenuFacture } />
            <Route path = "/turnover" component = { Turnover } />

          </Switch>
      </div>
    );
  }
}

export default App;
