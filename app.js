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
  console.log(state.board);
};

const findRowNumber = function(cell) {
  return $(cell).closest('.row').attr('id');
};

const findIndex = function(cell) {
  return $(cell).attr('id');
};

const changeValue = function(rowNumber, index) {
  let currentCellValue = state.board[rowNumber][index];
  if (clickCounter % 2 === 0 && !(currentCellValue)) {
    state.board[rowNumber][index] = 'X';
    console.log('in x');
    clickCounter++;
  } else if (clickCounter % 2 !== 0 && !(currentCellValue)) {
    state.board[rowNumber][index] = 'O';
    console.log('in o');
    clickCounter++;
  }
};

 
// Render functions

const renderElement = function(rowNumber, index) {
  const value  = state.board[rowNumber][index];
  if (value !== '') {
    return `<div class="cell" id="${index}">
          <p>${value}</p>
          </div>`;
  } else {
    return `<div class="cell" id="${index}">
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
      console.log('beginning state of board: ' + state.board);
      const rowNumber = findRowNumber(event.target);
      const index = findIndex(event.target);
      changeValue(rowNumber, index);
      console.log('current state of board: ' + state.board);
      render();
    }
    const current = state.board;
    for (let i = 0; i<3; i++) {
      if (current[i][0] === current[i][1] && current[i][1] === current[i][2] && current[i][0] !== '') {
        state.gameOver = true;
      }
    }
    for (let j = 0; j<3; j++) {
      if (current[0][j] === current[1][j] && current[1][j] === current[2][j] && current[0][j] !== '') {
        state.gameOver = true;
      }
    }
    if (current[0][0] === current[1][1] && current[1][1] === current[2][2] && current[0][0] !== '') {
      state.gameOver = true;
    }
    if (current[0][2] === current[1][1] && current[1][1] === current[2][0] && current[0][2] !== '') {
      state.gameOver = true;
    }
  });
  
};

const listenForNewGame = function() {
  $('#new-game').click(function() {
    startNewGame();
    render();
    state.gameOver = false;
  });
};

/*const listeners = (function() {

}());
*/

// Upon loading, I can immediately click cells to alternately place Xs and Os on each click
// I cannot change a cell after it has a value inside it
// I can see when a winning line has been created
// No further moves can be played from this point
// I can click "New Game" at any time to reset the board

$(function() {
  listenforTic();
  listenForNewGame();
  render();
});

/* 
<!-- The following HTML should be removed and dynamically created by a render function -->
            <div class="row1">
                <div class="cell" id="0">
                    <p>&nbsp;</p>
                </div>
                <div class="cell" id="1">
                    <p>&nbsp;</p>
                </div>
                <div class="cell" id="2">
                    <p>&nbsp;</p>
                </div>
            </div>
            <div class="row2">
                <div class="cell" id="0">
                    <p>&nbsp;</p>
                </div>
                <div class="cell" id="1">
                    <p>&nbsp;</p>
                </div>
                <div class="cell" id="2">
                    <p>&nbsp;</p>
                </div>
            </div>
            <div class="row3">
                <div class="cell" id="0">
                    <p>&nbsp;</p>
                </div>
                <div class="cell" id="1">
                    <p>&nbsp;</p>
                </div>
                <div class="cell" id="2">
                    <p>&nbsp;</p>
                </div>
            </div>
            <!-- Remove all HTML above this line, and dynamically generate with render function -->
  */