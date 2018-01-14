var loadLevel = function(game, n) {
    n = n - 1
    var level = leves[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game, enable) {
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
            blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#input-speed').addEventListener('input', function() {
        var input = event.target
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        bullet: 'img/bullet.png',
        prop2: 'img/prop2.png',
        player: 'img/player.png',
        sky: 'img/bg.jpg',

        plain1: 'img/plain1.png',
        // plain1 死亡动画
        plain1_die1: 'img/plain1_die1.png',
        plain1_die2: 'img/plain1_die2.png',
        plain1_die3: 'img/plain1_die3.png',

        plain2: 'img/plain2.png',
        // plain2 死亡动画
        plain2_die1: 'img/plain2_die1.png',
        plain2_die2: 'img/plain2_die2.png',
        plain2_die3: 'img/plain2_die3.png',
        plain2_die4: 'img/plain2_die4.png',

        plain3: 'img/plain3.png',
        // plain3 死亡动画
        plain3_die1: 'img/plain3_die1.png',
        plain3_die2: 'img/plain3_die2.png',
        plain3_die3: 'img/plain3_die3.png',
        plain3_die4: 'img/plain3_die4.png',
        plain3_die5: 'img/plain3_die5.png',
        plain3_die6: 'img/plain3_die6.png',

        fire: 'img/fire.jpg',
    }

    var game = GuaGame.instance(60, images, function(g) {
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
