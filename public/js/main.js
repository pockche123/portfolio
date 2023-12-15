import Timer from './Timer.js';
import {loadLevel} from './loaders/level.js';
import {createMario} from './entities.js';
import {createCollisionLayer} from './layers.js';
import {setupKeyboard} from './input.js';
import { Vec2 } from './math.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadLevel('1-1'),
])
.then(([mario, level]) => {
    mario.pos.set(64, 64);



    console.log("mario pos: ", mario.pos)

//  level.comp.layers.push(createCollisionLayer(level));

    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo(window);

    // ['mousedown', 'mousemove'].forEach(eventName => {
    //     canvas.addEventListener(eventName, event => {
    //         if (event.buttons === 1) {
    //             mario.vel.set(0, 0);
    //             mario.pos.set(event.offsetX, event.offsetY);
    //         }
    //     });
    // });


    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

     if (mario.pos.getX() >390) {
        mario.pos.setX(0)
        
        }
        if (mario.pos.getX() < 0) {
            mario.pos.setX(390)
        }
    

        level.comp.draw(context);
    }

    timer.start();
});