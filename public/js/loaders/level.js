import Level from '../Level.js';
import SpriteSheet from '../SpriteSheet.js';
import { createBackgroundLayer, createSpriteLayer } from '../layers.js';
import { loadJSON } from '../loaders.js';
import { loadSpriteSheet } from '../loaders.js';
import { Matrix } from '../math.js';

export function loadLevel(name) {
    return loadJSON(`/levels/${name}.json`)
    .then(levelSpec => Promise.all([
        levelSpec,
        loadSpriteSheet(levelSpec.spriteSheet),
    ]))
    .then(([levelSpec, backgroundSprites]) => {
        const level = new Level();

        createTiles(level, levelSpec.tiles, levelSpec.patterns);

        const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level;
    });
}


function createTiles(level, tiles, patterns, offsetX=0, offsetY = 0) {

    function applyRange(tile, xStart, xLen, yStart, yLen) {
        const xEnd = xStart + xLen;
        const yEnd = yStart + yLen;
        for (let x = xStart; x < xEnd; ++x) {
            for (let y = yStart; y < yEnd; ++y) {

                const derivedX = x + offsetX
                const derivedY = y + offsetY
                if (tile.pattern) {
                    const tiles = patterns[tile.pattern].tiles;
                    createTiles(level, tiles, patterns, derivedX, derivedY)
                } else {
                    level.tiles.set(derivedX, derivedY, {
                        name: tile.name,
                        type: tile.type,
                    });
                }
            }
        }
    }

        tiles.forEach(tile => {
        tile.ranges.forEach(range => {
            if (range.length === 4) {
                const [xStart, xLen, yStart, yLen] = range;
                applyRange(tile, xStart, xLen, yStart, yLen);

            } else if (range.length === 3) {
                const [xStart, xLen, yStart] = range;
                applyRange(tile, xStart, xLen, yStart, 1);

            } else if (range.length === 2) {
                const [xStart, yStart] = range;
                applyRange(tile, xStart, 1, yStart, 1);
            }
        });
    });
}

