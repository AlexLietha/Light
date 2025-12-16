import {IdleState, ShootingState} from '/src/WandState.js'
export class Wand{
    constructor(scene, player){
        // reference to main scene
        this.scene = scene;

        //creates gem sprite
        this.gem = this.scene.add.sprite(300, 720-128-128-32, 'gem');
        this.gem.setTint(0x0000ff);  
        this.gem.setScale(2, 2);
        this.gem.setDepth(11);

        //creates wand sprite
        this.wand = this.scene.add.sprite(300, 720-128-128, 'wand');
        this.wand.setScale(2, 2);
        this.wand.setDepth(12);

        //creates light sprite
        this.light = this.scene.physics.add.sprite(0, -10, 'light');
        this.light.setOrigin(0, .5); 

       
        // Wand Offsets
        this.wandOffsetX = 0;
        this.wandOffsetY = 0;
        this.gemOffsetX = 0;
        this.gemOffsetY = 0;

        // Player
        this.player = player;

        // Direction of Wand
        this.direction = "right";
        this.Direction("right");

        //bool for state machine
        this.shoot = false;

        // sets the current state to idle
        this.currentState = IdleState.GetInstance();
    }

    
    
    Update() {
        //updates the current state every frame
        this.currentState.Update(this);
        
    }

    // gets a direction from the player
    Direction(direct){
        this.direction = direct;
    }

    //called from player, after .5 seconds goes off cool down
    Shoot(){
        if(this.shoot == false && this.player.spawned){
            this.shoot = true;
            this.timer = this.player.scene.time.delayedCall(500, this.OffCoolDown, [], this);
        }
    }
    OffCoolDown(){
        this.shoot = false;
    }

    
    //updates the wand and gem position based on the player position
    UpdatePosition(){
        let playerX = this.player.sprite.x;
        let playerY = this.player.sprite.y;
        this.gem.x = playerX + this.gemOffsetX;
        this.gem.y = playerY + this.gemOffsetY;
        this.wand.x = playerX + this.wandOffsetX;
        this.wand.y = playerY + this.wandOffsetY;
    }

    // sets the rotation of the wand and gem
    UpdateRotation(){
        this.wand.angle = this.rotation;
        this.gem.angle = this.rotation;
    }


    // update light's position to match the gem's
    UpdateLightPosition(){
        this.light.x = this.gem.x;
        this.light.y = this.gem.y;
        this.light.angle = this.gem.angle - 90;
        this.light.setTint(this.gem.tintTopLeft);



    }

    // readjusts the lights hit box because it can't be rotated
    UpdateLightRotation(){
        // Adjusts the lights hitbox
        if(this.direction == "up"){
            this.light.body.setSize(16, 1280);
            this.light.body.setOffset(-8, -1280);
        }
        else if (this.direction == "down"){
            this.light.body.setSize(16, 1280);
            this.light.body.setOffset(-8, 0);
        }
        else if (this.direction == "left"){
            this.light.body.setSize(1280, 16);
            this.light.body.setOffset(-1280, 0);
        }
        else if (this.direction == "right"){
            this.light.body.setSize(1280, 16);
            this.light.body.setOffset(0, 0);
        }
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

}