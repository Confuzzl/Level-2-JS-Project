cards = [];
for (let i = 0; i < 8; i++) {
    for (let j = 1; j <= 2; j++) {
        let cardWrapper = document.createElement("div");
        cardWrapper.classList = "card_item_wrapper";
        cardWrapper.id = `${String.fromCharCode(65 + i)}${j}`;
        cardWrapper.setAttribute("down", "");
        cardWrapper.onclick = () => {
            flipCard(cardWrapper);
        };
        let card = document.createElement("div");
        card.classList = "card_item";

        let face = document.createElement("div");
        face.classList = "card_face";
        let back = document.createElement("div");
        back.classList = "card_back";
        card.appendChild(face);
        card.appendChild(back);
        cardWrapper.appendChild(card);
        cards.push(cardWrapper);
    }
}

function shuffle() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}
shuffle();

cardDisplay = document.getElementById("card_display");

function flipCard(cardWrapper) {
    let current, toggled;
    if (cardWrapper.getAttribute("down") != null)
        (current = "down"), (toggled = "up");
    else if (cardWrapper.getAttribute("up") != null)
        (current = "up"), (toggled = "down");

    cardWrapper.removeAttribute(current);
    cardWrapper.setAttribute("animated", "");
    setCardClick(cardWrapper, false);
    setTimeout(() => {
        setCardClick(cardWrapper, true);
        cardWrapper.removeAttribute("animated");
        cardWrapper.setAttribute(toggled, "");
    }, 1000);
}

function setCardClick(cardWrapper, bool) {
    if (bool)
        cardWrapper.onclick = () => {
            flipCard(cardWrapper);
        };
    else cardWrapper.onclick = "";
}

function populateDisplay() {
    for (const card of cards) {
        card.getElementsByClassName("card_face")[0].innerHTML = card.id;
        cardDisplay.appendChild(card);
    }
}
populateDisplay();

selected = [null, null];
