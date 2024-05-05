console.log("hello, vanilla.");

const year = document.querySelector("#showYear");
const month = document.querySelector('#showMonth');
const today = document.querySelector('#showTodayDate');
const prevbtn = document.querySelector('#prevBtn');
const nextbtn = document.querySelector('#nextBtn');
const datesearch = document.querySelector("#dateSearch");
const searchbtn = document.querySelector('#searchBtn');
const memo = document.querySelector('#memo');
const takememo = document.querySelector('#takeMemo');
const calendarCells = document.querySelectorAll('#calendarBody div');
const calendarbody = document.querySelector("#calendarBody");
const showclickdate = document.querySelector('#showClickDate');

let newDate = new Date();
let todayDate = newDate.getDate();
let todayMonth = newDate.getMonth();
let todayYear = newDate.getFullYear();
let weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Ssp', 'Oct', 'Nov', 'Dec'];

function showTodayMonthYear(){
  year.textContent = newDate.getFullYear();
  month.textContent = newDate.getMonth() + 1;
  today.textContent = `Today: ${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()}/${months[newDate.getMonth()]}/${weeks[newDate.getDay()]} `;
}

window.addEventListener('load', showTodayMonthYear);

function showDays(){
  ;
  if(newDate.getFullYear() === todayYear && newDate.getMonth() === todayMonth){     
    calendarCells[todayDate + 7].classList.add('today');
  } else {
    calendarCells[todayDate + 7].classList.remove('today');
  }
  newDate.setDate(1);
  let firstweek = newDate.getDay()
  const firstdaycell = document.querySelector(`[data-title="${firstweek}"]`)
  firstdaycell.textContent = 1;
  firstdaycell.classList.remove('gray');
  newDate.setMonth(newDate.getMonth() + 1);
  newDate.setDate(0);
  let nextdaycell = firstdaycell.nextElementSibling;
  for (i = 2; i <= newDate.getDate(); i++){
    nextdaycell.textContent = i;
    nextdaycell.classList.remove('gray');
    nextdaycell = nextdaycell.nextElementSibling;
  }
  for (i = 1; i <= 42 - newDate.getDate() - firstweek; i++){
    nextdaycell.textContent = i;
    nextdaycell.classList.add('gray');
    nextdaycell = nextdaycell.nextElementSibling;
  }
  newDate.setDate(0);
  let prevDayCell = firstdaycell.previousElementSibling;
  for(i = newDate.getDate(); i > newDate.getDate() - firstweek ; i--){
    prevDayCell.textContent = i;
    prevDayCell.classList.add('gray');
    prevDayCell = prevDayCell.previousElementSibling;
  }
}

window.addEventListener('load', showDays);

function showPrevDays(){
  year.textContent = newDate.getFullYear();
  month.textContent = newDate.getMonth() + 1;
  showDays();
}

prevbtn.addEventListener('click',showPrevDays);

function showNextDays(){
  newDate.setMonth(newDate.getMonth() + 2);
  year.textContent = newDate.getFullYear();
  month.textContent = newDate.getMonth() + 1; 
  showDays();
}

nextbtn.addEventListener('click', showNextDays);

function searchDate(){
  if(datesearch.value){
    let dateSearchArray = datesearch.value.split('-');
    newDate = new Date(dateSearchArray[0], dateSearchArray[1] - 1, dateSearchArray[2]);
    year.textContent = newDate.getFullYear();
    month.textContent = newDate.getMonth() + 1;
    showDays();
  }
}

searchbtn.addEventListener('click',searchDate);

function takeMemoToday(){
  console.log(memo.value);
  console.log(todayDate);
  console.log(calendarCells[todayDate + 7]);
  let todayMemo = document.createElement('p');
  todayMemo.setAttribute('id','todayMemo');
  todayMemo.textContent = '⦁' +  memo.value;
  calendarCells[todayDate + 7].append(todayMemo);
  memo.value = '';
}

takememo.addEventListener('click', takeMemoToday);

function showClickDate(event){
  console.log(event.target.classList.value);
  if(+event.target.textContent && event.target.classList.value !== "gray" && event.target.classList.value !== "sunday gray"){
    showclickdate.textContent = `${year.textContent}/${month.textContent}/${+event.target.textContent}`;
  }
}

calendarbody.addEventListener('click',showClickDate);
