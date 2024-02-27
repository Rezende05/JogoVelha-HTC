const field = {
  move: 'X',
};

function allField(name) {
  const $field = document.querySelector('.field-zone-' + name);
  return $field;
}

function playMove() {
  if (field.move == 'X') {
    field.move = 'O';
  } else if (field.move == 'O') {
    field.move = 'X';
  }
}

for (let i = 0; i < 9; i++) {
  allField(i).addEventListener('click', () => {
    allField(i).textContent = field.move;
    playMove();
  });
}
