// this one is used for loading image
import Level from './Level.js'
import { createBackgroundLayer, createSpriteLayer } from './layers.js'
import { loadBackgroundSprites } from './Sprites.js'
import SpriteSheet from './SpriteSheet.js'
import { createAnim } from '../utilities/anim.js'

export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image()
        image.addEventListener('load', () => {
            resolve(image)
        })
        image.src = url
    })
}

function createTiles(level, backgrounds) {
    backgrounds.forEach(background => {
        background.ranges.forEach(([x1, x2, y1, y2]) => {
            for (let x = x1; x < x2; ++x) {
                for (let y = y1; y < y2; ++y) {
                    level.tiles.set(x, y, {
                        name: background.tile
                    })
                }
            }
        })
    })
}

// loads json and background
export function loadLevel(name) {
    return Promise.all([
        fetch(`/levels/${name}.json`).then(r => r.json()),
        loadBackgroundSprites()
    ]).then(([levelSpec, backgroundSprites]) => {
        const level = new Level()

        createTiles(level, levelSpec.backgrounds)

        const backgroundLayer = createBackgroundLayer(level, backgroundSprites)
        level.comp.layers.push(backgroundLayer)

        const spriteLayer = createSpriteLayer(level.entities)
        level.comp.layers.push(spriteLayer)

        // console.table(level.tiles.grid)
        return level
    })
}
// function loadJSON(url) {
//     return fetch(url)
//     .then(r => r.json());
// }

// export function loadSpriteSheet(name) {
//     return loadJSON(`/sprites/${name}.json`)
//     .then(sheetSpec => Promise.all([
//         sheetSpec,
//         loadImage(sheetSpec.imageURL),
//     ]))
//     .then(([sheetSpec, image]) => {
//         const sprites = new SpriteSheet(
//             image,
//             sheetSpec.tileW,
//             sheetSpec.tileH);

//         if (sheetSpec.tiles) {
//             sheetSpec.tiles.forEach(tileSpec => {
//                 sprites.defineTile(
//                     tileSpec.name,
//                     tileSpec.index[0],
//                     tileSpec.index[1]);
//             });
//         }

//         if (sheetSpec.frames) {
//             sheetSpec.frames.forEach(frameSpec => {
//                 sprites.define(frameSpec.name, ...frameSpec.rect);
//             });
//         }

//         if (sheetSpec.animations) {
//             sheetSpec.animations.forEach(animSpec => {
//                 const animation = createAnim(animSpec.frames, animSpec.frameLen);
//                 sprites.defineAnim(animSpec.name, animation);
//             });
//         }

//         return sprites;
//     });
// }

