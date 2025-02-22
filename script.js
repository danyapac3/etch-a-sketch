function createElementWithClasses(elementType, ...classes) {
  const element = document.createElement(elementType);
  element.classList.add(...classes);
  return element;
}

function generateCanvas(size = 16) {
  const canvas = createElementWithClasses('div', 'canvas-container');
  canvas.style.setProperty('--cell-size', `calc(100% / ${size})`);
  for (let i = 0; i < size ** 2; i++) {
    const cell = createElementWithClasses('div', 'canvas-cell');
    canvas.appendChild(cell);
  }
  return canvas;
}

function paintCell(cell) {
  if (isMouseDown && cell.classList.contains('canvas-cell')) {
    cell.style.backgroundColor = 'black';
  }
}

function toggleGridVisibility() {
  let curStyles = canvasContainer.style.getPropertyValue('--cell-border');
  console.log(curStyles);
  if (curStyles === '') canvasContainer.style.setProperty('--cell-border', 'none');
  else canvasContainer.style.removeProperty('--cell-border', '');
}

let canvasContainer = document.querySelector('.canvas-container');
let toggleGridVisibilityButton = document.querySelector('.toggle-grid-visibility');
let isMouseDown = false;

canvasContainer.replaceWith(generateCanvas());
canvasContainer = document.querySelector('.canvas-container');

toggleGridVisibilityButton.addEventListener('click', toggleGridVisibility);

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
