var score = 0,
    gscore = 0,
    countblink = 10,
    ghost = false;
ghost2 = false;

var player = {
    x: 50,
    y: 100,
    pacmouth: 320,
    pacdir: 0,
    psize: 32,
    speed: 5
};

var enemy = {
    x: 150,
    y: 200,
    speed: 5,
    moving: 0,
    dirx: 0,
    diry: 0,
    flash: 0,
    ghosteat: false
};

var enemy2 = {
    x: 150,
    y: 200,
    speed: 5,
    moving: 0,
    dirx: 0,
    diry: 0,
    flash: 0,
    ghosteat: false
};

var powerdot = {
    x: 10,
    y: 10,
    powerup: false,
    pcountdown: 0,
    ghostNum: 0,
    ghostNum2: 0
};

// setup canvas
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 600;
canvas.height = 400;

// import image
var mainImage;
mainImage = new Image();
mainImage.ready = false;
mainImage.onload = checkReady;
mainImage.src = "img/pac.png";

// add key listener
var keyClick = {};
document.addEventListener("keydown", function(event) {
    keyClick[event.keyCode] = true;
    move(keyClick);
}, false);

document.addEventListener("keyup", function(event) {
    delete keyClick[event.keyCode];
}, false);

// key functions
function move(keyClick) {
    // check click key value
    if (37 in keyClick) {
        player.x -= player.speed;
        player.pacdir = 64;
    }
    if (38 in keyClick) {
        player.y -= player.speed;
        player.pacdir = 96;
    }
    if (39 in keyClick) {
        player.x += player.speed;
        player.pacdir = 0;
    }
    if (40 in keyClick) {
        player.y += player.speed;
        player.pacdir = 32;
    }

    // prevent run off screen
    if (player.x >= (canvas.width - 32)) {
        player.x = 0;
    }
    if (player.y >= (canvas.height - 32)) {
        player.y = 0;
    }
    if (player.x < 0) {
        player.x = (canvas.width - 32);
    }
    if (player.y < 0) {
        player.y = (canvas.height - 32);
    }

    // open close mounth
    if (player.pacmouth == 320) {
        player.pacmouth = 352;
    } else {
        player.pacmouth = 320;
    }
    render();
}


// function once ready
function checkReady() {
    this.ready = true;
    playgame();
}

// game play loop
function playgame() {
    render();
    requestAnimationFrame(playgame);
}


// random number function
function myNum(n) {
    return Math.floor(Math.random() * n);
}

