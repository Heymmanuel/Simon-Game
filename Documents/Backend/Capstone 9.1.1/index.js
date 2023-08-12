import express from "express";

const app = express();
const port = 3000;

const tasks = [];

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    let d = new Date()
    res.render("index.ejs", { 
        day: d,
        tasks 
    });
});

app.post("/", (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push(newTask);
    }
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const taskToDelete = req.body.task;
    const taskIndex = tasks.indexOf(taskToDelete);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.json({ success: true }); // Respond with JSON indicating successful deletion
    } else {
        res.json({ success: false }); // Respond with JSON indicating failure to find task
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
