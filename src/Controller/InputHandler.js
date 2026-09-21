export class InputHandler{
    constructor(gameState){

        this.keys = new Set();

        window.addEventListener("keydown", (event)=>{
            if ([" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
                event.preventDefault()
            }

            if(event.key === "p"){
                if(gameState){
                    gameState.isPaused = !gameState.isPaused;
                }
            }

            this.keys.add(event.key)
        });

        window.addEventListener("keyup", (event)=>{
            this.keys.delete(event.key)
        })
    }

    isPressed(...keyPressed){
        return keyPressed.some(key => this.keys.has(key));
    }

    getPressedKeys(){
        return Array.from(this.keys)
    }
    
}