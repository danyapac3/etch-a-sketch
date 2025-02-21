const gridContainer = document.querySelector('.grid-container');

function createElementWithClasses(elementType, ...classes) {
  const element = document.createElement(elementType);
  element.classList.add(...classes);
  return element;
}

function generateGrid(size = 50) {
  const grid = createElementWithClasses('div', 'grid-container');
  grid.style.setProperty('--cell-size', `calc(100% / ${size})`);
  for (let i = 0; i < size ** 2; i++) {
    const cell = createElementWithClasses('div', 'grid-cell');
    grid.appendChild(cell);
  }
  return grid;
}


const newGridContainer = generateGrid();
console.log(newGridContainer.childElementCount);
gridContainer.replaceWith(newGridContainer);