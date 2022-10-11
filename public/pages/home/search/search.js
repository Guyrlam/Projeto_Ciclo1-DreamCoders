import { temp } from "../../books";

const searchTerms = [];
const word = document.getElementById("header-search-bar");

function insertWord() {
    searchTerms.push(word.value);
    // console.log(palavras);
    // let wordsAdded = document.getElementById("allWords");

    wordsAdded.innerHTML = "";
    for (let i = 0; i < searchTerms.length; i++) {
        wordsAdded.innerHTML += `<p>${searchTerms[i]}</p>`;
    }
    return;
}
temp
function exhibit() {
    let result = document.getElementById("result");
    result.innerHTML = "";
    for (let i = 0; i < searchTerms.length; i++) {
        if (word.value === searchTerms[i]) {
            result.innerHTML += `<p>${searchTerms[i]}</p>`;
        }
    }
}
