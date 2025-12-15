import {IdleState, ShootingState} from '/src/WandState.js'
export class Wand{
    constructor(gemSprite, wandSprite, light){
        // Wand Sprite adjustments
        this.gem = gemSprite;
        this.gem.setTint(0x0000ff);  

        this.gem.setScale(2, 2);
        this.wand = wandSprite;
        this.wand.setScale(2, 2);
       
        // Wand Offsets
        this.wandOffsetX = 0;
        this.wandOffsetY = 0;
        this.gemOffsetX = 0;
        this.gemOffsetY = 0;

        // Player
        this.player = null;

        // Direction of Wand
        this.direction = "right";
        this.Direction("right");

        //Beam of Light
        this.light = light;

        this.shoot = false;
        this.currentState = IdleState.GetInstance();
    }

    
    
    Update() {
        this.currentState.Update(this);

        
        
       
        
    }
    Direction(direct){
        this.direction = direct;
    }


    Shoot(){
        if(this.shoot == false){
            this.shoot = true;
            this.Shoot();
            this.timer = this.player.scene.time.delayedCall(500, this.OffCoolDown, [], this);
        }


    }
    OffCoolDown(){
        this.shoot = false;
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

    UpdatePosition(){
        let playerX = this.player.sprite.x;
        let playerY = this.player.sprite.y;
        this.gem.x = playerX + this.gemOffsetX;
        this.gem.y = playerY + this.gemOffsetY;
        this.wand.x = playerX + this.wandOffsetX;
        this.wand.y = playerY + this.wandOffsetY;
    }
    UpdateRotation(){
        this.wand.angle = this.rotation;
        this.gem.angle = this.rotation;
    }

    UpdateLightPosition(){
        this.light.x = this.gem.x;
        this.light.y = this.gem.y;
        this.light.angle = this.gem.angle - 90;


        
        this.light.setTint(this.gem.tintTopLeft);

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

}