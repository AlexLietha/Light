import {MenuState, WaitingState, SpawningState, StartState  } from '/src/WaveState.js'
import { Enemy} from '/src/Enemy.js'
import { Player} from '/src/Player.js'

export class WaveSystem{
    constructor(scene){
        this.round = 0;
        this.spawnedEnemies = 0;
        this.maxEnemies = 5;
        this.scene = scene;
        this.currentState = MenuState.GetInstance();
        this.started = false;
        this.built = false;

        this.player = new Player(scene);
        this.player.sprite.body.enable = false;
        this.player.sprite.setVelocity(0, 0);
        this.player.sprite.active = false;
        this.player.sprite.visible = false;


        this.spawning = false;
        this.enemies = [];
        for (let i = 0; i < this.maxEnemies; i++) {
            console.log(i);
            const enemy = new Enemy(scene)
            enemy.player = this.player;
            enemy.sprite.setDepth(5);
            scene.physics.add.collider(enemy.sprite, scene.walls, enemy.StopDashing, null, enemy);
            scene.physics.add.collider(enemy.sprite, scene.floor, enemy.StopDashing, null, enemy);
            scene.physics.add.overlap(enemy.sprite, this.player.wand.light, () => {enemy.Damage(this.player.wand.light);}, null,  enemy);
            scene.physics.add.overlap(enemy.sprite, this.player.sprite, () => {this.player.Damage(true); }, null, this.player)
            this.enemies.push(enemy);
        }
        this.waveText = this.scene.add.text(100, 200, 'Wave: ' + this.round);
        this.playerHealth = this.scene.add.text(100, 150, 'Health: ' + this.player.health);
        this.spawnTimer = null;
    }

    Update(){
        this.currentState.Update(this);
        this.player.Update();

        this.enemies.forEach(enemy => {
            enemy.Update();
        });
                this.playerHealth.setText('Health: ' + this.player.health);

    }

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

    AllEnemiesAreDead() {
        return this.enemies.every(enemy => enemy.isDead);
    }   
    

    StartSpawning() {
        this.spawnTimer = this.scene.time.addEvent({
        delay: 2000,
        callback: this.SpawnEnemy,
        callbackScope: this,
        loop: true
    });
}
    SpawnEnemy(){
        if(this.spawnedEnemies >= this.round ){
            this.spawning = false;
            return;
        }
        for (const enemy of this.enemies){
            if(enemy.isDead == true){
                enemy.isDead = false;
                this.spawnedEnemies++;
                break;
            }
        }
        
    }
    KillEnemies(){
        for(const enemy of this.enemies){
            enemy.isDead = true;
        }
    }
}