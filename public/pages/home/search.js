const palavras = [];
const word = document.getElementById("header-search-bar");

function insertWord() {
    palavras.push(word.value);
    console.log(palavras);
    // let wordsAdded = document.getElementById("allWords");

    wordsAdded.innerHTML = "";
    for (let i = 0; i < palavras.length; i++) {
        wordsAdded.innerHTML += `<p>${palavras[i]}</p>`;
    }
    return;
}

function exhibit() {
    let result = document.getElementById("result");
    result.innerHTML = "";
    for (let i = 0; i < palavras.length; i++) {
        if (word.value === palavras[i]) {
            result.innerHTML += `<p>${palavras[i]}</p>`;
        }
    }
}
