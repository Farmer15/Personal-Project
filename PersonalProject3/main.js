console.log('hello Vanilla')

const manualbtn = document.querySelector('#manualBtn');
const hiddenmanual = document.querySelector('#hiddenManual');
const cancelbtn = document.querySelector('#cancelBtn');
const startbtn = document.querySelector('#startBtn');

function showManual(){
  hiddenmanual.classList.remove('hidden');
}

function removeManual(){
  hiddenmanual.classList.add('hidden');
}

function newPage()  {
  window.location.href = 'game/index.html';
}

manualbtn.addEventListener('click', showManual);
cancelbtn.addEventListener('click', removeManual);
startbtn.addEventListener('click', newPage);