// Obtén el canvas y su contexto
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let game_Over = false;
// Configura el tamaño de los bloques y del canvas
var blockSize = 10;
var width = canvas.width / blockSize;
var height = canvas.height / blockSize;

// Inicializa la serpiente
var snake = [];
snake[0] = {
    x: Math.floor(width / 2),
    y: Math.floor(height / 2)
};

// Dibuja la serpiente
function drawSnake() {

    // Borrar la serpiente en el canvas si el juego ha terminado
    if (game_Over) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

    for (var i = 0; i < snake.length; i++) {
        var x = snake[i].x * blockSize;
        var y = snake[i].y * blockSize;
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, blockSize, blockSize);
    }
}

// Dibuja el juego
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawSnake();
}

// Actualiza el juego
function update() {
    updateSnake();
}



//setInterval(gameLoop, 100);
var gameLoop = setInterval(() => {
    // Verificar si el juego ha terminado
    if (!game_Over) {
        // Llamar a la función drawSnake() si el juego no ha terminado
        this.game_Loop();

        console.log("gameLoop");
    } else {
        // Llamar a la función gameOver() si el juego ha terminado
        this.gameOver();
    }

    // ...
}, 100);

// Ejecuta el juego
function game_Loop() {
    draw();
    drawFood()
    update();
}


var food = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height)
};

function drawFood() {
    var x = food.x * blockSize;
    var y = food.y * blockSize;
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, blockSize, blockSize);

}


function checkCollision(head, array) {
    for (var i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function checkGameOver() {
    var head = snake[0];
    if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height || checkCollision(head, snake.slice(1))) {
        clearInterval(gameInterval);
    }
}

var direction = "right";

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 37 && direction !== "right") {
        direction = "left";
    } else if (event.keyCode === 38 && direction !== "down") {
        direction = "up";
    } else if (event.keyCode === 39 && direction !== "left") {
        direction = "right";
    } else if (event.keyCode === 40 && direction !== "up") {
        direction = "down";
    }
});


function gameOver() {
    // Detener el bucle del juego
    clearInterval(gameLoop);
    game_Over = true; // Establecer la variable gameOver en true

    //init();
    // Mostrar un mensaje de "Game Over"
    // pintar color negro el fondo
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // pintar color blanco el texto
    ctx.fillStyle = "white";
    ctx.font = "bold 48px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);


}


function checkSelfCollision() {
    // Obtener la posición de la cabeza de la serpiente
    var head = snake[0];

    // Recorrer todas las partes del cuerpo de la serpiente
    for (var i = 1; i < snake.length; i++) {
        // Verificar si la posición de la cabeza coincide con la posición de cualquier otra parte del cuerpo
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    // Si no se encontró ninguna colisión, regresar falso
    return false;
}

function updateSnake() {
    var head = snake[0];
    if (direction === "right") {
        head = {
            x: head.x + 1,
            y: head.y
        };
    } else if (direction === "left") {
        head = {
            x: head.x - 1,
            y: head.y
        };
    } else if (direction === "up") {
        head = {
            x: head.x,
            y: head.y - 1
        };
    } else if (direction === "down") {
        head = {
            x: head.x,
            y: head.y + 1
        };
    }

    // Verificar si la cabeza de la serpiente ha excedido los límites de la pantalla
    if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
        gameOver();
        return;
    }

    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };
    } else {
        snake.pop();
    }
    snake.unshift(head);
    let isAlive = true;
    // Verificar si la serpiente choca consigo misma
    if (checkSelfCollision()) {
        isAlive = false;
    }

    // Si la serpiente está muerta, llamar a la función gameOver()
    if (!isAlive) {
        gameOver();
        return;
    }
}



function restart() {
    // Detener el bucle del juego
    clearInterval(gameLoop);

    // Volver a configurar el juego
    game_Over = false;
    snake = [];
    snake[0] = {
        x: Math.floor(width / 2),
        y: Math.floor(height / 2)
    };
    direction = "right";
    food = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
    };

    // Volver a iniciar el bucle del juego
    gameLoop = setInterval(game_Loop, 100);
}



// ejecutar botones direccionales

const botonArriba = document.querySelector("#boton-arriba");
const botonAbajo = document.querySelector("#boton-abajo");
const botonIzquierda = document.querySelector("#boton-izquierda");
const botonDerecha = document.querySelector("#boton-derecha");

botonArriba.addEventListener("click", function() {
    if(direction != "down")  direction = "up";
});

botonAbajo.addEventListener("click", function() {
    if(direction != "up") direction = "down";
});

botonIzquierda.addEventListener("click", function() {
    if(direction != "right") direction = "left";
});

botonDerecha.addEventListener("click", function() {
    if(direction != "left") direction = "right";
});
