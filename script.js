let cursorMode = false;

document.getElementById('applyColorBtn').addEventListener('click', function() {
    const colorInput = document.getElementById('colorInput').value;
    const colorPanel = document.getElementById('colorPanel');
    const colorCodeDisplay = document.getElementById('colorCodeDisplay');

    const isValidHex = /^#[0-9A-F]{6}$/i.test(colorInput);

    if (isValidHex) {
        colorPanel.style.backgroundColor = colorInput;
        colorCodeDisplay.textContent = `Current Color: ${colorInput}`;
    } else {
        alert('Please enter a valid hex color code (e.g., #FF5733)');
    }
});

document.getElementById('cursorBtn').addEventListener('click', function() {
    cursorMode = !cursorMode;
    if (cursorMode) {
        this.textContent = 'Cursor Mode: ON';
        document.getElementById('colorPanel').style.cursor = 'crosshair';
    } else {
        this.textContent = 'Cursor Mode: OFF';
        document.getElementById('colorPanel').style.cursor = 'default';
    }
});

document.getElementById('colorPanel').addEventListener('click', function(event) {
    if (cursorMode) {
        const color = getColorFromPanel(event);
        document.getElementById('colorInput').value = color;
        document.getElementById('colorPanel').style.backgroundColor = color;
        document.getElementById('colorCodeDisplay').textContent = `Current Color: ${color}`;
    }
});

function getColorFromPanel(event) {
    const colorPanel = document.getElementById('colorPanel');
    const x = event.offsetX;
    const y = event.offsetY;

    const context = colorPanel.getContext('2d');
    context.clearRect(0, 0, colorPanel.width, colorPanel.height);
    context.drawImage(colorPanel, 0, 0, colorPanel.width, colorPanel.height);

    const pixel = context.getImageData(x, y, 1, 1).data;
    return rgbToHex(pixel[0], pixel[1], pixel[2]);
}

function rgbToHex(r, g, b) {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}
