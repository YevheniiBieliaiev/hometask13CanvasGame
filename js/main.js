const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function animate() {
  //значение для случайного цвета
  function randomColor() {
    function randNumb() {
      return Math.floor(Math.random() * (255 + 1));
    }
    return "rgb(" + randNumb() + "," + randNumb() + "," + randNumb() + ")";
  }
  //случайная координата Х
  function randomX() {
    return Math.floor(Math.random() * (canvas.width - 20));
  }
  //случайная скорость
  let minSpeed = 1; // для целого числа
  let maxSpeed = 4;// для целого числа
  function randomSpeed() {
    return Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
  }
  //случайная интервал времени
  function randomInterval() {
    let minTime = 200;
    let maxTime = 3000;
    return Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  }
  //стоп рисования и очистка поля
  function cleaner(variable) {
    clearInterval(variable);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  //массив для хранения объектов 
  let squareArr = [];
  //объек с параметрами
  const Square = {
    x: randomX,
    y: 0,
    squareSide: 20,
    color: randomColor,
    ySpeed: randomSpeed
  }
  //рисование квадрата
  function drawSquare(obj) {
    ctx.beginPath();
    ctx.rect(obj.x(), obj.y, obj.squareSide, obj.squareSide);
    ctx.fillStyle = obj.color();
    ctx.fill();
    ctx.closePath();
  }


  function draw() {
    drawSquare(Square);


  }


  let timeID;
  document.querySelector(".stop").addEventListener("click", event => {
    if (event.target) { cleaner(timeID); }
  });
  document.querySelector(".start").addEventListener("click", event => {
    if (event.target) { timeID = setInterval(draw, randomInterval()); }
  });
  //requestAnimationFrame(animate);
}




canvas.addEventListener('click', (event) => { });
document.body.onload = animate;
