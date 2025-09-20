let cursorMode = false;
const colorPanel = document.getElementById("colorPanel");
const colorInput = document.getElementById("colorInput");
const colorDisplayBanner = document.getElementById("colorDisplayBanner");
const errorMsg = document.getElementById("errorMsg");
const colorPicker = document.getElementById("colorPicker");

const colors = [
  "#FF5733", "#33FF57", "#3357FF", "#F33F8E", "#8C33FF", 
  "#33F3FF", "#FF8C33", "#F3FF33", "#7C33FF", "#57FF33",
  "#33FF8C", "#3399FF", "#FF3399", "#B833FF", "#33FF99",
  "#9933FF", "#FF33C3", "#FF3333", "#33C3FF", "#C3FF33",
  "#FFB833", "#33FFB8", "#A8FF33", "#338CFF", "#FF3366",
  "#33D1FF", "#D133FF" // 2 New Colors
];

function createColorPanel() {
  colors.forEach(color => {
    const colorBox = document.createElement("div");
    colorBox.classList.add("color-box");
    colorBox.style.backgroundColor = color;
    colorBox.dataset.color = color;
    colorPanel.appendChild(colorBox);
  });
}

function updateColorDisplay(color) {
  colorPanel.style.backgroundColor = color;
  colorDisplayBanner.textContent = `Current Color: ${color}`;
  colorDisplayBanner.style.backgroundColor = color;
  colorDisplayBanner.style.color = getTextColorForBackground(color);
  errorMsg.textContent = '';
}

function getTextColorForBackground(bgColor) {
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 125 ? '#000000' : '#FFFFFF';
}

function isValidHex(hex) {
  return /^#[0-9A-F]{6}$/i.test(hex);
}

document.getElementById('applyColorBtn').addEventListener('click', () => {
  const color = colorInput.value.trim();
  if (isValidHex(color)) {
    updateColorDisplay(color);
    removeSelectedHighlight();
  } else {
    errorMsg.textContent = 'Please enter a valid hex color code (e.g., #FF5733)';
  }
});

document.getElementById('colorInput').addEventListener('input', () => {
  const color = colorInput.value.trim();
  if (isValidHex(color)) {
    updateColorDisplay(color);
    removeSelectedHighlight();
  }
});

colorPicker.addEventListener('input', function () {
  colorInput.value = this.value;
  updateColorDisplay(this.value);
  removeSelectedHighlight();
});

document.getElementById('cursorBtn').addEventListener('click', function () {
  cursorMode = !cursorMode;
  this.textContent = cursorMode ? 'Cursor Mode: ON' : 'Cursor Mode: OFF';
  colorPanel.style.cursor = cursorMode ? 'pointer' : 'default';
});

colorPanel.addEventListener('click', function (event) {
  if (cursorMode && event.target.classList.contains('color-box')) {
    const color = event.target.dataset.color;
    colorInput.value = color;
    colorPicker.value = color;
    updateColorDisplay(color);
    highlightSelectedBox(event.target);
  }
});

function removeSelectedHighlight() {
  document.querySelectorAll('.color-box').forEach(box => {
    box.classList.remove('selected');
  });
}

function highlightSelectedBox(box) {
  removeSelectedHighlight();
  box.classList.add('selected');
}

document.getElementById('resetBtn').addEventListener('click', () => {
  colorInput.value = '';
  colorPicker.value = '#ffffff';
  colorPanel.style.backgroundColor = '';
  colorDisplayBanner.textContent = 'Current Color: #FFFFFF';
  colorDisplayBanner.style.backgroundColor = '#ffffff';
  colorDisplayBanner.style.color = '#000000';
  errorMsg.textContent = '';
  removeSelectedHighlight();
});

window.onload = () => {
  createColorPanel();
};
