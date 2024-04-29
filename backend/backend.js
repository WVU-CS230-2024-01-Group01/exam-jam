const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const dotenv = require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

if (dotenv.error){
    console.error('error loading', dotenv.error)
    process.exit(1)
}

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

app.post("/accounts", (req, res) => {

    if (req.body.question === "FETCH") { // FETCH ACCOUNT
        const q = "SELECT * FROM accounts WHERE username = ?"
        
        try {
            db.query(q, [req.body.username], (err, data) => {
                if (err) return res.json("ERROR")
                if (data.length != 0) { 
                    return res.json(data[0])
                } else { // if length of data equals 0, there is no record of account in database
                    return res.json("Could not find account")
            }
          })
        } catch (err) {
            console.log(err)
        }
    }

    else if (req.body.question === "LOGIN"){ // LOGIN
        const q = "SELECT * FROM accounts WHERE username = ? AND password = ?"

        db.query(q, [req.body.username, req.body.password], (err, data) => {
            if(err) return res.json("Login Unsuccessful")
            if(data.length != 0){ 
                return res.json("Login Successful")
            } else { // if length of data equals 0, no account matches the username and password
                return res.json("Username or Password incorrect");
            }
        })
    }

    else if (req.body.question === "CREATE"){ // CREATE ACCOUNT
        const q = "INSERT INTO accounts (`email`, `username`, `password`) VALUES (?, ?, ?)"

        db.query(q, [req.body.email, req.body.username, req.body.password], (err, data) => {
            if(err) return res.json("Creation Unsuccessful")
            return res.json(data);
        })
    }
})

app.put("/accounts", (req, res) => { 

    if (req.body.question === "UPDATE_PICTURE"){
        const q = "UPDATE accounts SET `picture` = ? WHERE `username` = ?"

        db.query(q, [req.body.index, req.body.username], (err, data) => {
            if(err) return res.json(err)
            return res.json(data)
        })
    }

    else if (req.body.question === "UPDATE_CREATEDSETS") {
        const q = "UPDATE accounts SET `created_sets` = CONCAT_WS(',', `created_sets`, ?) WHERE `username` = ?"

        db.query(q, [req.body.ss_id, req.body.username], (err, data) => {
            if(err) return res.json(err)
            return res.json(data)
        })
    }

    else if (req.body.question === "UPDATE_FAVORITESETS") {

    }
})

app.get("/", (req,res)=>{
    res.json("Hello this is the backend")
})

app.get("/studysets", (req,res)=>{
    const q = "SELECT * FROM studysets"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/studysets/:ss_id", (req,res)=>{
    const q = "SELECT ss_id, `title`, `class_id` FROM studysets WHERE ss_id = ?"
    db.query(q,req.params.ss_id,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/studysets/by-class/:class_id", (req,res)=>{
    const q = "SELECT class_id, `title`, `ss_id` FROM studysets WHERE class_id = ?"
    db.query(q,req.params.class_id,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/studysets", (req,res)=>{
    const q = "INSERT INTO studysets (`title`, `class_id`, `username`) VALUES (?,?,?)"
    const value = req.body.title
    const courseId = req.body.class_id
    const uid = req.body.uid
    db.query(q, [value,courseId, uid], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data.insertId);
    })
})

app.delete("/studysets/:ss_id", (req,res)=>{
    const setId = req.params.ss_id
    const q = "DELETE FROM studysets WHERE `ss_id` = ?"

    db.query(q,[setId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Study set has been deleted")
    })
})

app.put("/studysets/:ss_id", (req,res)=>{
    const setId = req.params.ss_id
    const q = "UPDATE studysets SET `title`=? WHERE `ss_id` = ?"

    const values = req.body.title

    db.query(q,[values,setId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Study set has been updated")
    })
})

app.get("/studycards/:ss_id", (req,res)=>{
    const setId = req.params.ss_id
    const q = "SELECT * FROM studycards WHERE `ss_id` = ?"
    db.query(q,[setId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/studycards/:ss_id/:card_id", (req,res)=>{
    const setId = req.params.ss_id
    const cardId = req.params.card_id
    const q = "SELECT card_id, `side1`, `side2` FROM studycards WHERE ss_id = ? AND `card_id` = ?"
    db.query(q, [setId,cardId], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/studycards/:ss_id", (req,res)=>{
    const ss_id = req.params.ss_id;
    const q = "INSERT INTO studycards (`side1`, `side2`, `ss_id`) VALUES (?, ?, ?)";
    const { side1, side2 } = req.body;
    
    db.query(q, [side1, side2, ss_id], (err, data) => {
        if (err) return res.json(err);
        return res.json("Study card has been created");
    })
})

app.put("/studycards/:card_id", (req,res)=>{
    const q = "UPDATE studycards SET `side1` = ?, `side2` = ? WHERE `card_id` = ?";
    const { side1, side2 } = req.body;
    const cardId = req.params.card_id
        db.query(q, [side1, side2, cardId], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Study card has been updated")
    })
})

app.delete("/studycards/:card_id", (req,res)=>{
    const cardId = req.params.card_id
    const q = "DELETE FROM studycards WHERE card_id = ?"

    db.query(q,[cardId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Study card has been deleted")
    })
})

app.get("/classes/:class_id", (req,res)=>{
    const q = "SELECT class_id, `title` FROM classes WHERE class_id = ?"
    db.query(q,req.params.class_id,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8081, () => {
    console.log("Listening...")
})