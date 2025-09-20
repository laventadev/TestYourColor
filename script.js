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
        const x = event.offsetX;
        const y = event.offsetY;
        const color = getColorFromCanvas(x, y);
        
        document.getElementById('colorInput').value = color;
        document.getElementById('colorPanel').style.backgroundColor = color;
        document.getElementById('colorCodeDisplay').textContent = `Current Color: ${color}`;
    }
});

function getColorFromCanvas(x, y) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const panel = document.getElementById('colorPanel');
    
    canvas.width = panel.clientWidth;
    canvas.height = panel.clientHeight;
    
    ctx.drawImage(panel, 0, 0, canvas.width, canvas.height);
    
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    return rgbToHex(pixel[0], pixel[1], pixel[2]);
}

function rgbToHex(r, g, b) {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}
