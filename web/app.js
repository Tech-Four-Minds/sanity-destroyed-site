const express = require('express');
const path = require('path');
const app = express();

app.use('/dist', express.static(path.join(__dirname, '/public/dist/')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/')));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/agenda", async (req, res) => {
    res.sendFile(path.join(__dirname, "/public/pages/agenda.html"));
});

app.get("/novidades", async (req, res) => {
    res.sendFile(path.join(__dirname, "/public/pages/news.html"));
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
