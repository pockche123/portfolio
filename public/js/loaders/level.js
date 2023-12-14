import Level from '../Level.js'
import SpriteSheet from '../SpriteSheet.js'
import { createBackgroundLayer, createSpriteLayer } from '../layers.js'
import { loadJSON } from '../loaders.js'
import { loadSpriteSheet } from '../loaders.js'
import { Matrix } from '../math.js'

export function loadLevel(name) {
    return loadJSON(`/levels/${name}.json`)
        .then(levelSpec =>
            Promise.all([levelSpec, loadSpriteSheet(levelSpec.spriteSheet)])
        )
        .then(([levelSpec, backgroundSprites]) => {
            const level = new Level()

            for (const {tile, x, y} of expandTiles(levelSpec.tiles, levelSpec.patterns)) {
                level.tiles.set(x, y, {
                    name: tile.name,
                    type: tile.type,
                })
            }

            const backgroundLayer = createBackgroundLayer(level, backgroundSprites)
            level.comp.layers.push(backgroundLayer)

            const spriteLayer = createSpriteLayer(level.entities)
            level.comp.layers.push(spriteLayer)

            return level
        })
}

function* expandSpan(xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen
    const yEnd = yStart + yLen
    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
            yield { x, y }
        }
    }
}

function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range
        return expandSpan(xStart, xLen, yStart, yLen)
    } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range
        return expandSpan(xStart, xLen, yStart, 1)
    } else if (range.length === 2) {
        const [xStart, yStart] = range
        return expandSpan(xStart, 1, yStart, 1)
    }
}

function* expandRanges(ranges) {
    for (const range of ranges) {
        for (const item of expandRange(range)) {
            yield item
        }
    }
}

function expandTiles(tiles, patterns) {
    const expandedTiles = []
    function walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {
            for (const { x, y } of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX
                const derivedY = y + offsetY

                if (tile.pattern) {
                    const tiles = patterns[tile.pattern].tiles
                    walkTiles(tiles, derivedX, derivedY)
                } else {
                    expandedTiles.push({
                        tile, 
                        x: derivedX,
                        y: derivedY
                    })
                }
            }
        }
    }
    walkTiles(tiles, 0, 0)

    return expandedTiles;
}
