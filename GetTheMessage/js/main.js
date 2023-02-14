
let words;
let descriptions;
let inputNodesMap = new Map();

// Turns key inputs to Uppercase Letter
// for use when validating input onkeyup
const Validate = (e) => {
    e.target.value = e.target.value.replace(/\W|\d/g, '').toUpperCase();
    let inputNodeArray = inputNodesMap.get(e.target.className);
    console.log(e.target.value);
    inputNodeArray.forEach(element => {
        element.value = e.target.value;
    });
}

// Replace specific input value to default 
// for use when clearing input onkeydown
const ReplaceLetter = (e) => {
    e.target.value = "";
}

// Creates a single input for a given letter
// Adds it to nodeMap and gives it traits and behavior
const CreateInputForLetter = (letter) => {
    // Create new input for this letter
    let currentInputToAdd = document.createElement('input');

    // Specifies input characteristics
    currentInputToAdd.type = 'text';
    currentInputToAdd.className = letter;
    currentInputToAdd.value = `${letter}`;
    currentInputToAdd.maxLength = 1;
    currentInputToAdd.placeholder = '?';

    // adds validation and letter replacement functions
    currentInputToAdd.addEventListener('keyup', Validate);
    currentInputToAdd.addEventListener('keydown', ReplaceLetter);

    // If letter key exists, add new input into array
    if (inputNodesMap.has(letter)) {
        inputNodesMap.get(letter).push(currentInputToAdd);
    }
    // If not, create letter key and add new input into array
    else{
        inputNodesMap.set(letter, []);
        inputNodesMap.get(letter).push(currentInputToAdd);
    }

    return currentInputToAdd;
}

// Creates the specific inputs for the given quote, letter by letter
const CreateInputsForQuote = (quote) => {

    // Holds the results div and the inner div being filled
    let resultsDiv = document.querySelector('#quote-inputs');
    let currentDiv = document.createElement('div');

    // clear results
    resultsDiv.innerHTML = "";

    // Creates inputs for every letter in quote,
    // with spaces separating divs
    for (let i = 0; i < quote.length; i++) {
        // if char is a letter, create input
        if (quote[i] != ' ') {
            // Create new input for this letter
            let currentInputToAdd = CreateInputForLetter(quote[i]);

            // adds new input into current div
            currentDiv.appendChild(currentInputToAdd);
        }
        // if char is a space, create new div
        else {
            resultsDiv.appendChild(currentDiv);

            currentDiv = document.createElement('div');
        }
    }

    console.log(inputNodesMap);

    // Adds final div
    resultsDiv.appendChild(currentDiv);
};

// Creates the specific inputs for the clue words, letter by letter
const CreateInputsForClues = () => {

    // Holds the results div and the inner div being filled
    let cluesDiv = document.querySelector('#clue-inputs');
    let currentDiv = document.createElement('div');

    // clear clues
    cluesDiv.innerHTML = "";

    for (let word = 0; word < words.length; word++) {
        for (let letter = 0; letter < words[word].length; letter++) {
            let currentInputToAdd = CreateInputForLetter(words[word][letter]);

            currentDiv.appendChild(currentInputToAdd);
        }
        // 
        let clueDesc = document.createElement('div');
        clueDesc.innerHTML = descriptions[word];
        currentDiv.appendChild(clueDesc);

        cluesDiv.appendChild(currentDiv);

        currentDiv = document.createElement('div');
    }

}

// Function to load a given level from a text file. 
function LoadLevel(levelNum = 1) {
    let quote = "";
    
    fetch(`text/level${levelNum}.txt`)
        .then(response => response.text())
        .then(textString => {
            let levelInfo = textString.split("|");
            quote = levelInfo[0];
            words = levelInfo[1].split(",");
            descriptions = levelInfo[2].split(".");


            CreateInputsForQuote(quote)
            CreateInputsForClues();


            console.log(words);
        });
}

window.onload = () => {

    // 
    document.querySelector("#submitButton").onclick = () => {
        // let quote = document.querySelector("#given-quote").value.toUpperCase();

        // CreateInputsForQuote(quote);

            LoadLevel();
    };

}