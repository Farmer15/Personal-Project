console.log("hello, vanilla.");

const timerbox = document.querySelector('#timer');
const cards = document.querySelectorAll('.cardBack');
const cardsImgs = document.querySelectorAll('.cardBack img');
const cardsbox = document.querySelector('#cardsBox');
const remaincards = document.querySelector('#remainCards');
const startbtn = document.querySelector('#startBtn');
const background = document.querySelector('#background');
const soundbtn = document.querySelector('#soundBtn');
const soundon = document.querySelector('#soundOn');
const soundoff = document.querySelector('#soundOff');
const audio = document.querySelector('#audio');
const retryBox = document.querySelector('#lose');
const retrybtn = document.querySelector('#retryBtn');

var correct = new Audio('sound/correct.mp3');
var notcorrect = new Audio('sound/notcorrect.mp3');
var fail = new Audio('sound/Fail.mp3');
var flipcard = new Audio('sound/flipcard.mp3');
var gamelose = new Audio('sound/gamelose.mp3');
var gamewin = new Audio('sound/gamewin.mp3');

let seconds = 30;                                             // 타이머
let timer;
 timer = setInterval(() => {
  timerbox.textContent = `남은 시간: ${seconds--}`;
    if(seconds < 0){
      clearInterval(timer);
      gamelose.play();
      document.querySelector('main').classList.add('hidden3');
      retryBox.classList.remove('hidden3');
    }
  }, 1000); 

function cardShuffle(){                                     //카드 섞어주는 함수
  let orderArray = [];
  while(orderArray.length <= 15){
    let randomNum = Math.floor(Math.random() * 17);
    if(!orderArray.includes(randomNum)){
      orderArray.push(randomNum);
    }
  }
  for(i = 0; i <= 15; i++){
    cards[i].setAttribute('data-title',orderArray[i]);
  }
} 

cardShuffle();

function cardsFlip(){
  for(i = 0; i <= 15; i++){
    cardsImgs[i].classList.add('hidden');
  }
}

setTimeout(cardsFlip,1500);                                  // 처음 2초 전부 보여주기

let flipCardLog = [];
let remainCards = 8;

function confirmCards(){                                        //카드 비교 함수
  if(flipCardLog[0] === flipCardLog[1]){
    flipCardLog[0].classList.add('hidden');
    notcorrect.play();
    flipCardLog = [];
  } else if (flipCardLog.length >= 2){
    if(flipCardLog[0].dataset.title === flipCardLog[1].dataset.title) {
      flipCardLog[0].parentElement.classList.add('hidden2');
      flipCardLog[1].parentElement.classList.add('hidden2');
      correct.play();
      flipCardLog = [];
      remainCards = remainCards - 1;
      remaincards.textContent = `남은 카드 수: ${remainCards}`;
    } else {
      flipCardLog[0].classList.add('hidden');
      flipCardLog[1].classList.add('hidden');
      notcorrect.play();
      flipCardLog = [];
    }
  }
  if(remainCards === 0){
    clearInterval(timer);
    gamewin.play();
    document.querySelector('main').classList.add('hidden3');
    retryBox.classList.remove('hidden3');
    retryBox.removeAttribute('id');
    document.querySelector('.win h1').textContent = '당신은 손목을 지켰습니다.게임 승리!';
  }
}

function cardFlip(event){
  if(event.target.getAttribute('src')){
    event.target.classList.remove('hidden');
    flipcard.play();
    flipCardLog.push(event.target);
    setTimeout(confirmCards,200); // 딜레이 안주면 2번쨰 카드 안보임;;
  }
}

console.log(remainCards)

function showRemainCard(){
  remaincards.textContent = `남은 카드 수: ${remainCards}`;
}

cardsbox.addEventListener('click', cardFlip);       // 누르면 카드 뒤집기

function soundOn(){ 
  soundbtn.querySelectorAll('#soundBtn img')[0].classList.toggle('hidden3');
  soundbtn.querySelectorAll('#soundBtn img')[1].classList.toggle('hidden3');
}

soundBtn.addEventListener('click', soundOn); 

function playAudio() {
  audio.volume = 0.2;
  audio.loop = true;
  audio.play();  
}

function stopAudio() {
  audio.pause();  
}


soundon.addEventListener('click', playAudio);       
soundoff.addEventListener('click', stopAudio);         // 야구게임에서 가져옴

function pageReload(){
  location.reload(true);
}

retrybtn.addEventListener('click', pageReload);

