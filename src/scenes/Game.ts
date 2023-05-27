import Phaser from 'phaser';

import Paddle from '../game/Paddle';

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private paddle!: Paddle;
  private ball!: Phaser.Physics.Matter.Image;

  private livesLabel!: Phaser.GameObjects.Text;
  private lives = 3;

  constructor() {
    super('game');
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.lives = 3;
  }

  create() {
    const { width, height } = this.scale;

    this.ball = this.matter.add.image(400, 300, 'ball', undefined, {
      circleRadius: 12,
    });

    const body = this.ball.body as MatterJS.BodyType;
    this.matter.body.setInertia(body, Infinity);
    this.ball.setFriction(0, 0);
    this.ball.setBounce(1);

    this.paddle = new Paddle(
      this.matter.world,
      width * 0.5,
      height * 0.9,
      'paddle',
      {
        isStatic: true,
        chamfer: {
          radius: 13,
        },
      }
    );

    this.paddle.attachBall(this.ball);

    this.livesLabel = this.add.text(10, 10, `Lives: ${this.lives}`, {
      fontSize: '24px',
    });
  }

  update(t: number, dt: number) {
    if (this.ball.y > this.scale.height + 100) {
      --this.lives;
      this.livesLabel.text = `Lives: ${this.lives}`;
      this.paddle.attachBall(this.ball);
      return;
    }

    const spaceJustDown = Phaser.Input.Keyboard.JustDown(this.cursors.space!);
    if (spaceJustDown) {
      this.paddle.launch();
    }

    this.paddle.update(this.cursors);
  }
}
