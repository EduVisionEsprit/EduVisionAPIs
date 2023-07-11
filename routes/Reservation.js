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


router.post("/getReservationInInterval/:status/:name", (req, res) => {

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

function handleInnerRoute(heureDebut1, heureFin1, date1, id, req, res) {
    const sqlQuery = "INSERT INTO reservations (id_utilisateur, id_ressource, date_reservation, heure_debut, heure_fin, etat) VALUES (?, ?, ?, ?, ?, ?);";
    const params = [1, id, date1, heureDebut1, heureFin1, 'attente'];

    console.log('SQL Query:', sqlQuery);
    console.log('Parameters:', params);

    pool.query(sqlQuery, params, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while executing the SQL query' });
        } else {
            res.status(200).json({ message: 'SQL query executed successfully' });
        }
    });
}


router.get("/getReservationInInterval/:heureDebut1/:heureFin1/:date1/:heureDebut2/:heureFin2/:date2/:id", (req, res) => {
    console.log(pool);
    const sqlQuery = "SELECT * FROM reservations WHERE ((heure_debut >= ? AND heure_debut <= ? AND DATE(`date_reservation`) = ?) OR (heure_fin >= ? AND heure_fin <= ? AND DATE(`date_reservation`) = ?)) AND id_ressource = ? AND etat = 'confirme';";
    const params = [req.params.heureDebut1, req.params.heureFin1, req.params.date1, req.params.heureDebut2, req.params.heureFin2, req.params.date2, req.params.id];
    
    console.log('SQL Query:', sqlQuery);
    console.log('Parameters:', params);
    
    pool.query(sqlQuery, params, (err, rows, fields) => {
        if (err) {
            console.log(err);
        }
        
        if (rows && rows.length == 0) {
            handleInnerRoute(req.params.heureDebut1, req.params.heureFin1, req.params.date1, req.params.id, req, res);
        } else {
            res.status(500);
            res.json(rows);
        }
    });
});

router.get("/getSallesName", (req, res) => {
    console.log(pool)
    pool.query("SELECT nom_salle from ressources where type_ressource = 'salle'; ",
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