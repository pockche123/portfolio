import { Sides } from "../Entity.js";

       function handleX(entity, match) {
        if (entity.vel.x > 0) {
                if (entity.pos.x + entity.size.x > match.x1) {
                    entity.pos.x = match.x1 - entity.size.x;
                    entity.vel.x = 0;
                }
            } else if (entity.vel.x < 0) {
                if (entity.pos.x < match.x2) {
                    entity.pos.x = match.x2;
                    entity.vel.x = 0;
                }
            }
}
    
        function handleY(entity, match) {
                if (entity.vel.y > 0) {
                if (entity.pos.y + entity.size.y > match.y1) {
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;

                    entity.obstruct(Sides.BOTTOM)
                }
                } else if (entity.vel.y < 0) {
                    console.log("Colliding with chance from below", match)
                

                       // Draw text on the canvas
        const canvas = document.getElementById('screen'); // Replace 'yourCanvasId' with the actual ID of your canvas element
                    // const context = canvas.getContext('2d');

        
const ctx = canvas.getContext("2d");

ctx.font = "30px Arial";
ctx.fillText("Hello World", 0, 20);
    
     
     
    
                    

                if (entity.pos.y < match.y2) {
                    entity.pos.y = match.y2;
                    entity.vel.y = 0;

                    entity.obstruct(Sides.TOP)
                }
            }
}

export const chance = [handleX, handleY]