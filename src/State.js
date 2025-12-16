
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
        
        if(context.invincible){
            context.SetCurrentState(InvincibleState.GetInstance())
            return;
        }
    }
    OnEnter(context){
        console.log("Player: entered NormalState");
    }
    OnExit(context){
        console.log("Player: exited NormalState");

    }
}

export class InvincibleState extends PlayerState
{
    static instance = null;

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
        if(context.health == 0){
            context.SetCurrentState(DespawnedState.GetInstance())
            return;
        }
        if(!context.invincible){
            context.SetCurrentState(NormalState.GetInstance());
            return;
        }
    }
    OnEnter(context)
    {
        console.log("Player: Entered Invincible State");
        context.health--;
        

    }
    OnExit(Player){
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
        if(context.spawned){
            context.SetCurrentState(NormalState.GetInstance());
            return;
        }
    }
    OnEnter(context){
        console.log("Player: Entered Despawned State");
        context.sprite.body.enable = false;
        context.sprite.setVelocity(0, 0);
        context.sprite.active = false;
        context.sprite.visible = false;
        context.spawned = false;
    }
    OnExit(context){
        console.log("Player: Exited Despawned State");
        context.sprite.body.enable = true;
        context.sprite.active = true;
        context.sprite.visible = true;
        context.sprite.setPosition(640, 720-96);
        context.health = 5;
        
    }
}
