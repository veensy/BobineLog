const express = require('express');
const app = express.Router(); 
const connection = require('./conf');

app.get('/', (req, res) => res.send('client'));

// listing des clients
app.get('/list', (req, res) => {

  connection.query('SELECT * FROM clients', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des clients');
    } else {
      res.json(results);
    }
  });
});

// info par client
app.get('/listname/:name', (req, res) => {

  connection.query('SELECT * FROM clients WHERE name = ? ',req.params.name, (err, results) => {

    if (err) {
      res.status(500).send('Erreur lors de la récupération du noms du clients');
    } else {
      res.json(results);
    }
  });
});

app.get('/listid/:id', (req, res) => {

  connection.query('SELECT * FROM clients WHERE id = ? ',req.params.id, (err, results) => {

    if (err) {
      res.status(500).send('Erreur lors de la récupération du noms du clients');
    } else {
      res.json(results);
    }
  });
});

// insertion des infos d'un client
app.post('/edit', (req, res) => {

  const {name,street_number,street_name,lieu,postal_code,city,phone_number,mail,is_active} = req.body;

  connection.query('INSERT INTO clients VALUES (NULL,?,?,?,?,?,?,?,?,NOW(),?)',
  [ name,street_number,street_name,lieu,postal_code,city,phone_number,mail,is_active], (err, results) => {

    if (err) {
        console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde du client");
    } else {
        res.json(results);
        console.log('ok');
        
    }
  });
});

//modification de la fiche d'un client
app.put('/modify/:id', (req, res) => {
  const  { id }  = req.params;     
  const {name,street_number,street_name,lieu,postal_code,city,phone_number,mail} = req.body;
   
  connection.query(`UPDATE clients SET name = ?, street_number = ?, street_name = ?, lieu = ?, postal_code = ?, city = ?, phone_number = ?, mail = ?  WHERE id = ?`, [name,street_number,street_name,lieu,postal_code,city,phone_number,mail,id], (err, results)=> {
      if (err){
      res.send(err);
      console.log("erreur")
    } else {
      res.json(results)
      console.log('modification ok');
      
    }
  });
  
});

// liste des factures trier par clients
app.get('/billsperclients/:id', (req,res) =>{

  const { id } = req.params;
  connection.query('SELECT * FROM bills WHERE clients_id = ? ' ,id , (err,results)=>{
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de l'affichage des factures");
    } else {
      res.json(results)
    }
  })
})


// sommes des factures du mois en cours trier par clients
app.get('/billsperclientsamountmonth/:id', (req,res) =>{

  const { id } = req.params;
  connection.query('SELECT SUM(amount) as res FROM bills WHERE clients_id = ?  and MONTH(update_date) = MONTH(CURRENT_DATE()) ' ,[id ], (err,results)=>{
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de l'affichage des factures");
    } else {
      res.json(Number(results[0].res))      
    }
  })
})

// sommes des factures de l'année en cours trier par clients
app.get('/billsperclientsamountyear/:id', (req,res) =>{

  const { id } = req.params;
  connection.query('SELECT SUM(amount) as res FROM bills WHERE clients_id = ?  and YEAR(update_date) = YEAR(CURRENT_DATE()) ' ,[id ], (err,results)=>{
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de l'affichage des factures");
    } else {
      res.json(Number(results[0].res))      
    }
  })
})

//total des factures payé entre 2 dates par un client / accomptes exclu
app.get('/billspayednodeposit/:id', (req,res) =>{
  const { id } = req.params;
  const { begin_date, end_date } = req.body;

  connection.query('SELECT SUM(amount) FROM bills WHERE clients_id = ? and is_payed = ? and update_date between ? and ?', 
  [id,1,begin_date, end_date], (err,results)=>{
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de l'affichage des factures");
    } else {
      res.json(results)
    } 
  })

})

//total des factures impayé du mois  en cours par client  
app.get('/billsunpayed/:id', (req,res) =>{
  const { id } = req.params;
  

  connection.query(`SELECT SUM(amount) as amount FROM bills WHERE clients_id = ? and is_payed = ? 
  UNION SELECT SUM(deposit) as deposit FROM bills WHERE clients_id = ? and is_payed = ? `,
   [id,0, id,0], (err,results)=>{
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de l'affichage des factures");
    } else {
      if (results[0] === undefined || results[1] === undefined){
        res.send('Null')  
      }else{

        const total = Number(results[0].amount) - Number(results[1].amount)
        res.json(total)
      }
      
    } 
  })

})


//total des factures impayé entre 2 dates par client  
app.get('/billsunpayedbydate/:id', (req,res) =>{
  const { id } = req.params;
  const { begin_date, end_date } = req.body;

  connection.query(`SELECT SUM(amount) as amount FROM bills WHERE clients_id = ? and is_payed = ? and update_date between ? and ? 
  UNION SELECT SUM(deposit) as deposit FROM bills WHERE clients_id = ? and is_payed = ? and update_date between ? and ? `,
   [id,0,begin_date, end_date, id,0,begin_date, end_date ], (err,results)=>{
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de l'affichage des factures");
    } else {
      const total = Number(results[0].amount) - Number(results[1].amount)
      res.json(total)
    } 
  })

})

// total des accompote versé par un client entre 2 dates

app.get('/depositbetweendate/:id',(req,res) =>{
  const { id } = req.params;
  const { begin_date, end_date } = req.body;
  connection.query(`SELECT SUM(deposit) FROM bills WHERE clients_id = ? and is_payed = ? and update_date between ? and ?`,
  [id,0,begin_date,end_date],(err,results)=>{
    if(err){
      console.log(err);
      res.status(500).send(`Erreur lors de l'affichage des accomptes entre ces dates `)
    }else{
      res.json(results)
    }
  })
})

// total des factures paye par un client trier par date / accompte inclus
app.get('/billspayedwithdeposit/:id',(req,res)=>{
  const { id } = req.params;
  const { begin_date, end_date } = req.body;

  connection.query(`SELECT SUM(amount) as amount FROM bills WHERE clients_id = ? and is_payed = ? and update_date between ? and ? 
  UNION SELECT SUM(deposit) as deposit FROM bills WHERE clients_id = ? and is_payed = ? and update_date between ? and ?`,
  [id,1,begin_date,end_date,id,0,begin_date,end_date],(err,results)=>{
    if(err){
      console.log(err);
      res.status(500).send("Erreur lors du calcul des factures")
    }else{
      const total = Number(results[0].amount) + Number(results[1].amount)
      res.json(total)
    }
  })
})



module.exports = app