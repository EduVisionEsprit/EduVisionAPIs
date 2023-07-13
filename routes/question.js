const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const pool = mysql.createPool({
    connectionLimit: 10,
   
    user: "root",
    password: '',
    database: "pidevcs"
})


function getConnection() {
    return pool;
}

router.get("/quizquestion/:id", (req, res) => {
    console.log(pool)
    pool.query("SELECT * FROM `questionquiz` where id_quiz ="+req.params.id,
        (err, rows, fields) => {
            if(err)
                console.log(err)//sout  in java
            res.status(200)
            res.json(rows)
        })
})


router.get("/delete/:id", (req, res) => {
    pool.query("DELETE FROM `questionquiz` where id ="+req.params.id,
        (err, rows, fields) => {
            if(err)
                console.log(err)
            res.status(200)
            res.send(rows)
            
        })
})

router.get("/addQuiz/:idquiz/:designation/:reponse_correcte/:reponse_fausse1/:reponse_fausse2/:reponse_fausse3/:notetest", (req, res) => {

    console.log(req.params);
    pool.query("INSERT INTO `questionquiz`(`id_quiz`,`designation`,`reponse_correcte`,`reponse_fausse1`,`reponse_fausse2`,`reponse_fausse3`,`notetest`) VALUES (?,?,?,?,?,?,?)",
        [
            req.params.idquiz,
            req.params.designation,
            req.params.reponse_correcte,
            req.params.reponse_fausse1,
            req.params.reponse_fausse2,
            req.params.reponse_fausse3,
            req.params.notetest,
        ],
        (err, user_rows, fields) => {
            if(err)
                console.log(err)
            res.status(200);
            res.json(user_rows)

        });
})



router.get("/questionshow/:id", (req, res) => {
    console.log(pool)
    pool.query("SELECT * FROM `questionquiz` where id ="+req.params.id,
        (err, rows, fields) => {
            if(err)
                console.log(err)//sout  in java
            res.status(200)
            res.json(rows[0])
        })
})



router.get("/updateQuestion/:designation/:reponse_correcte/:reponse_fausse1/:reponse_fausse2/:reponse_fausse3/:notetest/:id", (req, res) => {

    console.log(req.params);
    pool.query("update `questionquiz` set `designation`='"+req.params.designation+"',`reponse_correcte`='"+req.params.reponse_correcte+"',`reponse_fausse1`='"+req.params.reponse_fausse1+"',`reponse_fausse2`='"+req.params.reponse_fausse2+"',`reponse_fausse3`='"+req.params.reponse_fausse3+"',`notetest`='"+req.params.notetest+"' where id="+req.params.id,
        (err, user_rows, fields) => {
            if(err)
                console.log(err)
            res.status(200);
            res.json(user_rows)

        });
})


module.exports = router;