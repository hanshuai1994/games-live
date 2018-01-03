var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var Paddle = function() {
    var image = imageFromPath('img/paddle.png')
    var o = {
        image: image,
        x: 200,
        y: 300,
        speed:5,
    }
    o.moveLeft = function() {
        o.x -= o.speed
    }
    o.moveRight = function() {
        o.x += o.speed
    }
    o.collide = function(ball) {
        if (ball.y + ball.image.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                return true
            }
        }
        return false
    }
    return o
}

var Ball = function() {
    var image = imageFromPath('img/ball.png')
    var o = {
        image: image,
        x: 220,
        y: 290,
        speedX: 5,
        speedY: 5,
        fired: false,
    }
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired) {
            if (o.x < 0 || o.x > 600) {
                o.speedX *= -1
            }
            if (o.y < 0 || o.y > 400) {
                o.speedY *= -1
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    return o
}

var Game = function() {
    var g = {
        actions:{},
        keydowns:{},
    }
    var canvas = document.querySelector('#canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    // draw
    g.drawImage = function(gameImage) {
        g.context.drawImage(gameImage.image, gameImage.x, gameImage.y)
    }
    // events
    window.addEventListener('keydown', function(event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(event) {
        g.keydowns[event.key] = false
    })
    //
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    // timer
    setInterval(function() {
        // events
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                // 如果按键被按下，调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
    }, 1000/60)
    return g
}

var __main = function() {
    var game = Game()

    var paddle = Paddle()
    var ball = Ball()

    // events
    game.registerAction('ArrowLeft', function() {
        paddle.moveLeft()
    })
    game.registerAction('ArrowRight', function() {
        paddle.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
    })

    game.update = function() {
        ball.move()
        // 判断相撞
        if (paddle.collide(ball)) {
            ball.speedY *= -1
        }
    }
    game.draw = function() {
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
    }
}

__main()
