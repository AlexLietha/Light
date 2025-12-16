
export class PlayerState
{
    constructor()
    {
        if (new.target === PlayerState) {
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

// normal state of the player
export class NormalState extends PlayerState{
    static instance = null;
    static GetInstance()
    {
        if(NormalState.instance == null)
        {
            NormalState.instance = new NormalState();
        }

        return NormalState.instance;
    }

    Update(context){
        // if the player takes takes damage, set the state to invincible state
        if(context.invincible){
            context.SetCurrentState(InvincibleState.GetInstance())
            return;
        }
    }
    OnEnter(context){
    }
    OnExit(context){

    }
}

export class InvincibleState extends PlayerState
{
    static instance = null;

    static GetInstance()
    {
        if(InvincibleState.instance == null)
        {
            InvincibleState.instance = new InvincibleState();
        }

        return InvincibleState.instance;
    }

    Update(context){
        // if the player health = 0, despawn the player
        if(context.health == 0){
            context.SetCurrentState(DespawnedState.GetInstance())
            return;
        }
        // after 3 seconds go back to normal state
        if(!context.invincible){
            context.SetCurrentState(NormalState.GetInstance());
            return;
        }
    }
    OnEnter(context)
    {
        console.log("Player: Entered Invincible State");
        //health goes down when entering Invincible state
        context.health--;
        

    }
    OnExit(context){
        console.log("Player: Exited Invincible State");

    }
}

export class DespawnedState extends PlayerState{
    static instance = null;
    static GetInstance()
    {
        if(DespawnedState.instance == null)
        {
            DespawnedState.instance = new DespawnedState();
        }

        return DespawnedState.instance;
    }

    Update(context){
        // when the player is spawned, enter the normal state
        if(context.spawned){
            context.SetCurrentState(NormalState.GetInstance());
            return;
        }
    }
    OnEnter(context){
        console.log("Player: Entered Despawned State");

        //deactivate the sprite
        context.sprite.body.enable = false;
        context.sprite.setVelocity(0, 0);
        context.sprite.active = false;
        context.sprite.visible = false;
        context.spawned = false;

        // deactivate the wand
        context.wand.gem.active = false;
        context.wand.gem.visible = false;
        context.wand.wand.active = false;
        context.wand.wand.visible = false;
    }
    OnExit(context){
        console.log("Player: Exited Despawned State");
        //spawn the player
        context.sprite.body.enable = true;
        context.sprite.active = true;
        context.sprite.visible = true;
        context.sprite.setPosition(640, 720-100);
        context.health = 5;

        // spawn the wand
        context.wand.gem.active = true;
        context.wand.gem.visible = true;
        context.wand.wand.active = true;
        context.wand.wand.visible = true;
        
    }
}
