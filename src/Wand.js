export class Wand{
    constructor(gemSprite, wandSprite){
        this.gem = gemSprite;
        this.gem.setScale(2, 2);
        this.wand = wandSprite;
        this.wand.setScale(2, 2);
       

        this.player = null;
    }

    ChangeColor(){
        //change gem into different color
    }
    
    Update(player) {



        
        let playerPositionX = player.sprite.x;
        if(player.keys.left.isDown){
            this.gem.x = playerPositionX - 64;
            this.wand.x = playerPositionX - 64;
        }
        if(player.keys.right.isDown){
            this.gem.x = playerPositionX + 64;
            this.wand.x = playerPositionX + 64;
        }

        let playerPositionY = player.sprite.y;
        this.gem.y = playerPositionY;
        this.wand.y = playerPositionY;
        
    }
    
}