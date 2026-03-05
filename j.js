$(document).ready(function(){

let symbols = ["🍎","🍌","🍇","🍓","🍍","🥝","🍒","🥑"];

let cards = symbols.concat(symbols);

cards.sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let matchedPairs = 0;

let timer = 0;
let timerInterval;
let gameStarted = false;

for(let i=0;i<cards.length;i++){

let card = $("<div>❓</div>");
card.addClass("card");
card.attr("data-symbol",cards[i]);

$("#gameBoard").append(card);

}

$(".card").click(function(){

if(lockBoard) return;

if($(this).hasClass("flipped")) return;

if(!gameStarted){

timerInterval = setInterval(function(){

timer++;

$("#timer").text(timer);

},1000);

gameStarted = true;

}

$(this).addClass("flipped");

$(this).text($(this).attr("data-symbol"));

if(firstCard == null){

firstCard = $(this);

return;

}

secondCard = $(this);

moves++;

$("#moves").text(moves);

checkMatch();

});

function checkMatch(){

let symbol1 = firstCard.attr("data-symbol");
let symbol2 = secondCard.attr("data-symbol");

if(symbol1 === symbol2){

$("#matchSound")[0].play();

matchedPairs++;

firstCard = null;
secondCard = null;

if(matchedPairs === symbols.length){

clearInterval(timerInterval);

$("#winMessage").fadeIn();

}

}else{

lockBoard = true;

$("#wrongSound")[0].play();

setTimeout(function(){

firstCard.removeClass("flipped").text("❓");
secondCard.removeClass("flipped").text("❓");

firstCard = null;
secondCard = null;

lockBoard = false;

},1000);

}

}

});