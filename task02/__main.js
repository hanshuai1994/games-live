var loadLevel = function(n) {
    n = n - 1
    var level = leves[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(p)
        blocks.push(b)
    }
    return blocks
}

var blocks = []
var enableDebugMode = function(enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k == ' ') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            blocks = loadLevel(Number(k))
        }
    })
    // 控制速度
    document.querySelector('#input-speed').addEventListener('input', function() {
        var input = event.target
        window.fps = Number(input.value)
    })
}

var __main = function() {
    enableDebugMode(true)

    var game = Game(60)

    var paddle = Paddle()
    var ball = Ball()

    blocks = loadLevel(1)

    var paused = false

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
        if (window.paused) {
            return
        }
        ball.move()
        // 判断相撞
        if (paddle.collide(ball)) {
            ball.reflect()
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                log('block 相撞')
                block.kill()
                ball.reflect()
            }
        }
    }
    game.draw = function() {
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)

        // draw blocks
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
    }
}

__main()
