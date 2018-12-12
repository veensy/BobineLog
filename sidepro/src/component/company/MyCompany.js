import React, { Component } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

class MyCompany extends Component {
  state = {
    myCompany : [],
    isLoading : false
  };

    componentDidMount() {
        this.getMyCompanyInfo();
    }


    getMyCompanyInfo = e => {
        this.setState({isLoading:true})
        axios
            .get("http://localhost:3002/company/info")
            .then( response =>  this.setState({myCompany:response.data, isLoading:false }))
            
     
  };

  render() {
    if (!this.state.isLoading)
    return (
      <div>
          <fieldset>
            <legend>Mon entreprise</legend>
            {this.state.myCompany.map((el, index) => 
                <div key = {index}>
                    
                    <h1>{el.name}</h1>
                    <p><strong>Adresse : </strong>{el.street_number} {el.street_name}</p>
                    <p><strong>Code postal : </strong>{el.postal_code}</p>
                    <p><strong>Localité : </strong>{el.location}</p>
                    <p><strong>Ville : </strong>{el.city}</p>
                    <p><strong>Tél : </strong>{el.phone_number_1}</p>
                    <p><strong>Tél : </strong>{el.phone_number_2}</p>
                    <p><strong>E-mail : </strong>{el.mail}</p>
                    <p><strong>Siret : </strong>{el.siret}</p>
                



                    <Link to={'/modifymycompany/'+el.id}><button>Modifier</button></Link>
                    
                    <Link to ={'/'}><button>Retourner au Menu</button></Link>
                    
                    </div>  
            

            )
        }
 
        </fieldset>
      </div>
    );
    else return (<div> Loading ....</div>)
  }
}

export default MyCompany;
