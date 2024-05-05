console.log("hello, vanilla.");

const startbtn = document.querySelector('#startBtn');
const manualbtn = document.querySelector('#manualBtn')
const myanswerbox = document.querySelector('#myAnswerBox');
const myanswer = document.querySelector('#myAnswer');
const cancelbtn = document.querySelector('#cancelBtn')
const hiddenmanual = document.querySelector('#hiddenManual');
const lights = document.getElementsByClassName('light');
const displayhiddenbox = document.querySelector('#displayHiddenBox');
const soundbtn = document.querySelector('#soundBtn');
const soundon = document.querySelector('#soundOn');
const soundoff = document.querySelector('#soundOff');
const audio = document.querySelector('#audio');
const backspacebtn = document.querySelector('#backspaceBtn');
const displayboard = document.querySelector('#displayBoard');

function makeRandomNumberBox(){
  let numberBox = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let answerArray = [];
  answerArray.push(numberBox.splice(Math.floor(Math.random() * 10), 1)[0]);
  answerArray.push(numberBox.splice(Math.floor(Math.random() * 9), 1)[0]);
  answerArray.push(numberBox.splice(Math.floor(Math.random() * 8), 1)[0]);
  const answerbox = document.createElement('input');
  answerbox.textContent = answerArray;
  answerbox.setAttribute('type', 'hidden');
  answerbox.className = 'hiddenBox';
  document.querySelector("#myAnswerBox").after(answerbox);
  return answerArray;
  
}

function showAnswerBox(){
  document.querySelector('body').removeAttribute('id');  // <body> 속성 두개를 곂쳐놓았다가 앞쪽 삭제
  document.querySelector('#titleBox').remove();
  startbtn.remove();
  manualbtn.remove();
  myanswer.removeAttribute('type');
 }

function showImg(){
  const batimg = document.createElement('img');
  batimg.setAttribute('id', 'batImg');
  batimg.setAttribute('src','images/bat.png')
  document.querySelector('#buttonBox').after(batimg);
}

function showDisplayBoard(){
  displayhiddenbox.removeAttribute('class');
}

startbtn.addEventListener('click', makeRandomNumberBox);   // 게임 시작 버튼 눌렀을 때 난수 만들어서 저장
startbtn.addEventListener('click', showAnswerBox);         // 게임 시작 버튼 눌렀을 때 버튼 없애고 새로운 화면, 입력 칸 보이게하기
startbtn.addEventListener('click', showImg);               // 게임 시작 버튼 눌렀을 때 배트 이미지 나오게하기
startbtn.addEventListener('click', showDisplayBoard);      // 게임 시작 버튼 눌렀을 때 전광판 나오게하기

let ballCount = 0;
let strikeCount = 0;
let myLog = [];
function checkAnswer(event){
  const answerarray = document.querySelector('.hiddenBox').textContent;
  let answerArray = answerarray.split(',');
  if(event.key === 'Enter'){
    let myAnswerArray = String(myanswer.value).split('')
    console.log(answerArray); // 정답 보고 싶을때
    ballCount = 0;
    strikeCount = 0;
    for (i = 0; i <= 2; i++) {
      for (j = 0; j <= 2; j++){
        if(i === j && myAnswerArray[i] === answerArray[j]){
          strikeCount++;
        } else if (i !== j && myAnswerArray[i] === answerArray[j]){
          ballCount++;
          }
      };
    };
    myLog.push(myanswer.value);   // 로그 기록
    console.log(myLog); // 나중에 지워주기
    myanswer.value = '';
    if(strikeCount === 0 && ballCount === 0){
      return alert('아웃!!!( 0 스트라이크 0 볼 )')
    } else if(strikeCount === 3){
      alert('홈런~~!!!');
      alert(`게임 승리(${enterCount + 1}턴)`);
      if(confirm('다시하겠습니까??')) {
        window.location.reload();
      } else {
        window.close();
       };
      } else {
      return alert(`${strikeCount}스트라이크 ${ballCount}볼!!!`)
    }
   }
}

