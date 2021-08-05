const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

//сторона квадрата
let squareSide = 20;
//переменные для случайной скорости
let minSpeed = 0.5;
let maxSpeed = 2;
//переменные для случайного интервала
let minTime = 200;
let maxTime = 3000;
//для определения координаты X
let startX = 0;
let endX = canvas.width - squareSide;
//для цвета
let starColor = 0;
let endColor = 255;
//функция для рандомного числа (в диапазоне чисел) - цвет,скорость,координата Х,интервал времени
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//функция для случайной скорости
function randomSpd(min, max) {
  return Math.random() * (max - min) + min;
}
//функция для рандомного цвета
function randomColor() {
  return "rgb(" + randomNumber(starColor, endColor) + "," + randomNumber(starColor, endColor) + "," + randomNumber(starColor, endColor) + ")";
}
//массив для хранения объектов 
let squares = [];
//счет
let scoreCounter = 0;


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //рисование квадрата
  function drawSquare(obj) {
    ctx.beginPath();
    ctx.rect(obj.x, obj.y, obj.squareSide, obj.squareSide);
    ctx.fillStyle = obj.color;
    ctx.fill();
    ctx.closePath();
  }
  function draw() {
    for (let i = 0; i < squares.length; i++) {
      drawSquare(squares[i]);
      if (squares[i].y <= canvas.height) {
        squares[i].y += squares[i].ySpeed;
      }
      if (squares[i].y > canvas.height) {
        squares.splice(i, 1);
      }
    }
  }
  draw();
  requestAnimationFrame(animate);
}

let timeID;
//старт рисования
document.querySelector(".start").addEventListener("click", event => {
  if (event.target) {
    timeID = setInterval(function () {
      const square = {
        x: randomNumber(startX, endX),
        y: 0,
        squareSide: squareSide,
        color: randomColor(),
        ySpeed: randomSpd(minSpeed, maxSpeed),
      };
      squares.push(square);
    }, randomNumber(minTime, maxTime));
  }
});
//остановка и очистка поля
document.querySelector(".stop").addEventListener("click", event => {
  if (event.target) {
    clearInterval(timeID);
    squares.splice(0);
    document.querySelector("#score").textContent = 0;
  }
});

canvas.addEventListener('click', (event) => {
  squares.map((item, index) => {
    if ((event.offsetX > item.x && event.offsetY > item.y) &&
      (event.offsetX < item.x + squareSide && event.offsetY < item.y + squareSide)) {
      squares.splice(index, 1);
      document.querySelector("#score").textContent = ++scoreCounter;
    }
  })
});
document.body.onload = animate;

