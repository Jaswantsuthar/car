let score = document.querySelector(".score");
let startScreen = document.querySelector(".startScreen")
let gameArea = document.querySelector(".gameArea")

let player = {
    speed: 3,
    score: 0
}

startScreen.addEventListener("click", start)

document.addEventListener("keydown", keyPress)
document.addEventListener("keyup", keyRelease)

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

function keyPress(eventDetails) {
    eventDetails.preventDefault();
    let pressedKey = eventDetails.key;
    if (pressedKey === 'ArrowUp' || pressedKey === 'ArrowDown' || pressedKey === 'ArrowLeft' || pressedKey === 'ArrowRight') {
        keys[pressedKey] = true;
    }
    console.log(keys)
}
function keyRelease(eventDetails) {
    eventDetails.preventDefault();
    let releasedKey = eventDetails.key;
    if (releasedKey === 'ArrowUp' || releasedKey === 'ArrowDown' || releasedKey === 'ArrowLeft' || releasedKey === 'ArrowRight') {
        keys[releasedKey] = false;
    }
    console.log(keys)
}

function moveLines() {
    let dividers = document.querySelectorAll('.divider');

    dividers.forEach((divider) => {
        if (divider.y >= 800) {
            divider.y = divider.y - 800
        }

        divider.y = divider.y + player.speed + 5;
        divider.style.top = divider.y + "px";
    })
}

function endGame() {
    player.start = false;
    startScreen.classList.remove('hide')
    //gameArea.classList.add('hide')
    startScreen.innerHTML = "Game Over <br> Your Final Score is " + player.score + " restart the game"
}

function moveCars() {
    let enemys = document.querySelectorAll('.enemy');
    let car =document.querySelector('.car')

    enemys.forEach((enemy) => {

        if (isCollide(car,enemy)) {
            console.log("boom hit")
            endGame()
        }

        if (enemy.y >= 800) {
            enemy.y = enemy.y - 800;
            enemy.style.left = parseInt(Math.random() * 250) + "px"

        }
       

        enemy.y = enemy.y + player.speed;
        enemy.style.top = enemy.y + "px";
    })
}

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    let collideCondition = (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right);
    return !collideCondition;
}

function gamePlay() {
    let car = document.querySelector(".car")
    let road = gameArea.getBoundingClientRect()
    moveLines();
    moveCars();
    if (player.start) {
        if (keys.ArrowUp && player.y > road.top) {
            player.y = player.y - player.speed;
        }
        if (keys.ArrowDown && player.y < road.bottom - 130) {
            player.y = player.y + player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x = player.x - player.speed;
        }
        if (keys.ArrowRight && player.x < (road.width - 60)) {
            player.x = player.x + player.speed;
        }
        car.style.left = player.x + 'px'
        car.style.top = player.y + 'px'

        player.score++
        score.innerHTML = " score:" + player.score;
        console.log("gamePlay");
        requestAnimationFrame(gamePlay)

    }
}
function start() {
    startScreen.classList.add('hide')
    gameArea.classList.remove('hide')
    player.start = true;

    //divider
    for (let x = 0; x <= 4; x++) {
        let divider = document.createElement('div')
        divider.className = "divider"
        divider.y = (x * 200)
        divider.style.top = divider.y + "px"
        gameArea.append(divider);
    }
    requestAnimationFrame(gamePlay)
    let car = document.createElement('div')
    car.className = "car"
    car.innerHTML = `car`
    gameArea.append(car)
    player.x = car.offsetLeft
    player.y = car.offsetTop

    for (let i = 0; i <= 2; i++) {
        let enemyCar = document.createElement('div');
        enemyCar.className = 'enemy'
        enemyCar.y = (i + 1) * 250
        enemyCar.style.top = enemyCar.y + "px"
        enemyCar.style.left = parseInt(Math.random() * 250) + "px"
        enemyCar.style.backgroundColor = "green"
        gameArea.append(enemyCar)
    }


}