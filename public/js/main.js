import {  loadLevel } from "./helper/loaders.js";
import {loadBackgroundSprites } from "./helper/Sprites.js";
import { createMario } from "./utilities/createEntities.js";
import Timer from "./helper/timer.js";
import Keyboard from "./helper/KeyboardState.js";
import { createCollisionLayer } from "./helper/layers.js";
import { setupKeyboard } from "./helper/input.js";

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d');



Promise.all([
    createMario(),
    loadLevel('1-1'),
])
    .then(([mario, level]) => {

      
          mario.pos.set(64, 180)
        //   mario.pos.set(64, 64);


        
    level.comp.layers.push(createCollisionLayer(level));

    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo(window);

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                mario.vel.set(0, 0);
                mario.pos.set(event.offsetX, event.offsetY);
            }
        });
    });
        
         canvas.addEventListener('contextmenu', event => {
        event.preventDefault();
    });


    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        level.comp.draw(context);
    }

    timer.start();

    //     level.entities.add(mario)

        
    // const SPACE = 32;
    // const input = new Keyboard();
    // input.addMapping(SPACE, keyState => {
    //     if (keyState) {
    //         mario.jump.start();
    //     } else {
    //         mario.jump.cancel();
    //     }
    // });
    //     input.listenTo(window);
        
    //     ['mousedown', 'mousemove'].forEach(eventName => {
    //         canvas.addEventListener(eventName, event => {
    //             if (event.buttons === 1) {
    //                 mario.vel.set(0, 0)
    //                 mario.pos.set(event.offsetX, event.offsetY)
    //             }
    //         })
    //     })


    //     const timer = new Timer(1 / 60)
    //     timer.update = function update(deltaTime) {
    //         level.comp.draw(context)
    //         level.update(deltaTime)
    //             // comp.draw(context)
    //             // mario.update(deltaTime)
    //             mario.vel.y += gravity * deltaTime
           
    //     }
    //     timer.start()
    })

