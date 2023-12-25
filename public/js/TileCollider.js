import TileResolver from './TileResolver.js';
import { Sides } from './Entity.js';
import { ground } from './tiles/ground.js';
import { chance } from './tiles/chance.js';

const handlers = {
    ground,
    chance
}



export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }

    checkX(entity) {
        let x;
        if (entity.vel.x > 0) {
            x = entity.pos.x + entity.size.x;
        } else if (entity.vel.x < 0) {
            x = entity.pos.x;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(
            x, x,
            entity.pos.y, entity.pos.y + entity.size.y);

        matches.forEach(match => {
         
            if (match.tile.type !== 'ground' && match.tile.type !== 'chance') {
                return;
            }
           this.handle(0, entity, match)
       
        });
    }
    checkY(entity) {
        let y;
        if (entity.vel.y > 0) {
            y = entity.pos.y + entity.size.y;
        } else if (entity.vel.y < 0) {
            y = entity.pos.y;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            y, y);

        matches.forEach(match => {
            if (match.tile.type !== 'ground'  && match.tile.type !== 'chance') {
                return;
            }
            this.handle(1, entity, match)

        });
    }

    handle(index, entity, match) {
        const handler = handlers[match.tile.type]; 
        if (handlers) {
            handler[index](entity, match)
        }
    }


}
