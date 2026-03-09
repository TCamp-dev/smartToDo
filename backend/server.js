const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "smarttodo",
    password: "Beep2470",
    port: 5432
});



app.post("/tasks", async (req, res) => {
    console.log(req.body);
    const { title } = req.body;

    const result = await pool.query(
        "INSERT INTO tasks (title) VALUES ($1) RETURNING *", 
        [title]
    );

    res.json(result.rows[0]);
});

app.get("/tasks", async (req, res) => {

    const result = await pool.query(
        "SELECT * FROM tasks ORDER BY created_at DESC"
    )

    res.json(result.rows)
})

app.listen(5000, () => {
    console.log("Server running on port 5000");
});