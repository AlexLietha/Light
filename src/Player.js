import {NormalState, DespawnedState, InvincibleState} from '/src/State.js'
import { Wand} from '/src/Wand.js'
export class Player{
    constructor(scene){
        // reference to main scene
        this.scene = scene;
      
        // Character Sprite Constructor
        this.sprite = this.scene.physics.add.sprite(640, 720-128-128-32, 'player');
        this.sprite.body.setSize(80, 80);
        this.sprite.body.setOffset(24, 48);
        this.sprite.setDepth(10);

        // input from keyboard
        this.keys = this.scene.input.keyboard.createCursorKeys();

        // colliders to the walls and platform
        this.scene.physics.add.collider(this.sprite, this.scene.floor, this.Land, null, this);
        this.scene.physics.add.collider(this.sprite, this.scene.walls);
        this.platformCollider = this.scene.physics.add.collider(this.sprite, this.scene.platforms, this.Land, null, this);
       
        // Creates the wand
        this.wand = new Wand(this.scene, this);

        // physics so that the player doesn't slide
        this.sprite.setMaxVelocity(300, 10000);
        this.sprite.setDragX(2000);

        //starts falling to floor
        this.UpdateMovementY(10, 100);

      
        //bools for state machine
        this.isGrounded = true;
        this.spawned = false;
        this.invincible = false;

        // player health
        this.health = 5;
        
        // sets current state to despawned. player will get spawned when the wave system enters start state
        this.currentState = DespawnedState.GetInstance();
        
        
    }

   

    Update()
    {
        // sees if the player is currently grounded
        this.isGrounded = this.sprite.body.blocked.down || this.sprite.body.touching.down;

        // updates current state
        this.currentState.Update(this);

        // updates wand
        this.wand.Update();

       
        //Character Movement

        // Jump
        if(this.keys.up.isDown && this.isGrounded){
            this.UpdateMovementY(2500, -1300)
            this.isGrounded = false;
        }

        // Movement and changes the direction of the wand
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
      
        // changes the direction of the wand, verticle takes priority over horizontal
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

        // Shoots if space is pressed
        if(this.keys.space.isDown){
            this.wand.Shoot();
        }

   
        // if down is held, the player falls through the platforms
        if (this.keys.down.isDown || this.sprite.body.velocity.y < 0) {
            this.platformCollider.active = false;
        } else {
            this.platformCollider.active = true;

        }


    }

    // updates the sprite's y acceleration and velocity
    UpdateMovementY(acceleration, velocity){
      

        console.log("Updated player acceleration");
        this.sprite.setAccelerationY(acceleration);
        this.sprite.setVelocityY(velocity);
        //this.blackcircle.setAccelerationY(this.acceleration);
    }

    // updates the sprite's x acceleration
    UpdateMovementX(accel){
        this.sprite.setAccelerationX(accel);
    }

    // stops the sprite's x movement
    Stop(){
        this.sprite.setAccelerationX(0);
        //this.sprite.setVelocityX(this.velocityX);
    }

    // stops the sprite's y velocity
    Land()
    {
       this.UpdateMovementY(2500, 0);
     
    }
  
    // shoots the wand
    Shoot(){
        this.wand.Shoot();
    }

    
    // player takes damage and turns invincible. After 3 seconds turns vincible
    Damage(){
        this.invincible = true;
        this.timer = this.scene.time.delayedCall(3000, () => { this.Vincible(); });
    }

    // player becomes vincible
    Vincible(){
        this.invincible = false;
    }
   
    

    


    // standard set state
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