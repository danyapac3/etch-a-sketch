let gridContainer = document.querySelector('.grid-container');

function createElementWithClasses(elementType, ...classes) {
  const element = document.createElement(elementType);
  element.classList.add(...classes);
  return element;
}

function generateGrid(size = 16) {
  const grid = createElementWithClasses('div', 'grid-container');
  grid.style.setProperty('--cell-size', `calc(100% / ${size})`);
  for (let i = 0; i < size ** 2; i++) {
    const cell = createElementWithClasses('div', 'grid-cell');
    grid.appendChild(cell);
  }
  return grid;
}

gridContainer.replaceWith(generateGrid());
gridContainer = document.querySelector('.grid-container');

let isMouseDown = false;

function paintCell(cell) {
  if (isMouseDown && cell.classList.contains('grid-cell')) {
    cell.style.backgroundColor = 'black';
  }
}

document.addEventListener('mousedown', (e) => {
  if (e.button === 0) isMouseDown = true;
  paintCell(e.target);
});

document.addEventListener('mouseup', (e) => {
  isMouseDown = false;
});

document.addEventListener('mouseover', (e) => {
  paintCell(e.target);
});