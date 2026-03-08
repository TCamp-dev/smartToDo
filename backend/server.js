const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

app.post("/tasks", (req, res) => {
    const task = {
        id: Date.now(),
        title: req.body.title,
        completed: false,
        created_at: new Date()
    };

    tasks.push(task);
    res.json(task);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});