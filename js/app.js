const canvas = document.querySelector("#jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const DrawMode = document.getElementById("DrawMode");
const PaintMode = document.getElementById("PaintMode");
const savebutton = document.getElementById("jsSave");
const currentColor = document.querySelector(".current__color__circle");

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

context.strokeStyle = "black";
context.lineWidth = 2.5;
context.fillStyle = "white";
context.fillRect(0, 0, 500, 500);

const startPainting = () => {
	painting = true;
};

let painting = false;
let filling = false;

const stopPainting = (event) => {
	painting = false;
};

const onMouseMove = (event) => {
	const x = event.offsetX;
	const y = event.offsetY;
	if (!painting) {
		context.beginPath();
		context.moveTo(x, y);
	} else {
		context.lineTo(x, y);
		context.stroke();
	}
};

const handleColorClick = (event) => {
	const ClickedColor = event.target.style.backgroundColor;
	console.log(ClickedColor);
	context.strokeStyle = ClickedColor;
	context.fillStyle = ClickedColor;
	currentColor.style.backgroundColor = ClickedColor;
};

const handleRangeChange = (event) => {
	context.lineWidth = event.target.value;
};

const handleDrawClick = (event) => {
	DrawMode.style.backgroundColor = "skyblue";
	PaintMode.style.backgroundColor = "rgb(235,235,235)";
	filling = false;
};

const handlePaintClick = (event) => {
	PaintMode.style.backgroundColor = "skyblue";
	DrawMode.style.backgroundColor = "rgb(235,235,235)";
	filling = true;
};

const handleClickCanvas = (event) => {
	if (filling) {
		context.fillRect(0, 0, 500, 500);
	}
};

const handleContextMenu = (event) => {
	event.preventDefault();
};

const handleSaveButton = (event) => {
	const image = canvas.toDataURL();
	const link = document.createElement("a");
	link.href = image;
	link.download = "MyPainting";
	link.click();
};

if (canvas) {
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("click", handleClickCanvas);
	canvas.addEventListener("contextmenu", handleContextMenu);
	// canvas.addEventListener("mouseleave", stopPainting);
}

let i = 0;
colorArray = Array.from(colors);
colorLength = colorArray.length;
for (i = 0; i < colorArray.length; i++) {
	colorArray[i].addEventListener("click", handleColorClick);
}

if (range) {
	range.addEventListener("input", handleRangeChange);
}

if (DrawMode) {
	DrawMode.addEventListener("click", handleDrawClick);
}
if (PaintMode) {
	PaintMode.addEventListener("click", handlePaintClick);
}

if (filling) {
	context.fillStyle = ClickedColor;
}

if (savebutton) {
	savebutton.addEventListener("click", handleSaveButton);
}
