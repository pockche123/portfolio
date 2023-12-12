import Entity from '../helper/Entity.js';
import Jump from '../traits/Jump.js';
import { loadMarioSprite } from '../helper/Sprites.js';
import Go from '../traits/Go.js';
import { createAnim } from './anim.js';
// import { loadSpriteSheet } from '../helper/loaders.js';
export function createMario() {
    return loadMarioSprite()
    .then(sprite => {
        const mario = new Entity();

        mario.addTrait(new Go());
        mario.addTrait(new Jump());

        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        }

        return mario;
    });
}


// export function createMario() {
//     return loadSpriteSheet('mario')
//     .then(sprite => {
//         const mario = new Entity();
//         mario.size.set(14, 16);

//         mario.addTrait(new Go());
//         mario.addTrait(new Jump());
//         //mario.addTrait(new Velocity());
//    const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 10);
//         function routeFrame(mario) {
//             if (mario.go.dir !== 0) {
//                 return runAnim(mario.go.distance);
//             }

//             return 'idle';
//         }

//         mario.draw = function drawMario(context) {
//             sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
//         }

//         return mario;
//     });
// }