import Phaser from 'phaser';

import Paddle from '../game/Paddle';

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private paddle!: Paddle;
  private ball!: Phaser.Physics.Matter.Image;

  private livesLabel!: Phaser.GameObjects.Text;
  private lives = 3;

  private blocks: Phaser.Physics.Matter.Sprite[] = [];

  constructor() {
    super('game');
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.lives = 3;
  }

  create() {
    const { width, height } = this.scale;

    const map = this.make.tilemap({ key: 'level1' });
    const tileset = map.addTilesetImage('gray-block', 'block');

    map.createLayer('Level', tileset);
    this.blocks = map.createFromTiles(1, 0, { key: 'block' }).map((object) => {
      object.x += object.width * 0.5;
      object.y += object.height * 0.5;

      const block = this.matter.add.gameObject(object, {
        isStatic: true,
      }) as Phaser.Physics.Matter.Sprite;
      block.setData('type', 'block');
      return block;
    });

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

    this.livesLabel = this.add.text(10, 10, `Vidas: ${this.lives}`, {
      fontSize: '24px',
    });

    this.ball.setOnCollide(this.handleBallCollide.bind(this));
  }

  private handleBallCollide(
    data: Phaser.Types.Physics.Matter.MatterCollisionData
  ) {
    const { bodyA } = data;

    if (!bodyA.gameObject) return;

    const gameObjectA = bodyA.gameObject as Phaser.GameObjects.GameObject;

    if (gameObjectA.getData('type') !== 'block') return;

    const index = this.blocks.findIndex((block) => block === gameObjectA);

    if (index !== -1) {
      this.blocks.splice(index, 1);
    }

    this.sound.play('impact');
    gameObjectA.destroy(true);

    if (this.blocks.length <= 0) {
      this.sound.play('level-completed');
      this.scene.start('game-over', { title: 'Você venceu', color: '#0d3451' });
    }
  }

  update() {
    if (this.ball.y > this.scale.height + 100) {
      --this.lives;
      this.livesLabel.text = `Vidas: ${this.lives}`;

      if (this.lives <= 0) {
        this.sound.play('game-over');
        this.scene.start('game-over', {
          title: 'Fim de jogo',
          color: '#d82727',
        });
        return;
      }

      this.paddle.attachBall(this.ball);
      return;
    }

    const { x, y } = this.ball.body.velocity;

    if (x < 2 && x > 0) {
      this.ball.setVelocityX(-2.5);
    } else if (x > -2 && x < 0) {
      this.ball.setVelocityX(2.5);
    }

    if (y < 2 && y > 0) {
      this.ball.setVelocityY(-2.5);
    } else if (y > -2 && y < 0) {
      this.ball.setVelocityY(2.5);
    }

    const spaceJustDown = Phaser.Input.Keyboard.JustDown(this.cursors.space);
    if (spaceJustDown) {
      this.paddle.launch();
    }

    this.paddle.update(this.cursors);
  }
}
