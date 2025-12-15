import {Player} from '/src/Player.js'
import { Wand } from '/src/Wand.js'
import { Enemy } from '/src/Enemy.js'
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

        // Wand Creation
        this.gemSprite = this.add.image(300, 720-128-128-32, 'gem');
        this.wandSprite = this.add.image(300, 720-128-128, 'wand');
        this.lightSprite = this.physics.add.image(0, -10, 'light');
        this.lightSprite.setOrigin(0, .5); 
        this.gemSprite.setDepth(11);
        this.wandSprite.setDepth(12);
        this.wand = new Wand(this.gemSprite, this.wandSprite, this.lightSprite);
       
        

        // Player Creation
        this.playerSprite = this.physics.add.sprite(640, 720-128-128-32, 'player');
        this.playerSprite.setDepth(10);
        this.player = new Player(this, this.playerSprite, this.input.keyboard.createCursorKeys(), this.wand);
        this.physics.add.collider(this.player.sprite, this.floor, this.player.Land, null, this.player);
        this.physics.add.collider(this.player.sprite, this.walls);

        // Enemy Creation
        this.enemySprite = this.physics.add.sprite(250, 150, 'enemy')
        this.enemySprite.setDepth(5);
        this.enemy = new Enemy(this.enemySprite, this.player, this);
        this.physics.add.collider(this.enemySprite, this.walls, this.enemy.StopDashing, null, this.enemy);
        this.physics.add.collider(this.enemySprite, this.floor, this.enemy.StopDashing, null, this.enemy);
        this.physics.add.overlap(
            this.enemySprite, 
            this.lightSprite, 
            () => {
            this.enemy.Damage(this.lightSprite);
            },
            null, 
            this.enemy);
        // this.enemySprite2 = this.physics.add.sprite(250, 150, 'enemy')
        // this.enemySprite2.setDepth(5);
        // this.enemy2 = new Enemy(this.enemySprite2, this.player, this);
        // this.physics.add.collider(this.enemySprite2, this.walls, this.enemy2.StopDashing, null, this.enemy2);
        // this.physics.add.collider(this.enemySprite2, this.floor, this.enemy2.StopDashing, null, this.enemy2);

        // this.physics.add.collider(this.enemy, this.enemy2);
        
    }

    update() {

        this.background.tilePositionX += 2;
        this.player.Update();
        this.enemy.Update();
        //this.enemy2.Update();


    }
}


    
