import Entity from './Entity.js';
import Go from './traits/Go.js';
import Jump from './traits/Jump.js';
import Velocity from './traits/Velocity.js';
import { loadMarioSprite } from './sprites.js';
import { loadSpriteSheet } from './loaders.js';
import { createAnim } from './anim.js';

export function createMario() {
    return loadSpriteSheet('mario')
    .then(sprite => {
        const mario = new Entity();
        mario.size.set(14, 16);

        mario.addTrait(new Go());
        mario.addTrait(new Jump());

        const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 10);

        function routeFrame(mario) {
            if (mario.go.dir !== 0) {
                return runAnim(mario.go.distance)
            }
            return 'idle'
        }

        mario.draw = function drawMario(context) {
            sprite.draw(routeFrame(this), context, this.pos.x, this.pos.y, mario.go.dir <0 );
        }

        return mario;
    });
}


// export function createMario() {
//     return loadMarioSprite()
//     .then(sprite => {
//         const mario = new Entity();
//         mario.size.set(14, 16);

//         mario.addTrait(new Go());
//         mario.addTrait(new Jump());
//         //mario.addTrait(new Velocity());

//         mario.draw = function drawMario(context) {
//             sprite.draw('idle', context, this.pos.x, this.pos.y);
//         }

//         return mario;
//     });
// }