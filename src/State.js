

import { Player } from '/src/Player.js'

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

export class MovingRightState extends PlayerState
{
    static instance = null;
    static GetInstance()
    {
        if(MovingRightState.instance == null)
        {
            MovingRightState.instance = new MovingRightState();
        }

        return MovingRightState.instance;
    }

    Update(context)
    {
        if(context.keys.up.isDown &&!context.isFalling){
            context.SetCurrentState(JumpingState.GetInstance());
            return;
        }
        if(context.keys.left.isDown && context.keys.right.isDown){
            context.SetCurrentState(IdleState.GetInstance());
            return;
        }
        
        else if(context.keys.left.isDown){
            context.SetCurrentState(MovingLeftState.GetInstance());
            return;
        }

        else if(context.keys.right.isDown){
            return;
        }


        else{
            context.SetCurrentState(IdleState.GetInstance());
            return;
        }
    }

    OnEnter(Player)
    {
        Player.isMoving = true;
        Player.sprite.setVelocityX(0);
        Player.sprite.setVelocityX(300);
        console.log("Entered Moving Right State");


    }

    OnExit(Player)
    {
        console.log("Exited Moving Right State");

        Player.isMoving = false;
    }

}

export class MovingLeftState extends PlayerState
{
    static instance = null;
    static GetInstance()
    {
        if(MovingLeftState.instance == null)
        {
            MovingLeftState.instance = new MovingLeftState();
        }

        return MovingLeftState.instance;
    }

    Update(context)
    {
        if(context.keys.up.isDown &&!context.isFalling){
            context.SetCurrentState(JumpingState.GetInstance());
            return;
        }
        if(context.keys.left.isDown && context.keys.right.isDown){
            context.SetCurrentState(IdleState.GetInstance());
            return;
        }
        
        else if(context.keys.right.isDown){
            context.SetCurrentState(MovingRightState.GetInstance());
            return;
        }
        else if(context.keys.left.isDown){
            return;
        }
        


        else{
            context.SetCurrentState(IdleState.GetInstance());
            return;
        }
    }

    OnEnter(Player)
    {
        Player.isMoving = true;
        Player.sprite.setVelocityX(0);
        Player.sprite.setVelocityX(-300);
        console.log("Entered Moving Left State");

    }

    OnExit(Player)
    {
        console.log("Exited Moving Left State");
        Player.isMoving = false;
    }

}


export class JumpingState extends PlayerState
{
    static instance = null;
    static GetInstance()
    {
        if(JumpingState.instance == null)
        {
            JumpingState.instance = new JumpingState();
        }

        return JumpingState.instance;
    }
    Update(context)
    {
        if(context.keys.left.isDown && context.keys.right.isDown){
            
            return;
        }

        else if(context.keys.left.isDown){
            context.SetCurrentState(MovingLeftState.GetInstance());
            return;
        }

        else if (context.keys.right.isDown){
            context.SetCurrentState(MovingRightState.GetInstance());
            return;
        }
        else{
            context.SetCurrentState(IdleState.GetInstance())
            return;
        }

    }
    OnEnter(context)
    {
        context.UpdateMovement(2500, -1300)
        context.isFalling = true;
        console.log("Entered Jumping State");

    }

    OnExit(context)
    {
        console.log("Exited Jumping State");   
    }
}

export class AttackingState extends PlayerState
{
    static instance = null;
    static GetInstance()
    {
        if(AttackingState.instance == null)
        {
            AttackingState.instance = new AttackingState();
        }

        return AttackingState.instance;
    }
    Update(context)
    {

    }

    OnEnter(context)
    {
        console.log("Entered Attacking State");
    }

    OnExit(context)
    {
        console.log("Exited Attaching State")
    }
}

export class IdleState extends PlayerState
{
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
        if(context.keys.up.isDown &&!context.isFalling){
            context.SetCurrentState(JumpingState.GetInstance());
            return;
        }
        if(context.keys.left.isDown && context.keys.right.isDown){
            return;
        }
        
        else if(context.keys.left.isDown){
            context.SetCurrentState(MovingLeftState.GetInstance());
            return;
        }

        else if (context.keys.right.isDown){
            context.SetCurrentState(MovingRightState.GetInstance());
            return;
            
        }

        // else if (Player.keys.space.isDown){
        //     Player.SetCurrentState(JumpingState.GetInstance());
        // }
        
    }

    OnEnter(context)
    {
        console.log("Entered Idle State");
            context.sprite.setVelocityX(0);
        
        
    }
    OnExit(Player)
    {
        console.log("Exited Idle State");

    }
}

export class InvincibleState extends PlayerState
{
    static instance = null;
    OnEnter(Player)
    {
        Player.health--;
        //Player hitbox = false
    }
    OnExit(Player){

    }
}
export class VincibleState extends PlayerState
{
    static instance = null;
    OnEnter(Player){
        //Player hitbox = true
    }
    OnExit(Player){

    }
}