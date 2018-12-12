const  mysql = require('mysql2');
const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  'password', // le mot de passe
database :  'Belvilus&Fils', // le nom de la base de données
});

connection.connect((err) => {
    if (err) throw err
    console.log("Connected!")
})

module.exports = connection;