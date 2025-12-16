import {IdleEnemyState, DashingEnemyState} from '/src/EnemyState.js'
export class Enemy{
    constructor(scene){
        //main scene reference
        this.scene = scene;

        //Enemy sprite
        this.sprite = this.scene.physics.add.sprite(250, 150, 'enemy')

        //Player reference. Gets set in the WaveSystem.js
        this.player;
        
        //Enemy Speed
        this.speed = 300;

        // Sets the color white. Important for damage calculations
        this.sprite.setTint(16777215);

        // bools for the state machine
        this.isDashing = true;
        this.isDead = true;
        this.currentState = IdleEnemyState.GetInstance();
    }

    Update(){
        //Updates state every frame
        this.currentState.Update(this);
    }


    

    // called when colliding with a wall
    StopDashing(){
        this.isDashing = false;
    }
    
    //When the enemy hits a wall it waits and then dashes
    Wait(){
       this.sprite.setVelocity(0);
       this.timer = this.scene.time.delayedCall(1000, this.Dash, [true], this);
    }
    Dash(){
        this.isDashing = true;
    }

    // the enemy has a color and it will get substacted from the lights current color
    // if the enemies color is black, it dies
    Damage(light){
        // if the enemy sprite is white, it gets substacted by the lights current color
        if(this.sprite.tintTopLeft == 16777215){
            this.sprite.setTint(this.sprite.tintTopLeft - light.tintTopLeft);
            console.log("Enemy Hit" + this.sprite.tintTopLeft);
            
        }
        // if the enemy sprite is magenta, it will get substracted if the light's color is either red or blue
        else if ((this.sprite.tintTopLeft == 16711935) && (light.tintTopLeft == 16711680 || light.tintTopLeft == 255) ){
            this.sprite.setTint(this.sprite.tintTopLeft - light.tintTopLeft);
            console.log("Enemy Hit"  + this.sprite.tintTopLeft);

        }
        // if the enemy sprite is yellow, it will get substracted if the light's color is either red or green

        else if ((this.sprite.tintTopLeft == 16776960) && (light.tintTopLeft == 16711680 || light.tintTopLeft == 65280) ){
            this.sprite.setTint(this.sprite.tintTopLeft - light.tintTopLeft);
            console.log("Enemy Hit" + this.sprite.tintTopLeft );

        }
        // if the enemy sprite is cyan, it will get substracted if the light's color is either green or blue

        else if ((this.sprite.tintTopLeft == 65535) && (light.tintTopLeft == 65280 || light.tintTopLeft == 255) ){
            this.sprite.setTint(this.sprite.tintTopLeft - light.tintTopLeft);
            console.log("Enemy Hit"  + this.sprite.tintTopLeft);

        }
        // if the enemy sprite is equal to the light's current collor, the enemy dies
        else if (this.sprite.tintTopLeft == light.tintTopLeft){
            this.sprite.setTint(this.sprite.tintTopLeft - light.tintTopLeft)
            this.isDead = true;
        }
    }
    
    // Standard state setter
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
}