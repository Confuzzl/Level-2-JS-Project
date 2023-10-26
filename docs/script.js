const imageLookup = [
    "cat_0",
    "cat_1",
    "cat_2",
    "cat_3",
    "food_0",
    "food_1",
    "food_2",
    "food_3",
];

class Card {
    constructor(element) {
        this.element = element;
        this.match = undefined;
    }

    static createPair(index) {
        let name = String.fromCharCode(65 + index);
        let pair = [];
        for (let j = 0; j < 2; j++) {
            let card = new Card(document.createElement("div"));
            let cardDiv = card.element;
            cardDiv.classList = "card_item";
            cardDiv.id = `${name}${j}`;
            setCardClick(card, true);
            cardDiv.toggleAttribute("down");
            let cardContent = document.createElement("div");
            cardContent.classList = "card_content";

            let face = document.createElement("div");
            face.classList = "card_face";
            let faceImage = document.createElement("img");
            faceImage.src = "assets/card_face.png";
            faceImage.setAttribute("draggable", "false");
            face.appendChild(faceImage);
            let back = document.createElement("div");
            back.classList = "card_back";
            let backImage = document.createElement("img");
            backImage.src = `assets/${imageLookup[index]}.png`;
            backImage.setAttribute("draggable", "false");
            back.appendChild(backImage);
            cardContent.appendChild(face);
            cardContent.appendChild(back);
            cardDiv.appendChild(cardContent);
            pair.push(card);
        }
        pair[0].match = pair[1];
        pair[1].match = pair[0];
        return pair;
    }
}

function shuffle() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

let cards;
let cardDisplay;
let selected;
let currentIndex;
function init() {
    cards = [];
    for (let i = 0; i < 8; i++) {
        for (const card of Card.createPair(i)) {
            cards.push(card);
        }
    }
    shuffle();

    cardDisplay = document.getElementById("card_display");
    populateDisplay();

    selected = [null, null];
    currentIndex = 0;
}

function flipCard(card) {
    let cardDiv = card.element;
    let current, toggled;
    if (cardDiv.getAttribute("down") != null)
        (current = "down"), (toggled = "up");
    else if (cardDiv.getAttribute("up") != null)
        (current = "up"), (toggled = "down");

    cardDiv.removeAttribute(current);
    cardDiv.toggleAttribute("animated");
    setCardClick(card, false);
    setTimeout(() => {
        cardDiv.toggleAttribute("animated");
    }, 1000);
    cardDiv.setAttribute(toggled, "");
}

function setCardClick(card, bool) {
    let cardDiv = card.element;
    if (bool) {
        cardDiv.onclick = () => {
            selectCard(card);
        };
        cardDiv.toggleAttribute("clickable", true);
    } else {
        cardDiv.onclick = "";
        cardDiv.toggleAttribute("clickable", false);
    }
}

function disableCard(card) {
    let cardDiv = card.element;
}

function populateDisplay() {
    for (const card of cards) {
        const cardDiv = card.element;
        cardDiv.getElementsByClassName(
            "card_face"
        )[0].id = `${cardDiv.id} FACE`;
        cardDiv.getElementsByClassName(
            "card_back"
        )[0].id = `${cardDiv.id} BACK`;
        cardDisplay.appendChild(cardDiv);
    }
}

function selectCard(card) {
    if (selected[currentIndex] === null) selected[currentIndex] = card;

    flipCard(card);

    if (++currentIndex < 2) return;

    cards.forEach((card) => {
        setCardClick(card, false);
    });

    if (selected[1].match === selected[0]) {
        console.log("MATCH");
        cards = cards.filter((item) => {
            return !selected.includes(item);
        });
        console.log(cards.length);
        cards.forEach((card) => {
            setCardClick(card, true);
        });
        selected = [null, null];
        currentIndex = 0;
    } else {
        setTimeout(() => {
            flipCard(selected[0]);
            flipCard(selected[1]);
            selected = [null, null];
            currentIndex = 0;
            cards.forEach((card) => {
                setCardClick(card, true);
            });
        }, 1250);
    }
}
