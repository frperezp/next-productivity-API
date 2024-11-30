const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
// Habilita CORS
app.use(cors({ origin: "*" })); // "http://react-app:3000"

app.use(bodyParser.json());

const tasksFilePath = "./tasks.json";

// Endpoints para CRUD
app.get("/tasks", (req, res) => {
  fs.readFile(tasksFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(JSON.parse(data));
  });
});

app.post("/tasks", (req, res) => {
  const newTask = req.body;

  fs.readFile(tasksFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: err });
    const tasks = JSON.parse(data);
    tasks.push(newTask);

    fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json(newTask);
    });
  });
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const updatedTask = req.body;

  fs.readFile(tasksFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: err });
    const tasks = JSON.parse(data);
    const index = tasks.findIndex((task) => task.id === taskId);

    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
      fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json(tasks[index]);
      });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  });
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);

  fs.readFile(tasksFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: err });
    const tasks = JSON.parse(data);
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    fs.writeFile(
      tasksFilePath,
      JSON.stringify(updatedTasks, null, 2),
      (err) => {
        if (err) return res.status(500).json({ error: err });
        res.status(204).send();
      }
    );
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
