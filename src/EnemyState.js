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

// when the enemy collided with the wall
export class IdleEnemyState extends EnemyState{
    static instance = null;

    //Getter for the state instance
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
        // if the enemy dies enter the state dead state
        if(context.isDead == true){
            context.SetCurrentState(DeadEnemyState.GetInstance());
            return;
        }
        // enter the dashing state
        if(context.isDashing == true){
            context.SetCurrentState(DashingEnemyState.GetInstance());
            return;
        }
    }

    OnEnter(context)
    {
        // waits for 1 second, and then sets dash = true
        // causing the state to enter the Dashing state
        context.Wait();
    }

    OnExit(context)
    {

    }

}
export class DashingEnemyState extends EnemyState{
    static instance = null;
    //Getter for the state instance
    static GetInstance()
    {
        if(DashingEnemyState.instance == null)
        {
            DashingEnemyState.instance = new DashingEnemyState();
        }

        return DashingEnemyState.instance;
    }
    // updates every frame
    Update(context)
    {
        if(context.isDead == true){
            context.SetCurrentState(DeadEnemyState.GetInstance());
            return;
        }
        if(context.isDashing == false){
            context.SetCurrentState(IdleEnemyState.GetInstance());
            return;
        }
        

    }

    OnEnter(context)
    {
       // sets the velocity to the players current position
        let dir = new Phaser.Math.Vector2(
            context.player.sprite.x - context.sprite.x, 
            context.player.sprite.y - context.sprite.y ).normalize();
        
        context.sprite.setVelocity(dir.x * context.speed, dir.y * context.speed);
    }

    OnExit(context)
    {

    }

}

export class DeadEnemyState extends EnemyState{
    static instance = null;
    //Getter for the state instance
    static GetInstance()
    {
        if(DeadEnemyState.instance == null)
        {
            DeadEnemyState.instance = new DeadEnemyState();
        }

        return DeadEnemyState.instance;
    }

    // updates every frame
    Update(context)
    {
        // when the wave system sets isDead to false, the enemy spawns and enters the idle state
        if(context.isDead == false){
            context.SetCurrentState(IdleEnemyState.GetInstance());
            return;
        }
        

    }

    OnEnter(context)
    {
        //Disables enemy
        context.sprite.body.enable = false;
        context.sprite.setVelocity(0, 0);
        context.sprite.active = false;
        context.sprite.visible = false;
        context.isDead = true;
       
    }

    OnExit(context)
    {
        //enables sprite and spawns in a random location
        context.sprite.body.enable = true;
        context.sprite.active = true;
        context.sprite.visible = true;
        context.sprite.setTint(16777215);
        context.sprite.setPosition(Phaser.Math.Between(100, 1200), 100);

    }

}