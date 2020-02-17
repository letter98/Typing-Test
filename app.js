const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const textInputElement = document.getElementById("textInput");

textInputElement.addEventListener("input", () => {
    arrChar = textInputElement.value.split("");
    arrSpan = document.getElementsByTagName("span");
    let allRight = true;
    for (let i = 0; i < arrSpan.length; i++) {
        if (arrChar[i] == null) { // undefined == null
            arrSpan[i].classList.remove("correct");
            arrSpan[i].classList.remove("incorrect");
            allRight = false;
        }
        else if (arrChar[i] === arrSpan[i].innerText) {
            arrSpan[i].classList.add("correct");
            arrSpan[i].classList.remove("incorrect");
        } else {
            arrSpan[i].classList.remove("correct");
            arrSpan[i].classList.add("incorrect");
            allRight = false;
        }
    }

    if(allRight === true) getRandomQuote();
});

let getRandomQuote = async () => {
    try {
        let res = await fetch(RANDOM_QUOTE_API_URL);
        let randomQuote = await res.json();
        let quoteContent = randomQuote.content;
        quoteDisplayElement.innerHTML = "";
        textInputElement.value = "";
        quoteContent.split('').forEach(character => {
            let characterSpan = document.createElement('span');
            characterSpan.innerText = character;
            quoteDisplayElement.appendChild(characterSpan);
        });
    } catch (err) {
        console.log(err);
    }
}

getRandomQuote();