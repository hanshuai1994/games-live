var Game = function(fps, images, runCallback) {
    // images 是一个对象，里面是图片的引用名字和图片路径
    // 程序会在所有图片再入成功后才运行
    var g = {
        scene: null,
        actions: {},
        keydowns: {},
        images: {},
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
    // update
    g.update = function() {
        g.scene.update()
    }
    // draw
    g.draw = function() {
        g.scene.draw()
    }
    //
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    // timer
    window.fps = 60
    var runloop = function() {

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
        // next run loop
        setTimeout(function() {
            runloop()
        }, 1000/window.fps)
    }

    //
    var loads = []
    // 预先载入所有图片
    var names = Object.keys(images)
    for (var i = 0; i < names.length; i++) {
        let name = names[i]
        var path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function() {
            // 存入 g.images 中
            g.images[name] = img
            // 所有图片都成功再入后，调用 run
            loads.push(1)
            if (loads.length == names.length) {
                g.__start()
            }
        }
    }
    g.imageByName = function(name) {
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            g: images[name],
            image: img,
        }
        return image
    }

    g.runWithScene = function(scene) {
        g.scene = scene
        setTimeout(function() {
            runloop()
        }, 1000/fps)
    }

    g.replaceScene = function(scene) {
        g.scene = scene
    }
    g.__start = function(scene) {
        runCallback(g)
        // 开始运行程序
    }

    return g
}
