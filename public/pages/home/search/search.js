import { temp } from "../../books";

const searchTerms = [];
const word = document.getElementById("header-search-bar");

function insertWord() {
    const filterWords = word.value
    filterWords.replace(/ /g, ',')
    filterWords.split(' ')
    searchTerms.push();
    // console.log(palavras);
    // let wordsAdded = document.getElementById("allWords");



    wordsAdded.innerHTML = "";
    for (let i = 0; i < searchTerms.length; i++) {
        wordsAdded.innerHTML += `<p>${searchTerms[i]}</p>`;
    }
    return;
}
temp()
function exhibit() {
    let result = document.getElementById("result");
    result.innerHTML = "";
    for (let i = 0; i < searchTerms.length; i++) {
        if (word.value === searchTerms[i]) {
            result.innerHTML += `<p>${searchTerms[i]}</p>`;
        }
    }
}

class adenter {
    /**
        * Gets the list of search engines
        *
        * @returns List of engines
        * @type object
        */

    get engines() {
        var engines = [];
        var tree = this.getElement({ type: "engine_list" }).getNode();
        for (var ii = 0; ii < tree.view.rowCount; ii++) {
            engines.push({
                name: tree.view.getCellText(ii, tree.columns.getColumnAt(0)),
                keyword: tree.view.getCellText(ii, tree.columns.getColumnAt(1))
            });
        }
        return engines;
    },
    /**
 * Gets the name of the selected search engine
 *
 * @returns Name of the selected search engine
 * @type string
 */
    get selectedEngine() {
        var treeNode = this.getElement({ type: "engine_list" }).getNode();
        if (this.selectedIndex != -1) {
            return treeNode.view.getCellText(this.selectedIndex,
                treeNode.columns.getColumnAt(0));
        } else {
            return null;
        }
    }
}