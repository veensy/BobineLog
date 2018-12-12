const express = require('express');
const app = express.Router(); 
const connection = require('./conf');

app.get('/', (req, res) => res.send('bills'));

// lisiting complet des factures
app.get('/list', (req, res) => {

  connection.query('SELECT * from bills', req.params.id , (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des factures');
    } else {
      res.json(results);
    }
  });
});

// listing des factures par ID
app.get('/listid/:id', (req, res) => {

  connection.query('SELECT  * from bills WHERE id=?',req.params.id, (err, results) => {

    if (err) {
      res.status(500).send('Erreur lors de la récupération de la facture');
    } else {
      res.json(results);
      console.log('listing ok');
      
    }
  });
});

app.get('/listclient/:id', (req, res) => {

  connection.query('SELECT  * from bills WHERE clients_id=?',req.params.id, (err, results) => {

    if (err) {
      res.status(500).send('Erreur lors de la récupération de la facture');
    } else {
      res.json(results);
      console.log('listing ok');
      
    }
  });
});

// creation d'une facture
app.post('/create', (req, res) => {

  const { description, article_number,unit_price,amount,deposit,tva,is_payed,is_active,clients_id } = req.body;

  connection.query('INSERT INTO bills VALUES (NULL,?,?,?,?,?,?,NOW(),NOW(),?,?,?)', 
  [description, article_number,unit_price,amount,deposit,tva,is_payed,is_active,clients_id], (err, results) => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un article");
    } else {
        res.json(results);
        console.log('facture créée');
        
    }
  });
});

//modification de la facture
app.put('/modify/:id', (req, res) => {
  const  { id }  = req.params;     
  const { description, article_number,unit_price,amount,tva,is_active,deposit,is_payed,clients_id } = req.body;

  connection.query(`UPDATE bills SET update_date = NOW(), article_number = ?, unit_price = ?, amount = ?, tva = ?, is_active = ?, deposit = ?, is_payed = ?, clients_id = ?, description = ? WHERE id = ? `, 
  [description, article_number,unit_price,amount,tva,is_active,deposit,is_payed,clients_id,id], (err, results)=> {
      if (err){
      res.send(err);
      console.log("erreur")
    } else {
      res.json(results)
    }
  });
  
});

module.exports = app; 