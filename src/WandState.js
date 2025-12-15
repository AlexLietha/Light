export class WandState{
     constructor()
    {
        if (new.target === WandState) {
            throw new Error("Cannot instantiate Parent Class PlayerState");
        }
    }
    Update(){

    }
    OnEnter(){

    }
    OnExit(){

    }
}

export class IdleState extends WandState{
    static instance = null;
    static GetInstance()
    {
        if(IdleState.instance == null)
        {
            IdleState.instance = new IdleState();
        }

        return IdleState.instance;
    }
    Update(context)
    {
        if(context.shoot == true){
            context.SetCurrentState(ShootingState.GetInstance());
            return;
        }

        if(context.direction == "up"){
            context.gem.setTint(0xff0000);
             
            context.wandOffsetX = 0;
            context.wandOffsetY = -32;

            context.gemOffsetX = 0;
            context.gemOffsetY = -64;


            context.rotation = 0;
        }
        else if (context.direction == "down"){
            context.gem.setTint(0xff0000);  
            context.wandOffsetX = 0;
            context.wandOffsetY = 48;
            context.gemOffsetX = 0;
            context.gemOffsetY = 80;
            context.rotation = 180;
        }
        else if(context.direction == "left"){
            context.gem.setTint(0x00ff00);   
            context.wandOffsetX = -64;
            context.wandOffsetY = 32;
            context.gemOffsetX = -96;
            context.gemOffsetY = 32;
            context.rotation = 270;

        }
        else if(context.direction == "right"){
            context.gem.setTint(0x0000ff);   
            context.wandOffsetX = 64;
            context.wandOffsetY = 32;
            context.gemOffsetX = 96;
            context.gemOffsetY = 32;
            context.rotation = 90;

        }

        context.UpdatePosition();
        context.UpdateRotation();
    }

    OnEnter(context)
    {
        console.log("Entered Wand Idle State");
        
    }

    OnExit(context)
    {
        console.log("Exited Wand Idle State")
    }

}
export class ShootingState extends WandState{
    static instance = null;
    static GetInstance()
    {
        if(ShootingState.instance == null)
        {
            ShootingState.instance = new ShootingState();
        }

        return ShootingState.instance;
    }
    Update(context)
    {
        if(context.shoot == false){
            context.SetCurrentState(IdleState.GetInstance());
            return;
        }
        context.UpdatePosition();
        context.UpdateLightPosition();
        // follow gem
    }

    OnEnter(context)
    {

        console.log("Entered Wand Shooting State");
        context.light.body.enable = true;
        
    }

    OnExit(context)
    {
        console.log("Exited Wand Shooting State")
        context.light.y = -64;
        context.light.angle = 0;
        context.light.body.enable = false;

    }

}