
let words;
let quote;
let lettersInQuote = '';
let passedWords;

// Taken from internet. Removes duplicates from string 
function RemoveDuplicates(s, n) {
    var exists = new Map();

    var st = "";
    for (var i = 0; i < n; i++) {
        if (!exists.has(s[i])) {
            st += s[i];
            exists.set(s[i], 1);
        }
    }
    return st;
}

//
const FindWordsInQuote = () => {

    if (words == undefined)
        return;

    let resultsDiv = document.querySelector('#results');

    quote = document.querySelector("#given-quote").value.toUpperCase();
    quote = quote.replace(/\s+/g, '');
    lettersInQuote = RemoveDuplicates(quote, quote.length);

    passedWords = [];

    words.forEach(element => {
        let wordPasses = true;

        for (let i = 0; i < element.length; i++) {
            if (!lettersInQuote.includes(element[i].toUpperCase())) {
                wordPasses = false;
                // console.log("letters does not have " + element[i] + " of " + element);
                break;
            }
        }

        if (wordPasses) {
            console.log(element);
            passedWords.push(element);
        }
    });

    resultsDiv.innerHTML = passedWords.toString() + "\n" + lettersInQuote;

    FindWordsWithAllLetters();
}

//
const FindWordsWithAllLetters = () => {
    let lettersLeft = lettersInQuote.slice().toLowerCase().replace(',', '').replace('.', '');
    let allLettersGroup = [];

    for (let i = 0; i < passedWords.length; i++) {

        for (let j = 0; j < passedWords[i].length; j++) {
            if (lettersLeft.includes(passedWords[i][j])) {
                lettersLeft = lettersLeft.replace(passedWords[i][j], '');
                console.log(passedWords[i][j] + " " + lettersLeft);
            }
        }

        allLettersGroup.push(passedWords[i]);

        if (lettersLeft == '') {
            break;
        }
    }

    if (lettersLeft == '') {
        console.log(allLettersGroup);
    }
    else {
        console.log("All word included. Letters Left is " + lettersLeft);
        console.log(allLettersGroup);
    }

}

window.onload = () => {
    fetch('text/words.txt')
        .then(response => response.text())
        .then(textString => {
            words = textString.split("\r\n");
            console.log(words);
        });

    // 
    document.querySelector("#submitButton").onclick = FindWordsInQuote;

}