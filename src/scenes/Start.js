import {Player} from '/src/Player.js'
import { Wand } from '/src/Wand.js'
import { Enemy } from '/src/Enemy.js'
import {WaveSystem } from '/src/WaveSystem.js'
export class Start extends Phaser.Scene {
    

    constructor() {
        super('Start');
        

    }

    preload() {
        this.load.image('background', 'assets/space.png');

        //Player Sprite
        this.load.image('player', 'assets/Light/Light_ch_PlayerModel1.0.png');

        //Floor Sprite
        this.load.image('floor', 'assets/Light/Light_scene_Floor1.0.png');

        //Wand Sprite
        this.load.image('wand', 'assets/Light/wand.png');
        this.load.image('gem', 'assets/Light/gem.png');
        this.load.image('light', 'assets/Light/light.png');

        //Enemy Sprite
        this.load.image('enemy', 'assets/Light/enemy.png');
    }

    create() {
        
        //Scene Creation
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');
        this.background.setDepth(0);

        //Arena Creations
        this.floor = this.add.rectangle(640,720, 1280, 64, 0x00ff00);
        this.physics.add.existing(this.floor, true);

        for (let x = 64; x < 1280; x += 128) {
            this.add.image(x, 720+32, 'floor');
        }
        this.wallLeft = this.add.rectangle(0, 360, 64, 720, 0x00ff00);
        for (let x = 64; x < 720; x += 128) {
            this.add.image(-32, x, 'floor');
        }

        this.wallRight = this.add.rectangle(1280, 360, 64, 720, 0x00ff00);
        for (let x = 64; x < 720; x += 128) {
            this.add.image(1280 + 32, x, 'floor');
        }

        this.celing = this.add.rectangle(640,0, 1280, 64, 0x00ff00);
        for (let x = 64; x < 1280; x += 128) {
            this.add.image(x, -32, 'floor');
        }

        this.walls = this.physics.add.staticGroup();
        this.walls.add(this.celing);
        this.walls.add(this.wallLeft);
        this.walls.add(this.wallRight);



   
        this.waveSystem = new WaveSystem(this);

        this.clickButton = this.add.text(100, 100, 'Start', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.waveSystem.started = true );
    }

    update() {

        this.background.tilePositionX += 2;
        this.waveSystem.Update();
        //this.enemy2.Update();


    }
}


    
