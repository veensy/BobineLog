import React, { Component } from 'react'
import axios from "axios";
import {Link} from 'react-router-dom'

export default class Turnover extends Component {
    state = { turnover : [], isLoading : false }

    getTurnover = () => {
        this.setState({ isLoading : true })
        axios
            .get('http://localhost:3002/company/turnover_all')
            .then( reponse => this.setState({ turnover : reponse.data , isLoading : false }) )
    }

    componentDidMount(){ this.getTurnover() }

  render() {
      console.log(this.state.turnover);
      
    if (!this.state.isLoading)
    return (
      <div>
          {/* <p>{this.state.turnover}</p> */}
        
      </div>
    )
    else return (<div> Loading ....</div>)
  }
}
