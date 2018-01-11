var Ball = function(game) {
    var o = game.imageByName('ball')
    // var image = imageFromPath('img/ball.png')
    o.x =  220
    o.y = 290
    o.speedX = 5
    o.speedY = 5
    o.fired = false
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
    o.reflect = function() {
        o.speedY *= -1
    }
    return o
}
