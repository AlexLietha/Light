import {NormalState, DespawnedState, InvincibleState} from '/src/State.js'
import { Wand} from '/src/Wand.js'
export class Player{
    constructor(scene){
        this.scene = scene;
        this.accelerationY = 0;
        this.velocityY = 0;
        this.accelerationX = 0;
        this.velocityX = 0;
        // Character Sprite Constructor
        this.sprite = this.scene.physics.add.sprite(640, 720-128-128-32, 'player');
        this.sprite.setDepth(10);
        this.keys = this.scene.input.keyboard.createCursorKeys();
        this.scene.physics.add.collider(this.sprite, this.scene.floor, this.Land, null, this);
        this.scene.physics.add.collider(this.sprite, this.scene.walls);

        this.wand = new Wand(this.scene, this);

        this.sprite.setMaxVelocity(300, 10000);
        this.sprite.setDragX(2000);
        this.UpdateMovementY(10, 100);

        this.scene = scene;

        this.isFalling = true;
        this.isAttacking = false;
        this.isMoving = false;

        this.spawned = false;
        this.invincible = false;
        this.health = 5;
        
        this.currentState = DespawnedState.GetInstance();
        
        
    }

   

    Update()
    {
        this.currentState.Update(this);
        this.wand.Update();
        // this.currentState.Update(this);

        //Character Movement
        if(this.keys.up.isDown && !this.isFalling){
            this.UpdateMovementY(2500, -1300)
            this.isFalling = true;
        }
        if(this.keys.left.isDown && this.keys.right.isDown){
            this.Stop();
        }
        else if (this.keys.left.isDown){
            this.UpdateMovementX(-2500)
            this.wand.Direction("left");
        }
        else if (this.keys.right.isDown){
            this.UpdateMovementX(2500)
            this.wand.Direction("right");
        }
        else{
            this.Stop();
        }

        if(this.keys.up.isDown && this.keys.down.isDown){

        }
        else if (this.keys.up.isDown){
            this.wand.Direction("up");
        }
        else if (this.keys.down.isDown){
            this.wand.Direction("down");
        }
        else{

        }
        if(this.keys.space.isDown){
            this.wand.Shoot();
        }


    }
    UpdateMovementY(acceleration, velocity){
        this.accelerationY = acceleration;
        this.velocityY = velocity;

        console.log("Updated player acceleration");
        this.sprite.setAccelerationY(this.accelerationY);
        this.sprite.setVelocityY(this.velocityY);
        //this.blackcircle.setAccelerationY(this.acceleration);
    }

    UpdateMovementX(accel){
        this.accelerationX = accel;
        this.sprite.setAccelerationX(this.accelerationX);
    }
    Stop(){
        this.accelerationX = 0;
        this.velocityX = 0;
        this.sprite.setAccelerationX(this.accelerationX);
        //this.sprite.setVelocityX(this.velocityX);
    }

    Land()
    {
        console.log("Landed");
        this.UpdateMovementY(0, 0);
        this.isFalling = false;
    }
    
    Shoot(){
        this.wand.Shoot();
    }

    

    Damage(){
        this.invincible = true;
        this.timer = this.scene.time.delayedCall(3000, () => {
                this.Vincible();
            });
    }
    Vincible(){
        this.invincible = false;
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