import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preolader');
    }

    preload() {
        this.load.image('ball', 'assets/img/ball.png');
    }

    create() {
       this.scene.start('game');
    }
}