// draw on canvas
function render() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // check if powerup dot is on screen
    if (!powerdot.powerup && powerdot.pcountdown < 5) {
        powerdot.x = myNum(420) + 30;
        powerdot.y = myNum(250) + 30;
        powerdot.powerup = true;
    }

    // check if ghost is on screen
    if (!ghost) {
        enemy.ghostNum = myNum(5) * 64;
        enemy.x = myNum(450);
        enemy.y = myNum(250) + 30;
        ghost = true;
    }

    // check if ghost2 is on screen
    if (!ghost2) {
        enemy2.ghostNum = myNum(5) * 64;
        enemy2.x = myNum(450);
        enemy2.y = myNum(250) + 30;
        ghost2 = true;
    }

    // move enemy
    if (enemy.moving < 0) {
        enemy.moving = (myNum(20) * 3) + myNum(1);
        enemy.speed = myNum(2) + 1;
        enemy.dirx = 0;
        enemy.diry = 0;
        if (powerdot.ghosteat) {
            enemy.speed = enemy.speed * -1;
        }
        if (enemy.moving % 2) {
            if (player.x < enemy.x) {
                enemy.dirx = -enemy.speed;
            } else {
                enemy.dirx = enemy.speed;
            }
        } else {
            if (player.y < enemy.y) {
                enemy.diry = -enemy.speed;
            } else {
                enemy.diry = enemy.speed;
            }
        }
    }

    enemy.moving--;
    enemy.x = enemy.x + enemy.dirx;
    enemy.y = enemy.y + enemy.diry;

    // prevent run off screen
    if (enemy.x >= (canvas.width - 32)) {
        enemy.x = 0;
    }
    if (enemy.y >= (canvas.height - 32)) {
        enemy.y = 0;
    }
    if (enemy.x < 0) {
        enemy.x = (canvas.width - 32);
    }
    if (enemy.y < 0) {
        enemy.y = (canvas.height - 32);
    }

    if (enemy2.moving < 0) {
        enemy2.moving = (myNum(20) * 3) + myNum(1);
        enemy2.speed = myNum(2) + 1;
        enemy2.dirx = 0;
        enemy2.diry = 0;
        if (powerdot.ghosteat) {
            enemy2.speed = enemy2.speed * -1;
        }
        if (enemy2.moving % 2) {
            if (player.x < enemy2.x) {
                enemy2.dirx = -enemy2.speed;
            } else {
                enemy2.dirx = enemy2.speed;
            }
        } else {
            if (player.y < enemy2.y) {
                enemy2.diry = -enemy2.speed;
            } else {
                enemy2.diry = enemy2.speed;
            }
        }
    }

    enemy2.moving--;
    enemy2.x = enemy2.x + enemy2.dirx;
    enemy2.y = enemy2.y + enemy2.diry;


    // prevent run off screen
    if (enemy2.x >= (canvas.width - 32)) {
        enemy2.x = 0;
    }
    if (enemy2.y >= (canvas.height - 32)) {
        enemy2.y = 0;
    }
    if (enemy2.x < 0) {
        enemy2.x = (canvas.width - 32);
    }
    if (enemy2.y < 0) {
        enemy2.y = (canvas.height - 32);
    }


    //Collision detection ghost
    if (player.x <= (enemy.x + 26) && enemy.x <= (player.x + 26) && player.y <= (enemy.y + 26) && enemy.y <= (player.y + 32)) {
        console.log('ghost');
        if (powerdot.ghosteat) {
            score++;
        } else {
            gscore++;
        }
        player.x = 10;
        player.y = 100;
        enemy.x = 300;
        enemy.y = 200;
        powerdot.pcountdown = 0;
    }

    //Collision detection ghost2
    if (player.x <= (enemy2.x + 26) && enemy2.x <= (player.x + 26) && player.y <= (enemy2.y + 26) && enemy2.y <= (player.y + 32)) {
        console.log('ghost2');
        if (powerdot.ghosteat) {
            score++;
        } else {
            gscore++;
        }
        player.x = 10;
        player.y = 100;
        enemy2.x = 300;
        enemy2.y = 200;
        powerdot.pcountdown = 0;
    }

    //Collision detection powerup
    if (player.x <= powerdot.x && powerdot.x <= (player.x + 32) && player.y <= powerdot.y && powerdot.y <= (player.y + 32)) {
        console.log('hit');
        powerdot.powerup = false;
        powerdot.pcountdown = 500;
        powerdot.ghostNum = enemy.ghostNum;
        powerdot.ghostNum2 = enemy2.ghostNum;
        enemy.ghostNum = 384;
        enemy2.ghostNum = 384;
        powerdot.x = 0;
        powerdot.y = 0;
        powerdot.ghosteat = true;
        player.speed = 10;
    }

    // powerup countdown
    if (powerdot.ghosteat) {
        powerdot.pcountdown--;
        if (powerdot.pcountdown <= 0) {
            powerdot.ghosteat = false;
            enemy.ghostNum = powerdot.ghostNum;
            enemy2.ghostNum = powerdot.ghostNum2;
            player.speed = 5;
        }
    }

    // draw power up dot
    if (powerdot.powerup) {
        context.fillStyle = "#ffffff";
        context.beginPath();
        context.arc(powerdot.x, powerdot.y, 10, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }

    // enemy blinking
    if (countblink > 0) {
        countblink--;
    } else {
        countblink = 20;
        if (enemy.flash == 0) {
            enemy.flash = 32;
            enemy2.flash = 32;
        } else {
            enemy.flash = 0;
            enemy2.flash = 0;
        }
    }

    // write score
    context.font = "20px Verdana";
    context.fillStyle = "white";
    context.fillText("Pacman: " + score + " vs Ghost: " + gscore, 2, 18);

    // draw characters
    context.drawImage(mainImage, enemy2.ghostNum, enemy2.flash, 32, 32, enemy2.x, enemy2.y, 32, 32);
    context.drawImage(mainImage, enemy.ghostNum, enemy.flash, 32, 32, enemy.x, enemy.y, 32, 32);
    context.drawImage(mainImage, player.pacmouth, player.pacdir, 32, 32, player.x, player.y, 32, 32);
}