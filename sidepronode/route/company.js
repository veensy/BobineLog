const express = require('express');
const app = express.Router();
const connection = require('./conf');

app.get('/', (req, res) => res.send('company'))

// info de l'entreprise
app.get('/info', (req, res) => {

  connection.query('SELECT * from company', (err, results) => {
    if (err) {
      res.status(500).send(`Erreur lors de la récupération des informations de l'entreprise`);
    } else {
      res.json(results);
    }
  });
});

// insertion des info de l'entreprise
app.post('/edit', (req, res) => {

  const formData = req.body;

  connection.query('INSERT INTO company SET ?', formData, (err, results) => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde des informations de l'entreprise");
    } else {
      res.json(results);
    }
  });
});

//modification de la fiche entreprise
app.put('/modify/:id', (req, res) => {
  const  { id }  = req.params;     
  const formData = req.body;

  connection.query(`UPDATE company SET ? WHERE id = ?`, [formData,id], (err, results)=> {
      if (err){
      res.send(err);
      console.log("erreur")
    } else {
      res.json(results)
    }
  });
  
});

// chiffre d'affaire des factures payés entre 2 dates 
app.get('/between_turnover', (req, res) => {

  const { begin_date, end_date } = req.body;

  connection.query('SELECT SUM(amount) FROM bills WHERE is_payed = ? and update_date between ? and ?',
   [1, begin_date, end_date], (err, results) => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors du calcul du chiffre d'affaire entre ces dates");
    } else {
      res.json(results);
    }
  });
});

// montant des impayes entre 2 dates
app.get('/between_lacked', (req, res) => {

  const { begin_date, end_date } = req.body;

  connection.query(`SELECT SUM(amount) as amount FROM bills WHERE is_payed = ? and update_date between ? and ?
  UNION SELECT SUM(deposit) as amount FROM bills WHERE is_payed = ? and update_date between ? and ?`,
   [0, begin_date, end_date,0, begin_date, end_date], (err, results) => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors du calcul des impayés entre ces dates");
    } else {
      const total = Number(results[0].amount - results[1].amount)
      res.json(total);
    }
  });
});

// chiffre d'affaire incluant les accomptes entre 2 dates
app.get('/turnover_between_add_deposit', (req, res) => {

  const { begin_date, end_date } = req.body;

  connection.query(`SELECT SUM(deposit) as deposit FROM bills WHERE is_payed = ? and update_date between ? and ? 
  UNION SELECT SUM(amount) as amount FROM bills WHERE is_payed = ? and update_date between ? and ?`,
   [0, begin_date, end_date, 1, begin_date, end_date], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors du calcul du chiffre d'affaire mensuel incluant les accomptes");
    } else {
      const total = Number(results[0].deposit) + Number(results[1].deposit)
      res.json(total)
    }
  })

})

// montant total des factures payé ou non (chiffre affaire prévisionnel)

app.get('/turnover_all', (req, res) => {

  connection.query('SELECT SUM(amount) as amount FROM bills', (err, results) => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors du calcul du chiffre d'affaire depuis la premiere untilsation");
    } else {
      res.json(results);
    }
  });
});


module.exports = app