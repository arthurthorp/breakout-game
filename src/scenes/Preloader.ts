import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preolader');
  }

  preload() {
    this.load.image('ball', 'assets/img/ball.png');
    this.load.image('paddle', 'assets/img/paddle.png');
    this.load.image('block', 'assets/img/gray-block.png');

    this.load.tilemapTiledJSON('level1', 'assets/level/level1.json');
  }

  create() {
    this.scene.start('game');
  }
}
