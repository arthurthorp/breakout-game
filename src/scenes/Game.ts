import Phaser from "phaser";

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }

    create() {
        const ball = this.matter.add.image(400,300, 'ball');
        ball.setVelocity(10,10);

        const body = ball.body as MatterJS.BodyType;
        this.matter.body.setInertia(body, Infinity);
        ball.setFrictionAir(0);
        ball.setBounce(1);
    }
}