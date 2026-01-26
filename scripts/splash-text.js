const splashTextElement = document.getElementById('splash-text');

const splashTexts = [
    "Hold the line",
    "Wplacey's full legal name is TODOEWTSV🅱️SSTTROTRE",
    "Tell Lightbulb to pirate Java Edition",
    "PLEASE tell Cary to make another video about Wplace",
    ":Pin:",
    "screenshot time :onescary:",
    "W sandwich mendingheartemoji",
    "lelellelellee :tismcreature:",
    "hjhjhjhjhj",
    "\"im huge\" — HUGE firey",
    "Check out Canonically Accurate Gijinkas!",
    "I WAS NOT BORN EVIL",
    "better than #gallery",
    "It looks like you're writing a letter! Would you like help?",
    "do yall have a discord server?",
    "\"what do you like most\" — \"FEET\"",
    "This webpage was fact checked by true BFDI patriots",
    "The #1 fandom for trauma-induced therapy, 9/10 doctors recommend!",
    "Meowl is the best",
    "\"man i sure hope i get selected for a splash text!\"",
    "Maybe the true OSC Alliance were the friends we made along the way",
    "In the top 50 of Wplace alliances!",
    "What does he even do?",
    "Sand please come back its been 2763 years",
    "No botting, all manual",
    "Matheus pixel tennis ball matrix man",
    "this message was written by revid",
    "Wplacey will NEVER have a mouth",
    "RELEASE THE :eightball:",
    "dead chat",
    "WPLACE IS LOST MEDIA?",
    "Wplace has fallen, millions of BFDI fans must take over",
    "Hello, Gordon!",
    "\"Yoink! Gotcha!\" — One",
    "Droplet Competition COMING SOON",
    "Don't let the bed bugs bite",
    "The alliance you'll have 16,051 reactions to!",
    "First we W, then we place. Lets Wplace!",
    "I wonder if there is A Person that uses :tismcreature: a lot...",
    "You know, that's huge, Firey!",
    "What is this, some kind of Battle for Dream Island?",
    "TCH is the best user and we're gonna make him an admin (lying)"
];

function setRandomSplash() {
    const randomIndex = Math.floor(Math.random() * splashTexts.length);
    splashTextElement.textContent = splashTexts[randomIndex];
}

setRandomSplash();
