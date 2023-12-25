import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';

export function loadMarioSprite() {
    return loadImage('/img/characters.gif')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.define('idle', 276, 44, 16, 16);
        return sprites;
    });
}

// export function loadBackgroundSprites() {
//     return loadImage('/img/tiles.png')
//     .then(image => {
//         const sprites = new SpriteSheet(image, 16, 16);
//         sprites.defineTile('ground', 0, 0);
//         sprites.defineTile('sky', 3, 23);
//         return sprites;
//     });
// }

// export function loadBackgroundSprites() {
//  return loadImage('/img/tiles.png')
//         .then(image => {
//             const sprites = new SpriteSheet(image, 16, 16);
//             // this is used to define where the ground and sky is on the tiles.png
//             sprites.defineTile('ground', 0, 0)
//             sprites.defineTile('sky', 3, 21)
//             sprites.defineTile('chance', 24, 0)
//             return sprites;
//         })
// }

