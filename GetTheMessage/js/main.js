
let words;
let descriptions;
let inputNodesMap = new Map();
let allInputs;

// Replace specific input value to default 
// for use when clearing input onkeydown
const ReplaceLetter = (e) => {
    if (e.repeat) return;
    console.log(e);

    e.target.value = e.key;

    e.target.value = e.target.value.replace(/\W|\d/g, '').toUpperCase();
    let inputNodeArray = inputNodesMap.get(e.target.className);
    console.log(e.target.value);
    inputNodeArray.forEach(element => {
        element.value = e.target.value;
    });

    if (e.target.value == e.target.className) {
        inputNodeArray.forEach(element => {
            element.style.backgroundColor = 'greenyellow';
        });
    }

    if (e.target.value.length == 1) {
        let nextInput = e.target;
        nextInput;

        let index;

        for (index = 0; index < allInputs.length; index++) {
            if (allInputs[index] == e.target) {
                nextInput = allInputs[index + 1];

                if (nextInput && (nextInput.value == ',' || nextInput.value == '.')) {
                    nextInput = allInputs[index + 2];
                }

                if (nextInput) 
                    nextInput.focus();

                break;
            }
        }


    }
}

// Creates a single input for a given letter
// Adds it to nodeMap and gives it traits and behavior
const CreateInputForLetter = (letter) => {
    // Create new input for this letter
    let currentInputToAdd = document.createElement('input');

    // Specifies input characteristics
    currentInputToAdd.type = 'text';
    currentInputToAdd.className = letter;
    //currentInputToAdd.value = `${letter}`;
    currentInputToAdd.maxLength = 1;
    currentInputToAdd.placeholder = '?';

    // adds validation and letter replacement functions
    currentInputToAdd.addEventListener('keypress', ReplaceLetter);

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

//
const CreateInputForPunctuation = (letter) => {
    // Create new input for this letter
    let currentInputToAdd = document.createElement('input');

    // Specifies input characteristics
    currentInputToAdd.type = 'text';
    currentInputToAdd.readOnly = true;
    currentInputToAdd.className = 'punctuation';
    currentInputToAdd.value = `${letter}`;
    currentInputToAdd.maxLength = 1;
    currentInputToAdd.placeholder = '?';

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
        // if char is a space, create new div
        if (quote[i] == ' ') {
            resultsDiv.appendChild(currentDiv);

            currentDiv = document.createElement('div');
        }
        // if char is a letter, create input
        else if (quote[i] == ',' || quote[i] == '.') {
            // Create new puncuation for this letter
            let currentPunctuationToAdd = CreateInputForPunctuation(quote[i]);

            // adds new input into current div
            currentDiv.appendChild(currentPunctuationToAdd);
        }
        else {
            // Create new input for this letter
            let currentInputToAdd = CreateInputForLetter(quote[i]);

            // adds new input into current div
            currentDiv.appendChild(currentInputToAdd);
        }
    }

    console.log(inputNodesMap);

    // Adds final div
    resultsDiv.appendChild(currentDiv);
};

// Creates the specific inputs for the clue words, letter by letter
const CreateInputsForClues = () => {

    // Holds the results div and the inner div being filled
    let cluesDiv = document.querySelector('#clues');
    let currentDiv = document.createElement('div');

    // clear clues
    cluesDiv.innerHTML = "";

    for (let word = 0; word < words.length; word++) {

        // Create inputs
        let inputsDiv = document.createElement('div');
        for (let letter = 0; letter < words[word].length; letter++) {
            let currentInputToAdd = CreateInputForLetter(words[word][letter]);

            inputsDiv.appendChild(currentInputToAdd);
        }
        inputsDiv.className = 'clue-inputs';
        currentDiv.appendChild(inputsDiv);

        // add descriptions to currentDiv
        let clueDesc = document.createElement('div');
        clueDesc.innerHTML = descriptions[word];
        clueDesc.className = 'clue-desc';
        currentDiv.appendChild(clueDesc);

        currentDiv.className = 'clue';

        // 
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

            allInputs = document.querySelectorAll('input');

            console.log(words);
        });
}

window.onload = () => {

    // 
    document.querySelector("#submitButton").onclick = () => {
        LoadLevel();
    };

}