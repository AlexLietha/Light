import {IdleEnemyState, DashingEnemyState} from '/src/EnemyState.js'
export class Enemy{
    constructor(sprite, player, scene){
        this.sprite = sprite;
        this.player = player;
        this.scene = scene;
        this.isDashing = true;
        this.speed = 300;
        
        this.sprite.setTint(16777215);

        this.currentState = IdleEnemyState.GetInstance();
    }

    Update(){
        this.currentState.Update(this);
    }
    Dash(){
        this.isDashing = true;
    }
    StopDashing(){
        console.log("Hit floor, is now not dashing");
        this.isDashing = false;
    }
    

    Wait(){
        this.sprite.setVelocity(0);
       this.timer = this.scene.time.delayedCall(1000, this.Dash, [], this);
    }

    Damage(light){
        console.log("trigger activated");
        if(this.sprite.tintTopLeft == 16777215){
            this.sprite.setTint(this.sprite.tintTopLeft - light.tintTopLeft);
            console.log("Enemy Hit" + this.sprite.tintTopLeft);
            
        }
        else if ((this.sprite.tintTopLeft == 16711935) && (light.tintTopLeft == 16711680 || light.tintTopLeft == 255) ){
            this.sprite.setTint(this.sprite.tintTopLeft - light.tintTopLeft);
            console.log("Enemy Hit"  + this.sprite.tintTopLeft);

        }
        else if ((this.sprite.tintTopLeft == 16776960) && (light.tintTopLeft == 16711680 || light.tintTopLeft == 65280) ){
            this.sprite.setTint(this.sprite.tintTopLeft - light.tintTopLeft);
            console.log("Enemy Hit" + this.sprite.tintTopLeft );

        }
        else if ((this.sprite.tintTopLeft == 65535) && (light.tintTopLeft == 65280 || light.tintTopLeft == 255) ){
            this.sprite.setTint(this.sprite.tintTopLeft - light.tintTopLeft);
            console.log("Enemy Hit"  + this.sprite.tintTopLeft);

        }
        else if (this.sprite.tintTopLeft == light.tintTopLeft){
            this.sprite.setTint(this.sprite.tintTopLeft - light.tintTopLeft)
            this.isDead = true;
        }
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
}