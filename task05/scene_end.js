var SceneEnd = function(game) {
    var s = {
        game: game,
    }
    // 初始化
    s.draw = function() {
        // draw labels
        game.context.fillText('Game Over', 260, 210)
    }

    s.update = function() {
    }

    return s
}
