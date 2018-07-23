'use strict';



const state = { 
  board: [ [0,0,0], 
           [0,0,0], 
           [0,0,0] ], 
  gameOver: false,
};

// State modification functions


const startNewGame = function() {
  console.log('in startNewGame');
  state.board.forEach(element => element.forEach(innerElement => innerElement = 0));
};

 
// Render functions

const renderElement = function(index) {
  return `<div class="cell" id="${index}">
          <p>&nbsp;</p>
          </div>`;
}
const renderRow = function(rowNumber) {
  const rowArray = [`<div class="row${rowNumber}">`];
  for (let i = 0; i < 3; i++) {
    rowArray.push(renderElement(i));
  }
  rowArray.push('</div>');
  return rowArray.join('');
};


const render = function(){
  const finalRender = [];
  for (let i = 0; i < 3; i++) {
    finalRender.push(renderRow(i));
  }
  $('.board').html(finalRender);
}

const render = (function() { 
  const renderTable = function() {

  };
  return {};
}());

// Event Listeners

const listeners = (function() {

}());

// Upon loading, I can immediately click cells to alternately place Xs and Os on each click
// I cannot change a cell after it has a value inside it
// I can see when a winning line has been created
// No further moves can be played from this point
// I can click "New Game" at any time to reset the board

$(function() {
  console.log(renderRow);
  listeners();
  renderRow();
});