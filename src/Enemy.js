import {IdleEnemyState, DashingEnemyState} from '/src/EnemyState.js'
export class Enemy{
    constructor(sprite, player, scene){
        this.sprite = sprite;
        this.player = player;
        this.scene = scene;
        this.isDashing = true;
        this.speed = 300;



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
       this.timer = this.scene.time.delayedCall(1000, this.Dash, [], this);
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