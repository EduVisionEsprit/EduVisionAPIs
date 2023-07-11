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


router.post("/create/:status/:name", (req, res) => {

    console.log(req.params);
    pool.query("INSERT INTO `task`(`status`,`name`) VALUES (?,?)",
        [
            req.params.status,
            req.params.name],
        (err, user_rows, fields) => {
            if(err)
                console.log(err)
            res.status(200);
            res.json(user_rows)

        });
})

router.get("/get", (req, res) => {
    console.log(pool)
    pool.query("SELECT * FROM `reservations` ",
        (err, rows, fields) => {
            if(err)
                console.log(err)//sout  in java
            res.status(200)
            res.json(rows)
        })
})

router.get("/delete/:id", (req, res) => {
    pool.query("DELETE FROM `task` where id =? ",req.params.id,
        (err, rows, fields) => {
            if(err)
                console.log(err)
            res.status(200)
            res.send(rows)
            
        })
})



module.exports = router;