const field = {
  start: true,
  move: 'X',
  bot: false,
  localMove: '',
  players: {
    score1: 0,
    score2: 0,
  },
};

function allField(number) {
  const $field = document.querySelector('.field-zone-' + number);
  return $field;
}

function playMove() {
  if (field.move == 'X') {
    field.move = 'O';
  } else if (field.move == 'O') {
    field.move = 'X';
  }
}

function checkMove(fisrtField, secondField, thirdField) {
  const $allField = document.querySelectorAll('.field-zone-big');
  const field =
    $allField[fisrtField].textContent !== '' &&
    $allField[fisrtField].textContent === $allField[secondField].textContent &&
    $allField[secondField].textContent === $allField[thirdField].textContent;
  return field;
}

function getWinner() {
  if (
    checkMove(0, 1, 2) ||
    checkMove(3, 4, 5) ||
    checkMove(6, 7, 8) ||
    checkMove(0, 3, 6) ||
    checkMove(1, 4, 7) ||
    checkMove(2, 5, 8) ||
    checkMove(0, 4, 8) ||
    checkMove(2, 4, 6)
  ) {
    return field.move;
  }
  return '';
}

function setWinner(winner) {
  if (field.move === 'X') {
    return field.players.score1++;
  } else if (field.move === 'O') {
    return field.players.score2++;
  }
}

function printWinner(winner) {
  const [score1, score2] = document.querySelectorAll('.score');
  score1.textContent = field.players.score1;
  score2.textContent = field.players.score2;
}

function resetFieldZone() {
  const $fieldList = document.querySelectorAll('.field-zone-big');

  for (const $field of $fieldList) {
    $field.textContent = '';
  }
}

function getPlayerMove(move) {
  if (move === 'X') {
    const player1 = document.querySelector('.player1');
    return player1.value;
  } else if (move === 'O') {
    const player2 = document.querySelector('.player2');
    return player2.value;
  }
}

function printWinnerName(winnerName) {
  const winnerPlayer = document.querySelector('.versus');
  winnerPlayer.textContent = winnerName;
}

function movePlayer(name) {
  const moveList = document.querySelector('.play-history-list');
  const move = localMove()
  moveList.innerHTML =
    moveList.innerHTML +
    `<li class="play-history-wrapper">
  <h2 class="play">${field.move}</h2>
  <div class="play-movement-wrapper">
    <p class="player-movement">${name}</p>
    <p class="movement">${field.localMove}</p>
  </div>
</li>`;
}

function checkMode(className, callback) {
  const $checkball = document.querySelector(className)

  $checkball.addEventListener('click', () => {
    $checkball.classList.toggle('check-active')
    callback()
  })
}

function botMove() {
  const move = randomNumber(8)
  const $field = allField(move)
  const cantPLay = draw()
  const winner = getWinner()
  if (cantPLay || winner) return
  if ($field.textContent !== '') {
    return botMove()
  }
  play($field)
}

function randomNumber(max) {
  const number = Math.floor(Math.random() * max + 1)
  return number
}

function draw() {
  const $fieldList = document.querySelectorAll('.field-zone-big')
  let filldFields = 0
  for (const $field of $fieldList) {
    if ($field.textContent) filldFields++
  }
  const winner = getWinner()

  if (filldFields === 9 && !winner) {
    return true
  }

  return false
}

function localMove(move) {
  const $fieldList = document.querySelectorAll('.field-zone-big')
  $fieldList.forEach((item, index) => {
    item.addEventListener('click', () => {
     if(index === 0){field.localMove = 'Primeiro Quadrado'}
     if(index === 1){field.localMove = 'Segundo Quadrado'}
     if(index === 2){field.localMove = 'Terceiro Quadrado'}
     if(index === 3){field.localMove = 'Quarto Quadrado'}
     if(index === 4){field.localMove = 'Quinto Quadrado'}
     if(index === 5){field.localMove = 'Sexto Quadrado'}
     if(index === 6){field.localMove = 'Setimo Quadrado'}
     if(index === 7){field.localMove = 'Oitavo Quadrado'}
     if(index === 8){field.localMove = 'Nono Quadrado'}
    })
  })
}

localMove()

function play($field) {
  if ($field.textContent !== '' || field.start === false) return;
  $field.textContent = field.move;
  const winner = getWinner();
  const playerMove = getPlayerMove(field.move);
  movePlayer(playerMove);
  if (winner !== '') {
    setWinner(winner);
    printWinner(winner);
    const winnerName = getPlayerMove(winner);
    printWinnerName(winnerName);
    setTimeout(resetFieldZone, 1000);
    field.start = false;
    setTimeout(() => {
      field.start = true;
      field.move = 'X';
    }, 1000);
  }
  const hasDraw = draw()
  if (hasDraw) {
    setTimeout(resetFieldZone, 1000);
  }
  playMove();
}

for (let i = 0; i < 9; i++) {
  const $field = allField(i);

  $field.addEventListener('click', () => {
    play($field)
    if (field.bot) botMove()
  });
}

checkMode('.check-mode', () => {
  field.bot = !field.bot
})

