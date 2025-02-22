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

function initCanvas(size = 20) {
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

// Global Constants
const colorPicker = document.querySelector('.color-picker');
const changeCanvasSizeBtn = document.querySelector('.change-canvas-size');
// Global Variables
let canvasContainer;
let isMouseDown = false;
let cellColor = colorPicker.value;

// Init canvas
canvasContainer = initCanvas();


// Event Listeners
colorPicker.addEventListener('change', ({currentTarget}) => {
  cellColor = currentTarget.value;
});

changeCanvasSizeBtn.addEventListener('click', () => {
  let size = Number(prompt('Specify canvas size between 1-100'));
  if (Number.isNaN(size) || size < 1 || size > 100) {
    alert('You specified invalid size');
  } else {
    canvasContainer = initCanvas(size);
  }
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
});