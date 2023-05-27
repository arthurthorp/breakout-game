import Phaser from 'phaser';

import Preloader from './scenes/Preloader';

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'matter',
		matter: {
			gravity: { y: 0 }
		}
	},
	scene: [Preloader]
}

export default new Phaser.Game(config)
