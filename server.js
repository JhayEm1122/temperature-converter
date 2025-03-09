const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/convert", (req, res) => {
    const { value, unit } = req.body;
    let result;
    if (unit === "C") {
        result = `${value}°C is ${celsiusToFahrenheit(value)}°F`;
    } else {
        result = `${value}°F is ${fahrenheitToCelsius(value)}°C`;
    }
    res.send(`<h1>${result}</h1><a href='/'>Go Back</a>`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
