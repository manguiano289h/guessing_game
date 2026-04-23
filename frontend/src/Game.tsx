import { useState } from "react";
import "./Game.css"

function Game() {
    const [prevIndex, setPrevIndex] = useState(-1);
    const [index, setIndex] = useState(-1);
    const [lastGuess, setLastGuess] = useState(-1);
    const [guess, setGuess] = useState(1);
    const [comparison, setComparison] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [prevGlobal, setPrevGlobal] = useState(0);
    const [globalGuesses, setGlobalGuesses] = useState(0);

    return <div id="game">
        <div id="status">
            <div id="global">
                {index !== prevIndex && prevIndex !== -1
                    ? (comparison === 0)
                        ? `You have guessed the number after ${globalGuesses} global guesses!`
                        : `Someone guessed the number after over ${prevGlobal} global guesses!`
                    : (index !== -1)
                        ? `Nobody has guessed the number after ${globalGuesses} global guesses...`
                        : "Start by guessing a number between 1 and 1000"}
            </div>
            <div id="comparison">
                {lastGuess === -1
                    ? "It's free!"
                    : comparison === 0
                        ? "Well done!"
                        : "The number is " + (comparison === -1 ? "higher" : "lower") + " than " + lastGuess}
            </div>
        </div>
        <div id="guessblock">
            <input id="guess" type="number" defaultValue={1} min={1} max={1000} onChange={(event) => {
                if (!isNaN(event.currentTarget.valueAsNumber)) {
                    setGuess(event.currentTarget.valueAsNumber);
            }}}/>
            <button id="guessbtn" onClick={() => {
                if (!loading) {
                    setLoading(true);
                    fetch("https://exampleapi.dnsmanager.tech/guess", {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        method: "POST",
                        body: JSON.stringify({
                            index: index,
                            guess: guess,
                        })
                    }).then((res) =>
                        res.json()
                    ).then((res) => {
                        setPrevIndex(index);
                        setLastGuess(guess);
                        setPrevGlobal(globalGuesses);
                        setComparison(res.comparison);
                        setGlobalGuesses(res.guesses);
                        setIndex(res.index);
                    }).finally(() => {
                        setLoading(false);
                    });
                }
            }}>Guess</button>
        </div>
    </div>
}

export default Game;