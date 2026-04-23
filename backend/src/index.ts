import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
    origin: "https://example.dnsmanager.tech"
};

app.use(cors(corsOptions));
app.use(express.json());

let gameIndex = 0;
let currentNumber = Math.floor(Math.random() * 1000 + 1);
let currentGuesses = 0;

app.get("/", (_req, res) => {
    res.sendStatus(418);
});

app.post("/guess", (req, res) => {
    const body = req.body;
    const index = body.index;
    const guess = body.guess;
    if (typeof index !== "number" || typeof guess !== "number") {
        res.sendStatus(400);
        return;
    }

    let guesses = ++currentGuesses;

    let comparison = 0;
    if (guess < currentNumber) {
        comparison = -1;
    } else if (guess > currentNumber) {
        comparison = 1;
    } else {
        comparison = 0;
        currentNumber = Math.floor(Math.random() * 1000 + 1);
        currentGuesses = 0;
        gameIndex++;

        console.log(`The number has been guessed after ${guesses} attempt(s).`);
        console.log(`The next number is ${currentNumber}.`);
    }

    res.json({
        index: gameIndex,
        comparison: comparison,
        guesses: guesses,
    });
});

app.listen(7133, (err) => {
    if (err) {
        console.log("An error has occurred when trying to start the server.");
        console.error(err);
        return;
    }

    console.log("Now listening on port 7133");
    console.log(`The first number is ${currentNumber}`);
});