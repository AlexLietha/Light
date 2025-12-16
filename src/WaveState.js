export class WaveState{
     constructor()
    {
        if (new.target === WaveState) {
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

export class MenuState extends WaveState{
    static instance = null;
    static GetInstance()
    {
        if(MenuState.instance == null)
        {
            MenuState.instance = new MenuState();
        }

        return MenuState.instance;
    }
    Update(context)
    {
        if(context.started == true){
            context.SetCurrentState(StartState.GetInstance());
            return;
        }

    }

    OnEnter(context)
    {
        console.log("Entered Menu State");
        context.KillEnemies();
        
    }

    OnExit(context)
    {
        console.log("Exited Menu State");
        context.started = false;
    }

}

export class StartState extends WaveState{
    static instance = null;
    static GetInstance()
    {
        if(StartState.instance == null)
        {
            StartState.instance = new StartState();
        }

        return StartState.instance;
    }
    Update(context)
    {
        if(context.built == true){
            context.SetCurrentState(SpawningState.GetInstance());
            return;
        }

        

    }

    OnEnter(context)
    {
        console.log("Entered Start State");
        context.player.spawned = true;
        context.built = true;
        context.round = 0;
        
        
    }

    OnExit(context)
    {
        console.log("Exited Start State")
    }

}

export class SpawningState extends WaveState{
    static instance = null;
    static GetInstance()
    {
        if(SpawningState.instance == null)
        {
            SpawningState.instance = new SpawningState();
        }

        return SpawningState.instance;
    }
    Update(context)
    {
        if(context.player.health == 0){
            context.SetCurrentState(MenuState.GetInstance());
            return;
        }
        if(context.spawning == false){
            context.SetCurrentState(WaitingState.GetInstance());
            return;
        }

    }

    OnEnter(context)
    {
        console.log("Entered Spawning State");
        context.round++;
        context.waveText.setText('Wave: ' + context.round);

        context.spawning = true;
        context.spawnedEnemies = 0;
        context.StartSpawning();
        
    }

    OnExit(context)
    {
        console.log("Exited Spawning State");
        context.spawnTimer.remove();
    }

}

export class WaitingState extends WaveState{
    static instance = null;
    static GetInstance()
    {
        
        if(WaitingState.instance == null)
        {
            WaitingState.instance = new WaitingState();
        }

        return WaitingState.instance;
    }
    Update(context)
    {
        if(context.player.health == 0){
            context.SetCurrentState(MenuState.GetInstance());
            return;
        }
        if(context.AllEnemiesAreDead() == true && (context.round == context.spawnedEnemies)){
            context.SetCurrentState(SpawningState.GetInstance());
            return;
        }

    }

    OnEnter(context)
    {
        console.log("Entered Waiting State");
        
    }

    OnExit(context)
    {
        console.log("Exited waiting State")
    }

}


