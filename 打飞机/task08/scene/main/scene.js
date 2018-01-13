const config = {
    player_speed: 10,
    prop2_speed: 1,
    plain_speed: 5,
    bullet_speed: 5,
    fire_cooldown: 9,
}

class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.speed = config.bullet_speed
    }
    update() {
        this.y -= this.speed
    }
}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = 5
        this.cooldown = 0
    }
    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2 - 3
            var y = this.y - 20
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
}

class Plain extends GuaImage {
    constructor(game) {
        var type = randomBetween(1, 3)
        var name = 'plain' + type
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.y += this.speed
        if (this.y > 500) {
            this.setup()
        }
    }
}

class Prop2 extends GuaImage {
    constructor(game) {
        super(game, 'prop2')
        this.setup()
    }
    setup() {
        this.speed = 1
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.speed = config.prop2_speed
        this.y += this.speed
        if (this.y > 500) {
            this.setup()
        }
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game
        this.numberOfEnemies = 10
        this.bg = GuaImage.new(game, 'sky')
        this.cloud = Prop2.new(game, 'prop2')

        // this.player = GuaImage.new(game, 'player')
        // this.player.x = 100
        // this.player.y = 150

        this.player = Player.new(game)
        this.player.x = 100
        this.player.y = 150

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        //
        this.addEnemies()
    }
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Plain.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('ArrowLeft', function() {
            s.player.moveLeft()
        })
        g.registerAction('ArrowRight', function() {
            s.player.moveRight()
        })
        g.registerAction('ArrowUp', function() {
            s.player.moveUp()
        })
        g.registerAction('ArrowDown', function() {
            s.player.moveDown()
        })
        g.registerAction('j', function() {
            s.player.fire()
        })
    }
    update() {
        super.update()
        this.cloud.y += 1
    }
}
