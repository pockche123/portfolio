export function createEntityLayer(entities) {
    return function drawBoundingBox(context) {
          context.strokeStyle = 'red';
        entities.forEach(entity => {
            context.beginPath();
            context.rect(
                entity.pos.x, entity.pos.y,
                entity.size.x, entity.size.y);
            context.stroke();
        });
    }
}


function createTileCandidateLayer(tileCollider) {
        const resolvedTiles = [];

    const tileResolver = tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x, y});
        return getByIndexOriginal.call(tileResolver, x, y);
    }
    return function drawTileCandidates(context) {
              context.strokeStyle = 'blue';
        resolvedTiles.forEach(({x, y}) => {
            context.beginPath();
            context.rect(
                x * tileSize,
                y * tileSize,
                tileSize, tileSize);
            context.stroke();
        });
        
        resolvedTiles.length = 0;
    }
}

export function createCollisionLayer(level) {

    const drawTileCandidates= createTileCandidateLayer(level.tileCollider)
    const drawBoundingBoxes = createEntityLayer(level.entities);

    return function drawCollision(context) {

        drawTileCandidates(context)
        drawBoundingBoxes(context)


    };
}