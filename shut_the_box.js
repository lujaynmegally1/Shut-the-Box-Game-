window.onload = document.getElementById('submit').disabled = true;

let dice_result = 0;
let table_boxes = document.getElementById('boxes');
let boxes = table_boxes.getElementsByTagName('input');
let table_numbers = document.getElementById('numbers');
let numbers = table_numbers.getElementsByTagName('td');
const roll_dice_btn = document.getElementById('roll_dice').addEventListener('click', roll_dice);
const submit_btn = document.getElementById('submit').addEventListener('click', submit);
const finish_btn = document.getElementById('finish').addEventListener('click', finish);
let list_checked = [];
let para = document.getElementsByTagName('span')[0];

for (let j = 0; j < 9; ++j) {
  numbers[j].addEventListener('click', function() {
    if (document.getElementById(j + 1).disabled === false) {
      document.getElementById(j + 1).checked = !document.getElementById(j + 1).checked;
    }
  });
}

function list_checked_boxes() {

  for (i = 1; i < 10; ++i) {
    if (document.getElementById(i).checked === true) {
      if (list_checked.includes(i) === false) {
        list_checked.push(i);
      }
    }
  }

  // gets rid of unchecked boxes in list 
  for (i = 1; i < 10; ++i) {
    if (document.getElementById(i).checked === false) {
      if (list_checked.includes(i) === true) {
        // this line remove i and everything after it... 
        list_checked.splice(list_checked.indexOf(i), 1);
      }
    }
  }
}

function roll_dice() {
  // Roll dice
  let roll1 = Math.floor(1 + 6 * Math.random());
  let roll2 = Math.floor(1 + 6 * Math.random());
  let string = `${roll1} + ${roll2} = ${roll1+roll2}`;


  // inject text 
  para.innerHTML = string;

  dice_result = roll1 + roll2;

  // need roll dice button to be disabled 
  document.getElementById('roll_dice').disabled = true;
  // submit box selection to be enabled 
  document.getElementById('submit').disabled = false;
}

function roll_die() {
  // Roll single die when sum of boxes left are less than or = to 6 
  let roll1 = Math.floor(1 + 6 * Math.random());

  // inject text 
  para.innerHTML = roll1;

  dice_result = roll1;

  // need roll dice button to be disabled 
  document.getElementById('roll_dice').disabled = true;
  // submit box selection to be enabled 
  document.getElementById('submit').disabled = false;
}

let sum_checked = 0;
let sum_unchecked = 0;
// only works for one round... 
function submit() {

  list_checked_boxes();
  sum_checked = 0;
  for (let i of list_checked) {
    sum_checked += i * 1;
  }

  if (sum_checked !== dice_result) {
    alert("Please make another selection and try again.");
    list_checked = [];
    sum_checked = 0;

  } else {
    // umchecks and disables all boxes if submission is valid
    for (let i of list_checked) {
      document.getElementById(i).checked = false;
      document.getElementById(i).disabled = true;
      numbers[i - 1].style.backgroundColor = 'rgb(60, 85, 100)';
    }
    document.getElementById('roll_dice').disabled = false;
    document.getElementById('submit').disabled = true;

    para.innerHTML = '';

    list_checked = [];
    sum_checked = 0;
  }

  // if remaining boxes sum to less or equal 6, use 1 die instead of 2 
  sum_unchecked = 0;
  for (i = 1; i < 10; ++i) {
    if (document.getElementById(i).disabled === false) {
      sum_unchecked += i * 1;
    }
  }


  if (sum_unchecked <= 6) {
    document.getElementById('roll_dice').addEventListener('click', roll_die);
  }

  if (sum_unchecked === 0) {
    alert("you won!");
    para.innerHTML = '';
    document.getElementById('roll_dice').disabled = false;
  }
}

function finish() {

  // all buttons are disabled
  document.getElementById('roll_dice').disabled = true;
  document.getElementById('submit').disabled = true;
  document.getElementById('finish').disabled = true;

  // user receives an alert telling them their score 
  // does not print sum_unchecked 

  alert("your score is: " + sum_unchecked);


}
