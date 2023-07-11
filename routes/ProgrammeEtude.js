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

router.get('/create/:description', (req, res) => {
  pool.query('INSERT INTO `programmes_etudes` (`description`) VALUES (?)', [req.params.description], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    return res.status(200).json(rows);
  });
});


router.get('/get', (req, res) => {
  pool.query('SELECT * FROM `programmes_etudes`', (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get('/delete/:id', (req, res) => {
  pool.query('DELETE FROM `programmes_etudes` WHERE `id_programme` = ?', [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get('/update/:id/:description', (req, res) => {
  pool.query('UPDATE `programmes_etudes` SET `description` = ? WHERE `id_programme` = ?', [req.params.description, req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(rows);
    }
  });
});

module.exports = router;
