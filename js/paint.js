const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
log("initialized.");

var ongoingTouches = [];

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  if (filling === false) {
    painting = true;
  }
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  var touches = event.changedTouches;
  console.log("touches",touches);
  if (painting == false) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
    console.log(event);
  const color = event.target.style.backgroundColor;

  console.log("color", color);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  log(`color chage ${color}`);
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
    console.count("handleModeClick");
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
    log(`Paint `);
  } else {
    filling = true;
    mode.innerText = "Paint";
    log(`Fill `);
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
  log(`handleCanvasClick `);
}

function handleCM(event) {
  //event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = `painting_${timestamp()}`;
  link.click();
  
}

function timestamp(){ 
    var today = new Date(); today.setHours(today.getHours() + 9); 
    return today.toISOString().replace('T', ' ').substring(0, 19); 
}


if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  //canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  //canvas.addEventListener("contextmenu", handleCM);
  //table용
  canvas.addEventListener("touchstart", startPainting, false);
  canvas.addEventListener("touchend", stopPainting, false);
  canvas.addEventListener("touchcancel", stopPainting, false);
  canvas.addEventListener("touchmove", handleMove, false);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

function handleMove(evt) {
    evt.preventDefault();
    log("handleMove");
    var touches = evt.changedTouches;
    for (var i = 0; i < touches.length; i++) {
        let mx = touches[i].clientX;
        let my = touches[i].clientY;

        if (painting == false) {
            ctx.beginPath();
            ctx.moveTo(mx, my);
          } else {
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
      }
  }
  function onTouch(evt) {
    evt.preventDefault();
    log("onTouch");
    if (evt.touches.length > 1 || (evt.type == "touchend" && evt.touches.length > 0))
      return;
  
    var newEvt = document.createEvent("MouseEvents");
    var type = null;
    var touch = null;
  
    switch (evt.type) {
      case "touchstart":
        type = "mousedown";
        touch = evt.changedTouches[0];
        break;
      case "touchmove":
        type = "mousemove";
        touch = evt.changedTouches[0];
        break;
      case "touchend":
        type = "mouseup";
        touch = evt.changedTouches[0];
        break;
    }
  
    newEvt.initMouseEvent(type, true, true, evt.originalTarget.ownerDocument.defaultView, 0,
      touch.screenX, touch.screenY, touch.clientX, touch.clientY,
      evt.ctrlKey, evt.altKey, evt.shiftKey, evt.metaKey, 0, null);
    evt.originalTarget.dispatchEvent(newEvt);
  }
  function log(msg) {
    var p = document.getElementById('log');
    p.innerHTML = msg + "\n" + p.innerHTML;
  }