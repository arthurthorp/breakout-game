import Phaser from 'phaser';

import Preloader from './scenes/Preloader';
import Game from './scenes/Game';

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'matter',
		matter: {
			gravity: { y: 0 },
			setBounds: {
				left: true,
				right: true,
				top: true,
				botom: true
			}
		}
	},
	scene: [Preloader, Game]
}

export default new Phaser.Game(config)
