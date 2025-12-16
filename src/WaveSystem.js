import {MenuState, WaitingState, SpawningState, StartState  } from '/src/WaveState.js'
import { Enemy} from '/src/Enemy.js'
import { Player} from '/src/Player.js'

export class WaveSystem{
    constructor(scene){
        // round count
        this.round = 0;

        // how many enemies were spawned in the current round
        this.spawnedEnemies = 0;

        // the max amount of enemies can spawn at once
        this.maxEnemies = 5;

        //reference to main scene
        this.scene = scene;

        // sets the current state to menu state
        this.currentState = MenuState.GetInstance();

        //bools for state machine
        this.started = false;
        this.built = false;
        this.spawning = false;


        // creates the player and wand, sets the visibiliy to false
        this.player = new Player(scene);
        this.player.sprite.body.enable = false;
        this.player.sprite.setVelocity(0, 0);
        this.player.sprite.active = false;
        this.player.sprite.visible = false;
        this.player.wand.gem.active = false;
        this.player.wand.gem.visible = false;
        this.player.wand.wand.active = false;
        this.player.wand.wand.visible = false;

        //creates the enemeis and stores them in an array
        this.enemies = [];
        for (let i = 0; i < this.maxEnemies; i++) {
            console.log(i);
            const enemy = new Enemy(scene)
            enemy.player = this.player;
            enemy.sprite.setDepth(5);
            //collider to walls
            scene.physics.add.collider(enemy.sprite, scene.walls, enemy.StopDashing, null, enemy);
            scene.physics.add.collider(enemy.sprite, scene.floor, enemy.StopDashing, null, enemy);

            // trigger when the light touches the enemy
            scene.physics.add.overlap(enemy.sprite, this.player.wand.light, () => {enemy.Damage(this.player.wand.light);}, null,  enemy);

            //trigger when the enemy touches the player
            scene.physics.add.overlap(enemy.sprite, this.player.sprite, () => {this.player.Damage(true); }, null, this.player);

            //adds the enemy to the array
            this.enemies.push(enemy);
        }
        // text that displays the current round
        this.waveText = this.scene.add.text(100, 200, 'Wave: ' + this.round);

        // text that displays the players health
        this.playerHealth = this.scene.add.text(100, 150, 'Health: ' + this.player.health);

        // spawn timer for spawning enemies
        this.spawnTimer = null;
    }

    Update(){
        //updates the current state, player and enemies every frame
        this.currentState.Update(this);
        this.player.Update();
        this.enemies.forEach(enemy => {
            enemy.Update();
        });

        //polling the players current health
        this.playerHealth.setText('Health: ' + this.player.health);

    }

    // standard state setter
    SetCurrentState(NewState)
    {
        if(this.currentState == NewState)
        {
            return;
        }

        if(NewState != null)
        {
            this.currentState.OnExit(this);
        }

        this.currentState = NewState;

        if(this.currentState != null )
        {
            this.currentState.OnEnter(this);
        }
        
    }

    // returns true if all enemies are dead
    AllEnemiesAreDead() {
        return this.enemies.every(enemy => enemy.isDead);
    }   
    
    // spawns an enemy every 2 seconds
    StartSpawning() {
        this.spawnTimer = this.scene.time.addEvent({
        delay: 2000,
        callback: this.SpawnEnemy,
        callbackScope: this,
        loop: true
    });
}

    // sets the enemy isDead to false causing them to spawn
    SpawnEnemy(){
        // will not spawn more enemies if the amount of spawned enemies is greater than the round count
        if(this.spawnedEnemies >= this.round ){
            this.spawning = false;
            return;
        }

        // finds the next dead enemy and spawns them
        for (const enemy of this.enemies){
            if(enemy.isDead == true){
                enemy.isDead = false;
                this.spawnedEnemies++;
                break;
            }
        }
        
    }

    // kills the enemies when the player dies
    KillEnemies(){
        for(const enemy of this.enemies){
            enemy.isDead = true;
        }
    }
}