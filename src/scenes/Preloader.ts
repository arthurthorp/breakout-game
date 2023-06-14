import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preolader');
  }

  preload() {
    this.load.image('ball', 'assets/img/ball.png');
    this.load.image('paddle', 'assets/img/paddle.png');
    this.load.image('block', 'assets/img/gray-block.png');

    this.load.audio('impact', 'assets/sound/impact.ogg');
    this.load.audio('game-over', 'assets/sound/fail-level.ogg');
    this.load.audio('level-completed', 'assets/sound/success-level.ogg');

    this.load.tilemapTiledJSON('level1', 'assets/level/level1.json');
  }

  create() {
    this.scene.start('game');
  }
}
