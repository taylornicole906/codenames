module.exports = {
    makeId,
    makeFullList,
    makeRedList,
    makeBlueList,
    makeGrayList,
    getDeathWord
}

//create red team's list, blue team's list, neutral list, as well as death word
var redList = [];
var blueList =[];
var grayList = [];
var usedWords = [];

var wordArray = [
  "AFRICA",
  "AGENT",
  "AIR",
  "ALIEN",
  "ALPS",
  "AMAZON",
  "AMBULANCE",
  "AMERICA",
  "ANGEL",
  "ANTARCTICA",
  "APPLE",
  "ARM",
  "ATLANTIS",
  "AUSTRALIA",
  "AZTEC",
  "BACK",
  "BALL",
  "BAND",
  "BANK",
  "BAR",
  "BARK",
  "BAT",
  "BATTERY",
  "BEACH",
  "BEAR",
  "BEAT",
  "BED",
  "BEIJING",
  "BELL",
  "BELT",
  "BERLIN",
  "BERMUDA",
  "BERRY",
  "BILL",
  "BLOCK",
  "BOARD",
  "BOLT",
  "BOMB",
  "BOND",
  "BOOM",
  "BOOT",
  "BOTTLE",
  "BOW",
  "BOX",
  "BRIDGE",
  "BRUSH",
  "BUCK",
  "BUFFALO",
  "BUG",
  "BUGLE",
  "BUTTON",
  "CALF",
  "CANADA",
  "CAP",
  "CAPITAL",
  "CAR",
  "CARD",
  "CARROT",
  "CASINO",
  "CAST",
  "CAT",
  "CELL",
  "CENTAUR",
  "CENTER",
  "CHAIR",
  "CHANGE",
  "CHARGE",
  "CHECK",
  "CHEST",
  "CHICK",
  "CHINA",
  "CHOCOLATE",
  "CHURCH",
  "CIRCLE",
  "CLIFF",
  "CLOAK",
  "CLUB",
  "CODE",
  "COLD",
  "COMIC",
  "COMPOUND",
  "CONCERT",
  "CONDUCTOR",
  "CONTRACT",
  "COOK",
  "COPPER",
  "COTTON",
  "COURT",
  "COVER",
  "CRANE",
  "CRASH",
  "CRICKET",
  "CROSS",
  "CROWN",
  "CYCLE",
  "CZECH",
  "DANCE",
  "DATE",
  "DAY",
  "DEATH",
  "DECK",
  "DEGREE",
  "DIAMOND",
  "DICE",
  "DINOSAUR",
  "DISEASE",
  "DOCTOR",
  "DOG",
  "DRAFT",
  "DRAGON",
  "DRESS",
  "DRILL",
  "DROP",
  "DUCK",
  "DWARF",
  "EAGLE",
  "EGYPT",
  "EMBASSY",
  "ENGINE",
  "ENGLAND",
  "EUROPE",
  "EYE",
  "FACE",
  "FAIR",
  "FALL",
  "FAN",
  "FENCE",
  "FIELD",
  "FIGHTER",
  "FIGURE",
  "FILE",
  "FILM",
  "FIRE",
  "FISH",
  "FLUTE",
  "FLY",
  "FOOT",
  "FORCE",
  "FOREST",
  "FORK",
  "FRANCE",
  "GAME",
  "GAS",
  "GENIUS",
  "GERMANY",
  "GHOST",
  "GIANT",
  "GLASS",
  "GLOVE",
  "GOLD",
  "GRACE",
  "GRASS",
  "GREECE",
  "GREEN",
  "GROUND",
  "HAM",
  "HAND",
  "HAWK",
  "HEAD",
  "HEART",
  "HELICOPTER",
  "HIMALAYAS",
  "HOLE",
  "HOLLYWOOD",
  "HONEY",
  "HOOD",
  "HOOK",
  "HORN",
  "HORSE",
  "HORSESHOE",
  "HOSPITAL",
  "HOTEL",
  "ICE",
  "ICE CREAM",
  "INDIA",
  "IRON",
  "IVORY",
  "JACK",
  "JAM",
  "JET",
  "JUPITER",
  "KANGAROO",
  "KETCHUP",
  "KEY",
  "KID",
  "KING",
  "KIWI",
  "KNIFE",
  "KNIGHT",
  "LAB",
  "LAP",
  "LASER",
  "LAWYER",
  "LEAD",
  "LEMON",
  "LEPRECHAUN",
  "LIFE",
  "LIGHT",
  "LIMOUSINE",
  "LINE",
  "LINK",
  "LION",
  "LITTER",
  "LOCH NESS",
  "LOCK",
  "LOG",
  "LONDON",
  "LUCK",
  "MAIL",
  "MAMMOTH",
  "MAPLE",
  "MARBLE",
  "MARCH",
  "MASS",
  "MATCH",
  "MERCURY",
  "MEXICO",
  "MICROSCOPE",
  "MILLIONAIRE",
  "MINE",
  "MINT",
  "MOBILE",
  "MODEL",
  "MOLE",
  "MOON",
  "MOSCOW",
  "MOUNT",
  "MOUSE",
  "MOUTH",
  "MUG",
  "NAIL",
  "NEEDLE",
  "NET",
  "NEW YORK",
  "NIGHT",
  "NINJA",
  "NOTE",
  "NOVEL",
  "NURSE",
  "NUT",
  "OCTOPUS",
  "OIL",
  "OLIVE",
  "OLYMPUS",
  "OPERA",
  "ORANGE",
  "ORGAN",
  "PALM",
  "PAN",
  "PANTS",
  "PAPER",
  "PARACHUTE",
  "PARK",
  "PART",
  "PASS",
  "PASTE",
  "PENGUIN",
  "PHOENIX",
  "PIANO",
  "PIE",
  "PILOT",
  "PIN",
  "PIPE",
  "PIRATE",
  "PISTOL",
  "PIT",
  "PITCH",
  "PLANE",
  "PLASTIC",
  "PLATE",
  "PLATYPUS",
  "PLAY",
  "PLOT",
  "POINT",
  "POISON",
  "POLE",
  "POLICE",
  "POOL",
  "PORT",
  "POST",
  "POUND",
  "PRESS",
  "PRINCESS",
  "PUMPKIN",
  "PUPIL",
  "PYRAMID",
  "QUEEN",
  "RABBIT",
  "RACKET",
  "RAY",
  "REVOLUTION",
  "RING",
  "ROBIN",
  "ROBOT",
  "ROCK",
  "ROME",
  "ROOT",
  "ROSE",
  "ROULETTE",
  "ROUND",
  "ROW",
  "RULER",
  "SATELLITE",
  "SATURN",
  "SCALE",
  "SCHOOL",
  "SCIENTIST",
  "SCORPION",
  "SCREEN",
  "SCUBA DIVER",
  "SEAL",
  "SERVER",
  "SHADOW",
  "SHAKESPEARE",
  "SHARK",
  "SHIP",
  "SHOE",
  "SHOP",
  "SHOT",
  "SINK",
  "SKYSCRAPER",
  "SLIP",
  "SLUG",
  "SMUGGLER",
  "SNOW",
  "SNOWMAN",
  "SOCK",
  "SOLDIER",
  "SOUL",
  "SOUND",
  "SPACE",
  "SPELL",
  "SPIDER",
  "SPIKE",
  "SPINE",
  "SPOT",
  "SPRING",
  "SPY",
  "SQUARE",
  "STADIUM",
  "STAFF",
  "STAR",
  "STATE",
  "STICK",
  "STOCK",
  "STRAW",
  "STREAM",
  "STRIKE",
  "STRING",
  "SUB",
  "SUIT",
  "SUPERHERO",
  "SWING",
  "SWITCH",
  "TABLE",
  "TABLET",
  "TAG",
  "TAIL",
  "TAP",
  "TEACHER",
  "TELESCOPE",
  "TEMPLE",
  "THEATER",
  "THIEF",
  "THUMB",
  "TICK",
  "TIE",
  "TIME",
  "TOKYO",
  "TOOTH",
  "TORCH",
  "TOWER",
  "TRACK",
  "TRAIN",
  "TRIANGLE",
  "TRIP",
  "TRUNK",
  "TUBE",
  "TURKEY",
  "UNDERTAKER",
  "UNICORN",
  "VACUUM",
  "VAN",
  "VET",
  "WAKE",
  "WALL",
  "WAR",
  "WASHER",
  "WASHINGTON",
  "WATCH",
  "WATER",
  "WAVE",
  "WEB",
  "WELL",
  "WHALE",
  "WIND",
  "WITCH",
  "WORM",
  "YARD"

];

