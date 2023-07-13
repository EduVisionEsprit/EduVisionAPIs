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

router.get('/create/:nomModule', (req, res) => {
  pool.query('INSERT INTO `modules` (`nom_module`) VALUES (?)', [req.params.nomModule], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    return res.status(200).json(rows);
  });
});


router.get('/get', (req, res) => {
  pool.query('SELECT * FROM `modules`', (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get('/delete/:id', (req, res) => {
  pool.query('DELETE FROM `modules` WHERE `id_module` = ?', [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get('/update/:id/:nomModule', (req, res) => {
  pool.query('UPDATE `modules` SET `nom_module` = ? WHERE `id_module` = ?', [req.params.nomModule, req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(rows);
    }
  });
});

module.exports = router;
