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

router.get("/quiz_front_json/quiz_formateur/:id", (req, res) => {
    console.log(pool)
    pool.query("SELECT * FROM `quiz` where id_utilisateur ="+req.params.id,
        (err, rows, fields) => {
            if(err)
                console.log(err)//sout  in java
            res.status(200)
            res.json(rows)
        })
})

router.get("/quizshow/:id", (req, res) => {
    console.log(pool)
    pool.query("SELECT * FROM `quiz` where id ="+req.params.id,
        (err, rows, fields) => {
            if(err)
                console.log(err)//sout  in java
            res.status(200)
            res.json(rows[0])
        })
})




router.get("/addQuiz/:sujet/:idformature", (req, res) => {

    console.log(req.params);
    pool.query("INSERT INTO `quiz`(`sujet`,`duree`,`id_utilisateur`) VALUES (?,'N/A',?)",
        [
            req.params.sujet,
            req.params.idformature
        ],
        (err, user_rows, fields) => {
            if(err)
                console.log(err)
            res.status(200);
            res.json(user_rows)

        });
})



router.get("/update/:sujet/:id", (req, res) => {

    console.log(req.params);
    pool.query("update `quiz` set `sujet`='"+req.params.sujet+"' where id="+req.params.id,
        (err, user_rows, fields) => {
            if(err)
                console.log(err)
            res.status(200);
            res.json(user_rows)

        });
})


router.get("/delete/:id", (req, res) => {
    pool.query("DELETE FROM `quiz` where id ="+req.params.id,
        (err, rows, fields) => {
            if(err)
                console.log(err)
            res.status(200)
            res.send(rows)
            
        })
})



module.exports = router;