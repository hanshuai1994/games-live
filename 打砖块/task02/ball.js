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
    o.reflect = function() {
        o.speedY *= -1
    }
    return o
}
