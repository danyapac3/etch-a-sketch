function rgbToHex(str) {
  return '#' + str
    .split('')
    .filter(char => !'rgb( )'.includes(char))
    .join('')
    .split(',')
    .map(num => Number(num).toString(16).padStart(2, '0'))
    .join('');
}

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
    saveColor(paintColor);
  });
  newCanvas.addEventListener('mouseover', (e) => {
    paintCell(e.target);
  });

  oldCanvas.replaceWith(newCanvas);
  return newCanvas;
}

function paintCell(cell) {
  if (isMouseDown && cell.classList.contains('canvas-cell')) {
    if (canvasMode === 'draw') {
      cell.style.backgroundColor = paintColor;
    } else if (canvasMode === 'erase') {
      cell.removeAttribute('style');
    } else if (canvasMode === 'pick') {
      const color = (cell.style.backgroundColor)
        ? rgbToHex(cell.style.backgroundColor)
        : backgroundColor;
      setColor(color);
    }
  }
}

function setColor(color) {
  paintColor = color;
  colorPicker.value = color;
}

function saveColor(color) {
  const savedColors = [];
  for (const colorElement of colorContainer.querySelectorAll('.saved-color')) {
    savedColors.push(colorElement.dataset.color);
  }
  if (!savedColors.includes(color)) {
    const newColorElement = document.createElement('div');
    newColorElement.dataset.color = color;
    newColorElement.style.backgroundColor = color;
    newColorElement.classList.add('saved-color');
    newColorElement.addEventListener('click', () => {
      setColor(color);
    });

    colorContainer.appendChild(newColorElement);
    console.log(savedColors.length);
    if (savedColors.length >= 17) colorContainer.firstChild.remove();
  }
}


// Global Constants
const colorPicker = document.querySelector('.color-picker');
const changeCanvasSizeBtn = document.querySelector('.change-canvas-size');
const selectModeContainer = document.querySelector('.select-mode-container');
const eraseCanvasBtn = document.querySelector('.erase-canvas');
const colorContainer = document.querySelector('.color-container');
// Global Variables
let canvasContainer;
let isMouseDown = false;
let backgroundColor = '#ffffff';
let paintColor = colorPicker.value;
let canvasMode = 'draw'; // can be 'draw', 'erase' or pick;

// Init canvas
canvasContainer = initCanvas();


// Event Listeners
colorPicker.addEventListener('change', ({currentTarget}) => {
  paintColor = currentTarget.value;
});

eraseCanvasBtn.addEventListener('click', () => {
  for (const cell of canvasContainer.children) {
    cell.removeAttribute('style');
  }
});

changeCanvasSizeBtn.addEventListener('click', () => {
  let size = Number(prompt('Specify canvas size between 1-100'));
  if (Number.isNaN(size) || size < 1 || size > 100 || !Number.isInteger(size)) {
    alert('You specified invalid size');
  } else {
    canvasContainer = initCanvas(size);
  }
});

selectModeContainer.addEventListener('click', (e) => {
  const {target} = e;
  if (target.type === 'radio') {
    canvasMode = target.value;
  }
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
});