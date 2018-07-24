'use strict';
/*global $*/


const state = { 
  board: [['','',''],
    ['','',''],
    ['','','']], 
  gameOver: false,
};

let clickCounter = 0;
// State modification functions

const startNewGame = function() {
  console.log('in startNewGame' + state.board);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j<3; j++) {
      state.board[i][j] = '';
    }
  }
};

const findRowNumber = function(cell) {
  return $(cell).closest('.row').attr('id');
};

const findIndex = function(cell) {
  return $(cell).attr('class').split(' ').pop();
};

const changeValue = function(rowNumber, index) {
  let currentCellValue = state.board[rowNumber][index];
  if (clickCounter % 2 === 0 && !(currentCellValue)) {
    state.board[rowNumber][index] = 'X';
    clickCounter++;
  } else if (clickCounter % 2 !== 0 && !(currentCellValue)) {
    state.board[rowNumber][index] = 'O';
    clickCounter++;
  }
};

 
// Render functions

const renderElement = function(rowNumber, index) {
  const value  = state.board[rowNumber][index];
  if (value !== '') {
    return `<div class="cell ${index}">
          <p>${value}</p>
          </div>`;
  } else {
    return `<div class="cell ${index}">
          <p></p>
          </div>`;
  }
};

const renderRow = function(rowNumber) {
  let rowArray = [`<div id ='${rowNumber}' class="row">`];
  for (let i = 0; i < 3; i++) {
    rowArray.push(renderElement(rowNumber, i));
  }
  rowArray.push('</div>');
  return rowArray.join('');
};


const render = function(){
  let finalRender = [];
  for (let i = 0; i < 3; i++) {
    finalRender.push(renderRow(i));
  }
  $('.board').html(finalRender);
};


// Event Listeners

const listenforTic = function() {
  $('.board').on('click', '.cell', function(event){
    if (state.gameOver === false) {
      const rowNumber = findRowNumber(event.target);
      const index = findIndex(event.target);
      changeValue(rowNumber, index);
      render();
    }
    const current = state.board;
    for (let i = 0; i<3; i++) {
      // row matching, column changes (j)
      if (current[i][0] === current[i][1] && current[i][1] === current[i][2] && current[i][0] !== '') {
        state.gameOver = true;
        for (let j = 0; j<3; j++) {
          console.log('in row matching');
          $(`#${i}`).find(`.${j}`).addClass('win');
        }
      }
    }
    // column matching, row changes (j)
    for (let i = 0; i<3; i++) {
      if (current[0][i] === current[1][i] && current[1][i] === current[2][i] && current[0][i] !== '') {
        state.gameOver = true;
        for (let j = 0; j<3; j++) {
          $(`#${j}`).find(`.${i}`).addClass('win');
        }
      }
    }
    if (current[0][0] === current[1][1] && current[1][1] === current[2][2] && current[0][0] !== '') {
      state.gameOver = true;
      for (let j = 0; j<3; j++) {
        $(`#${j}`).find(`.${j}`).addClass('win');
      }
    }
    if (current[0][2] === current[1][1] && current[1][1] === current[2][0] && current[0][2] !== '') {
      state.gameOver = true;
      $('#0').find('.2').addClass('win');
      $('#1').find('.1').addClass('win');
      $('#2').find('.0').addClass('win');
    }
  });
  render();
  
};

const listenForNewGame = function() {
  $('#new-game').click(function() {
    startNewGame();
    state.gameOver = false;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j<3; j++) {
        $(`#${i}`).find(`.${j}`).removeClass('win');
      }
    }
    render();
  });
};

$(function() {
  listenforTic();
  listenForNewGame();
  render();
});

