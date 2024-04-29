const express = require('express')
const mysql = require('mysql')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())


const db = mysql.createConnection({
    host:"sql5.freemysqlhosting.net",
    user:"sql5697025",
    password:"DvY6vZq5F6",
    database:"sql5697025"
})

app.post("/accounts", (req, res) => {

    /**
     * Object.keys(req.body).length acquires the length of the given request
     * 
     * When the request is 1 object, it is a username fetch to get the account in the database
     * When the request is 2 objects, it is a login where username and password is given
     * When the request is 3 objects, it is an account creation where username, email, and password is given
     * 
     * Probably better ways to implement this functionality but it works and that's all that matters
     */

    if (Object.keys(req.body).length === 1) { // FETCH ACCOUNT
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

    else if (Object.keys(req.body).length === 2){ // LOGIN
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

    else if (Object.keys(req.body).length === 3){ // CREATE ACCOUNT
        const q = "INSERT INTO accounts (`email`, `username`, `password`) VALUES (?, ?, ?)"

        db.query(q, [req.body.email, req.body.username, req.body.password], (err, data) => {
            if(err) return res.json("Creation Unsuccessful")
            return res.json(data);
        })
    }
})

// currently just updates the picture selected by user, will have to be updated later for favorited and created study sets
app.put("/accounts", (req, res) => { 
    const q = "UPDATE accounts SET `picture` = ? WHERE `username` = ?"

    db.query(q, [req.body.index, req.body.username], (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
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
    const q = "SELECT ss_id, `title` FROM studysets WHERE ss_id = ?"
    db.query(q,req.params.ss_id,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/studysets/by-class/:class_id", (req,res)=>{
    const q = "SELECT class_id, `title` FROM studysets WHERE class_id = ?"
    db.query(q,req.params.class_id,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/studysets", (req,res)=>{
    const q = "INSERT INTO studysets (`title`) VALUES (?)"
    const value = req.body.title
    db.query(q, [value], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Study set has been created")
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