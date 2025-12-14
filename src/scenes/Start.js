import {Player} from '/src/Player.js'
import { Wand } from '/src/Wand.js'
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
    }

    create() {
        
       

        //Scene Creation
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');
        this.background.setDepth(0);

        //Floor Creations
        this.floor = this.add.rectangle(0,720, 1280*2, 128*2, 0x00ff00);
        this.physics.add.existing(this.floor, true);
        for (let x = 64; x < 1280; x += 128) {
            this.add.image(x, 720-64, 'floor');
        }

        // Wand Creation
        this.gemSprite = this.add.image(300, 720-128-128-32, 'gem');
        this.wandSprite = this.add.image(300, 720-128-128, 'wand');
        this.lightSprite = this.add.image(0, 0, 'light');
        this.lightSprite.setOrigin(0, .5); 
        this.gemSprite.setDepth(11);
        this.wandSprite.setDepth(12);
        this.wand = new Wand(this.gemSprite, this.wandSprite, this.lightSprite);
       
        

        // Player Creation
        this.playerSprite = this.physics.add.sprite(640, 720-128-128-32, 'player');
        this.playerSprite.setDepth(10);
        this.player = new Player(this, this.playerSprite, this.input.keyboard.createCursorKeys(), this.wand);
        this.physics.add.collider(this.player.sprite, this.floor, this.player.Land, null, this.player);

        
        
        
    }

    update() {

        this.background.tilePositionX += 2;
        this.player.Update();

    }
}


    
