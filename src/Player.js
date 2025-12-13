import {PlayerState, MovingRightState, MovingLeftState, AttackingState, JumpingState, IdleState} from '/src/State.js'

export class Player{
    constructor(playerSprite, keys, wand){
        this.accelerationY = 0;
        this.velocityY = 0;
        // Character Sprite Constructor
        this.wand = wand;
        this.sprite = playerSprite;
        this.UpdateMovement(10, 10);


        this.isFalling = true;
        this.isAttacking = false;
        this.isMoving = false;
        
        
        this.keys = keys;
        this.currentState = IdleState.GetInstance();
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

    Update()
    {
        this.wand.Update(this);
        this.currentState.Update(this);

    }
    UpdateMovement(acceleration, velocity){
        this.acceleration = acceleration;
        this.velocityY = velocity;

        console.log("Updated player acceleration");
        this.sprite.setAccelerationY(this.acceleration);
        this.sprite.setVelocityY(this.velocityY)
        //this.blackcircle.setAccelerationY(this.acceleration);
    }

    Land()
    {
        console.log("Landed");
        this.UpdateMovement(0, 0);
        this.isFalling = false;
    }

    Shoot(){

    }
    TakeDamage(){

    }

    
}