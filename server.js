const express = require("express");
const logger = require("morgan");
const data = require("./movies.json");

const app = express();
const port = 4000;
app.use(logger("dev"));
app.use(express.json());

app.get("/", (req,res) => {
    console.log(`request from ${req.url}`);
    res.send("Server runnging");
});

app.get("/movies", (req, res) => {
    console.log(`request from ${req.url}`);
    res.status(200).json(data);
});

app.get("/movies/:id", (req, res) => {
    console.log(`request from ${req.url}`);
    const id_movie = parseInt(req.params.id);
    const movie = data.find(m => m.id === id_movie);
    res.status(200).json(data);
});

app.post("/movies", (req, res) => {
    data.push(req.body);
    res.status(200).json(data);
});
app.put("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let movie = data.find(m => m.id === id);
    (movie.title = req.body.title), (movie.release = req.body.release);
    res.status(200).json(movie);
});

app.delete("/movies", (req, res) => {
    const id = parseInt(req.body.id);
    const deletedMovie = data.find(movie => movie.id === id);
        res.status(200).json({"movie deleted": deletedMovie});
}); 


app.listen(port, 
    () => console.log(`Server listening at http://localhost:${port}`)
);