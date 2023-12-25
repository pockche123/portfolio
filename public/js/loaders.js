
import { createAnim } from './anim.js';
import SpriteSheet from './SpriteSheet.js';

export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

// function createTiles(level, backgrounds) {
//     backgrounds.forEach(background => {
//         background.ranges.forEach(([x1, x2, y1, y2]) => {
//             for (let x = x1; x < x2; ++x) {
//                 for (let y = y1; y < y2; ++y) {
//                     level.tiles.set(x, y, {
//                         name: background.tile,
//                     });
//                 }
//             }
//         });
//     });
// }



export function loadJSON(url) {
    return fetch(url)
    .then(r => r.json());
}




export function loadSpriteSheet(name) {
    return loadJSON(`/sprites/${name}.json`)
        .then(sheetSpec => Promise.all([
            sheetSpec,
            loadImage(sheetSpec.imageURL),
        ]))
        .then(([sheetSpec, image]) => {
            const sprites = new SpriteSheet(
                image,
                sheetSpec.tileW,
                sheetSpec.tileH);

            if (sheetSpec.tiles) {
                sheetSpec.tiles.forEach(tileSpec => {
                    sprites.defineTile(
                        tileSpec.name,
                        tileSpec.index[0],
                        tileSpec.index[1]);
                });
            }

            if (sheetSpec.frames) {
                sheetSpec.frames.forEach(frameSpec => {
                    sprites.define(frameSpec.name, ...frameSpec.rect);
                });
            }

            if (sheetSpec.animations) {
                sheetSpec.animations.forEach(animSpec => {
                    const animation = createAnim(animSpec.frames, animSpec.frameLen);
                    sprites.defineAnim(animSpec.name, animation);
                });
            }

            console.log("loaders.js line 105, sprites: " , sprites )

            return sprites;
        })
}



