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

router.get('/create/:nomMatiere/:idModule/:coef', (req, res) => {
  pool.query('INSERT INTO `matieres` (`nom_matiere`, `id_module`, `coef`) VALUES (?, ?, ?)', [req.params.nomMatiere, req.params.idModule, req.params.coef], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    return res.status(200).json(rows);
  });
});


router.get('/get', (req, res) => {
  pool.query('SELECT * FROM `matieres`', (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get('/delete/:id', (req, res) => {
  pool.query('DELETE FROM `matieres` WHERE `id_matiere` = ?', [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get('/update/:id/:nomMatiere/:idModule/:coef', (req, res) => {
  pool.query('UPDATE `matieres` SET `nom_matiere` = ?, `id_module` = ?, `coef` = ? WHERE `id_matiere` = ?', [req.params.nomMatiere, req.params.idModule, req.params.coef, req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(rows);
    }
  });
});

module.exports = router;