function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function makeFullList(){
    usedWords = [];
    for (let i = 0; i < 25; i++) {
        var word = wordArray[Math.floor(Math.random() * wordArray.length)];
        if (!usedWords.includes(word))
        {
            usedWords.push(word);
        }
        else{
            while (usedWords.includes(word)){
                var word = wordArray[Math.floor(Math.random() * wordArray.length)]; 
            }
            usedWords.push(word);
        }
    }
    return usedWords;
}

function makeRedList(usedWords){
    redList =[];
    for (let i = 0; i < 8; i++){
        var redWord = usedWords[Math.floor(Math.random() * usedWords.length)];
        if (!redList.includes(redWord))
        {
            redList.push(redWord);
        }
        else{
            while (redList.includes(redWord)){
                var redWord = usedWords[Math.floor(Math.random() * usedWords.length)];
            }
            redList.push(redWord);
        }   
    }
    return redList;
}


function makeBlueList(usedWords, redList){
    blueList = [];
    for (let i = 0; i < 9; i++){
        var blueWord = usedWords[Math.floor(Math.random() * usedWords.length)];
        if ((!blueList.includes(blueWord))&& !redList.includes(blueWord))
        {
            blueList.push(blueWord);
        }
        else{
            while (redList.includes(blueWord) || blueList.includes(blueWord) ){
                var blueWord = usedWords[Math.floor(Math.random() * usedWords.length)];
            }
            blueList.push(blueWord);
        }   
    }
    return blueList;
}


function makeGrayList(usedWords,redList,blueList){
    grayList = [];
    for (let i = 0; i < 7; i++){
        var grayWord = usedWords[Math.floor(Math.random() * usedWords.length)];
        if ((!blueList.includes(grayWord))&& !redList.includes(grayWord) && !grayList.includes(grayWord)){
            grayList.push(grayWord);     
        }
        else{
            while ((blueList.includes(grayWord))|| redList.includes(grayWord) || grayList.includes(grayWord)){
                var grayWord = usedWords[Math.floor(Math.random() * usedWords.length)];
            }
            grayList.push(grayWord);
        }
    }
    return grayList;
}

function getDeathWord(usedWords, redList, blueList, grayList) {
    deathWord = '';
    for (let i = 0; i < 25; i++){
        word = usedWords[i];
        if ( (!blueList.includes(word)) && (!redList.includes(word)) && (!grayList.includes(word))) {
            deathWord = word;
        }
    }
    return deathWord;
}
