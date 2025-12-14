export class EnemyState{
     constructor()
    {
        if (new.target === EnemyState) {
            throw new Error("Cannot instantiate Parent Class EnemyState");
        }
    }
    Update(){

    }
    OnEnter(){

    }
    OnExit(){

    }
}

export class IdleEnemyState extends EnemyState{
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
        if(context.dashing == true){
            context.SetCurrentState(DashingEnemyState.GetInstance());
            return;
        }
    }

    OnEnter(context)
    {
        
    }

    OnExit(context)
    {
    }

}
export class DashingEnemyState extends WandState{
    static instance = null;
    static GetInstance()
    {
        if(DashingEnemyState.instance == null)
        {
            DashingEnemyState.instance = new DashingEnemyState();
        }

        return DashingEnemyState.instance;
    }
    Update(context)
    {
        if(context.dashing == false){
            context.SetCurrentState(DashingEnemyState.GetInstance());
            return;
        }
    }

    OnEnter(context)
    {
        console.log("Entered Wand Shooting State");
    }

    OnExit(context)
    {
        console.log("Exited Wand Shooting State")
        context.light.y = -64;
        context.light.angle = 0;

    }

}