let enterCount = 0;
function enterConter(event){
  if(event.key === 'Enter'){
    enterCount += 1;
  }
  if( enterCount >= 10){
    alert('게임 실패...');
    if(confirm('다시하시겠습니까???')) {
      window.location.reload();
    } else{
      window.close();
    }
  }
}

function keyLimit(event){   
  if( event.keyCode < 48 && event.keyCode !== 13 && event.keyCode !== 8 || event.keyCode > 57 ){ 
    alert('숫자만 입력해주세요');
    event.preventDefault();
    myanswer.value = null; // 한글은 눌러도 경고창은 뜨는데 입력이 들어감;;
  } 
}

myanswerbox.addEventListener('keypress', checkAnswer)       // 엔터 눌렀을때 내 답과 정답을 비교해서 알려주기
myanswerbox.addEventListener('keypress', enterConter)       // 엔터 누르는 횟수 제한 걸어주기
myanswerbox.addEventListener('keydown', keyLimit)           // 숫자 말고 제한 걸어주기

function showHiddenManual(){
  hiddenmanual.removeAttribute('class');
}

function removeManual(){
  hiddenmanual.setAttribute('class','hidden');
}

manualbtn.addEventListener('click',showHiddenManual);        // 게임 설명 버튼 눌렀을 때 설명서 보여주기
cancelbtn.addEventListener('click',removeManual);            // 설명서안 x 버튼 누르면 설명서 창 없애기

function markDispayBoard(event){
  if(event.key === "Enter"){
    if(strikeCount >= 1){
      lights[enterCount - 1].setAttribute('id', 'green');
    } else if(ballCount >= 1){
      lights[enterCount - 1].setAttribute('id', 'orange');
    } else {
      lights[enterCount - 1].setAttribute('id', 'red');
    }
  }
}

myanswerbox.addEventListener('keypress', markDispayBoard);     // 결과에 따라 전광판 불 들어오게 하기

function soundOn(){
  soundbtn.querySelectorAll('img')[0].classList.toggle('hidden');
  soundbtn.querySelectorAll('img')[1].classList.toggle('hidden');
}

soundBtn.addEventListener('click', soundOn);   // 소리 버튼을 누르면 버튼이미지가 바뀜

function playAudio() {
  audio.volume = 0.2;
  audio.loop = true;
  audio.play();  
}

function stopAudio() {
  audio.pause();  
}

function nextMusic(){
  const source = document.querySelector('#audioSrc')
  source.src =`sounds/2.mp4`;
  audio.load();
  soundon.classList.remove('hidden');
  soundoff.classList.add('hidden');
}

soundon.addEventListener('click', playAudio);              // 소리 버튼을 클릭하면 음악 나옴
soundoff.addEventListener('click', stopAudio);             // 소리 버튼을 누르면 음악 꺼짐
startbtn.addEventListener('click', nextMusic);             // 다음 버튼 누르면 노래바뀌고 노래켜져있으면 꺼지고 모양도 그에 따라 바뀜

function showBackspaceBtn(){
  backspacebtn.removeAttribute('class');
}

function backPage(){
  window.location.reload();  // 원래는 게임 시작 버튼 누르면 새로운 페이지 나오게 엮었어야 했는데 시작할때 바꾸기로 이벤트를 만들어서 이전 페이지가 없다(history.back() 사용x)
}

startbtn.addEventListener('click', showBackspaceBtn);         // 시작 버튼 누르면 뒤로가기 버튼 보임      
backspacebtn.addEventListener('click', backPage);             // 뒤로 가기 버튼을 누르면 페이지 새로고침

function showAnswerLog(event){
  if(event.target.className === 'light'){
    const span = document.createElement('span');
    span.classList.add('myAnswerLog');
    span.textContent = myLog[event.target.dataset.title];
    event.target.append(span);
  }
}

function removeAnswerLog(event){
  if(event.target.className === "light")
  event.target.lastElementChild.remove();
}

displayboard.addEventListener('mouseover', showAnswerLog);        // 마우스 위치가 전광판 전등 위로 올라갔을 때 그 때 썻던 내 답 보여주기
displayboard.addEventListener('mouseout', removeAnswerLog);       // 마우스 위치가 전광판 전등 밖으로 나왔을 때 내 답 지우기
