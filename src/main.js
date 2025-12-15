import { Start } from './scenes/Start.js';

const config = {
    type: Phaser.AUTO,
    title: 'Overlord Rising',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
        Start
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
    default: 'arcade',
    arcade: {
        debug: true,
        debugBodyColor: 0x00ff00,
        debugStaticBodyColor: 0xff0000
    }
}
}

new Phaser.Game(config);
            