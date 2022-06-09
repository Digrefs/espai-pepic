controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . f f f . . . . . . . . 
        . . . f f 9 9 9 f f . . . . . . 
        . . f 9 9 9 9 9 9 9 f . . . . . 
        . f f f f f f 9 9 9 f . . . . . 
        . f 6 1 1 6 6 f 9 9 9 f . . . . 
        f 6 1 1 1 6 6 b f 9 9 f f f . . 
        f 6 6 6 6 6 b b f 9 9 f 9 9 f . 
        . f b b b b b f 9 9 9 f 9 9 f . 
        . f f f f f f 9 9 9 6 f 9 9 f . 
        . f 9 9 9 9 9 9 9 9 6 f 6 6 f . 
        . f 9 9 9 9 9 9 9 6 6 f 6 6 f . 
        . f 6 9 9 9 9 9 6 6 6 f 6 6 f . 
        . f 6 6 6 6 6 6 6 6 6 f 6 6 f . 
        . f 6 6 f f f f 6 6 6 f f f . . 
        . f 6 6 f . . . f 6 6 f . . . . 
        . . f f . . . . . f f . . . . . 
        `, mySprite, 0, -50)
    music.pewPew.play()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    ASTEROIDE.destroy()
    otherSprite.destroy(effects.confetti, 500)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.fire, 500)
    scene.cameraShake(4, 500)
})
let ASTEROIDE: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
game.splash("BENVINGUTS A L'ESPAI", "Apreta A per començar i B per disparar")
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . b 5 5 b . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . b b b b b 5 5 5 5 5 5 5 b . . 
    . b d 5 b 5 5 5 5 5 5 5 5 b . . 
    . . b 5 5 b 5 d 1 f 5 d 4 f . . 
    . . b d 5 5 b 1 f f 5 4 4 c . . 
    b b d b 5 5 5 d f b 4 4 4 4 b . 
    b d d c d 5 5 b 5 4 4 4 4 4 4 b 
    c d d d c c b 5 5 5 5 5 5 5 b . 
    c b d d d d d 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `, SpriteKind.Player)
mySprite.setPosition(77, 32)
controller.moveSprite(mySprite, 100, 100)
mySprite.setStayInScreen(true)
info.setLife(5)
game.onUpdateInterval(1000, function () {
    ASTEROIDE = sprites.createProjectileFromSide(assets.image`ASTEROIDE`, 0, 50)
    ASTEROIDE.x += randint(0, scene.screenWidth())
    ASTEROIDE.setKind(SpriteKind.Enemy)
})
