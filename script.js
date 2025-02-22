function createElementWithClasses(elementType, ...classes) {
  const element = document.createElement(elementType);
  element.classList.add(...classes);
  return element;
}

function generateCanvas(size) {
  const canvas = createElementWithClasses('div', 'canvas-container');
  canvas.style.setProperty('--cell-size', `calc(100% / ${size})`);
  for (let i = 0; i < size ** 2; i++) {
    const cell = createElementWithClasses('div', 'canvas-cell');
    canvas.appendChild(cell);
  }
  return canvas;
}

function initCanvas(size = 16) {
  const oldCanvas = document.querySelector('.canvas-container');
  const newCanvas = generateCanvas(size);

  newCanvas.addEventListener('mousedown', (e) => {
    if (e.button === 0) isMouseDown = true;
    paintCell(e.target);
  });
  newCanvas.addEventListener('mouseover', (e) => {
    paintCell(e.target);
  });

  oldCanvas.replaceWith(newCanvas);
  return newCanvas;
}

function paintCell(cell) {
  if (isMouseDown && cell.classList.contains('canvas-cell')) {
    cell.style.backgroundColor = cellColor;
  }
}

function toggleGrid({currentTarget: button}) {
  let isStyled = Boolean(canvasContainer.style.getPropertyValue('--cell-border'));
  if (isStyled) {
    button.textContent = 'Grid: on';
    canvasContainer.style.removeProperty('--cell-border');
  } else {
    button.textContent = 'Grid: off';
    canvasContainer.style.setProperty('--cell-border', 'none');
  }
}

// Global Variables
let canvasContainer;
let toggleGridButton = document.querySelector('.toggle-grid');
let isMouseDown = false;
let cellColor = ' #bf5a6c';

// Init canvas
canvasContainer = initCanvas();

// Event Listeners
toggleGridButton.addEventListener('click', toggleGrid);

document.addEventListener('mouseup', (e) => {
  isMouseDown = false;
});