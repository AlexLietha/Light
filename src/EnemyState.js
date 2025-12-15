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
        if(IdleEnemyState.instance == null)
        {
            IdleEnemyState.instance = new IdleEnemyState();
        }

        return IdleEnemyState.instance;
    }
    Update(context)
    {
        if(context.isDashing == true){
            context.SetCurrentState(DashingEnemyState.GetInstance());
            return;
        }
    }

    OnEnter(context)
    {
        console.log("Entered Enemy Idle State");
        context.Dash();
    }

    OnExit(context)
    {
        console.log("Exited Enemy Idle State");

    }

}
export class DashingEnemyState extends EnemyState{
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
        if(context.isDashing == false){
            context.SetCurrentState(IdleEnemyState.GetInstance());
            return;
        }
        

    }

    OnEnter(context)
    {
        console.log("Entered Enemy Dash State");
       
        let dir = new Phaser.Math.Vector2(
            context.player.sprite.x - context.sprite.x, 
            context.player.sprite.y - context.sprite.y
            ).normalize();
        context.sprite.setVelocity(dir.x * context.speed, dir.y * context.speed);
    }

    OnExit(context)
    {
        console.log("Exited Enemy Dash State");

    }

}