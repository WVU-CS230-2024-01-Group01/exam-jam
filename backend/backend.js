import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host : "sql5.freemysqlhosting.net",
    user: "sql5697025",
    password: "DvY6vZq5F6",
    database: "sql5697025"
})

app.use(express.json())
app.use(cors())

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

app.post("/studysets", (req,res)=>{
    const q = "INSERT INTO studysets (`title`) VALUES (?)"
    const values = [req.body.title]
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Study set has been created")
    })
})

app.delete("/studysets/:id", (req,res)=>{
    const setId = req.params.id
    const q = "DELETE FROM studysets WHERE id = ?"

    db.query(q,[setId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Study set has been deleted")
    })
})

app.put("/studysets/:id", (req,res)=>{
    const setId = req.params.id
    const q = "UPDATE studysets SET `title`=? WHERE id = ?"

    const values = [req.body.title]

    db.query(q,[...values,setId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Study set has been updated")
    })
})

app.listen(8081, ()=>{
    console.log("Connected to backend!")
})