const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const pool = mysql.createPool({
  connectionLimit: 10,
  user: 'root',
  password: '',
  database: 'pidevcs'
});

function getConnection() {
  return pool;
}

router.get('/create/:nomMat/:qt', (req, res) => {
  pool.query("INSERT INTO `ressources` (`id_ressource`, `type_ressource`, `type_salle`, `nom_salle`, `capacite`, `equipements`, `disponibilite`, `nom_materiel`, `quantite_materiel`, `Archive`) VALUES (NULL, 'Materiel', NULL, NULL, NULL, NULL, NULL, ?, ?, '0');", [req.params.nomMat, req.params.qt], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    return res.status(200).json(rows);
  });
});


router.get('/get', (req, res) => {
  pool.query("SELECT * FROM `ressources` WHERE type_ressource = 'materiel' and archive <> 1", (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get('/delete/:id', (req, res) => {
  pool.query('UPDATE `ressources` SET `Archive` = 1 WHERE `ressources`.`id_ressource` = ?', [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get('/update/:id/:nomMat/:qt', (req, res) => {
  pool.query("UPDATE `ressources` SET `nom_materiel` = ?, `quantite_materiel` = ? WHERE `ressources`.`id_ressource` = ?;", [req.params.nomMat, req.params.qt, req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(rows);
    }
  });
});

module.exports = router;
