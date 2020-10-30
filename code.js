const userPanel = document.querySelector('.userpanel');
const canvas = document.getElementById('my-canvas');
const modePicker = document.getElementById('modepicker');
const linePicker = document.getElementById('linepicker');
const colorPicker = document.getElementById('colorpicker');
const buttonClear = document.querySelector('.button_clear');
const buttonSave = document.querySelector('.button_save');
const ctx = canvas.getContext('2d');

let strokeStile = '#333333';
console.log(userPanel.offsetHeight);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - userPanel.offsetHeight;

ctx.strokeStyle = strokeStile;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 30;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;



//Listeners
canvas.addEventListener('mousemove', selectDrawingMode);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

buttonClear.addEventListener('click', clearCanvas);
buttonSave.addEventListener('click', saveImage);



function selectDrawingMode(e) {
    if (modePicker.value === 'random') {
        drawRandom(e);
    } else {
        drawAsArtist(e);
    }

}

function drawAsArtist(e) {
    if (!isDrawing) {
        return;
    }
    ctx.beginPath();
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = linePicker.value;
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function drawRandom(e) {
    if (!isDrawing) {
        return;
    }
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
    if (hue > 360) {
        hue = 0;
    }
    if (ctx.lineWidth >= 80 || ctx.lineWidth <= 5) {
        direction = !direction;
    }
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}

function setLineWidth() {
    let lineWidth = 10;
    switch (linePicker.value) {
        case 0:
            lineWidth = 10;
            break;
        case 1:
            lineWidth = 20;
            break;
        case 2:
            lineWidth = 30;
            break;
        case 3:
            lineWidth = 40;
            break;
        case 4:
            lineWidth = 50;
            break;
        default:
            lineWidth = 10;
    }
    return ctx.lineWidth = lineWidth;
}

function saveImage() {
    let link = document.getElementById('link');
  link.setAttribute('download', 'MyMasterpiece.png');
  link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  link.click();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}