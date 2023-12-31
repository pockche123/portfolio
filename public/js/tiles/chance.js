import { Sides } from "../Entity.js";


export function createDashboardLayer(font) {
    // const LINE1 = font.size;
    const LINE2 = font.size * 2;
    const LINE1 = font.size * 12;
    const LINE1b = font.size * 14;

    const coins = 13;
    const score = 24500;


    return function drawDashboard(context) {
        //  const { time } = playerEnv.playerController;

        // font.print('EDUCATION', context, 25, LINE1);
        // font.print('SKILLS', context, 125, LINE1b);
        // font.print(score.toString().padStart(6, '0'), context, 16, LINE2);

        // font.print('@x' + coins.toString().padStart(2, '0'), context, 96, LINE2);

        // font.print('WORLD', context, 152, LINE1);
        // font.print('1-1', context, 160, LINE2);

        // font.print('TIME', context, 208, LINE1);
        // font.print(time.toFixed().toString().padStart(3, '0'), context, 216, LINE2);
    };
}

function handleX(entity, match) {
    if (entity.vel.x > 0) {
        if (entity.pos.x + entity.size.x > match.x1) {
            entity.pos.x = match.x1 - entity.size.x;
            entity.vel.x = 0;
        }
    } else if (entity.vel.x < 0) {
        if (entity.pos.x < match.x2) {
            entity.pos.x = match.x2;
            entity.vel.x = 0;
        }
    }
}

function handleY(entity, match) {
    if (entity.vel.y > 0) {
        if (entity.pos.y + entity.size.y > match.y1) {
            entity.pos.y = match.y1 - entity.size.y;
            entity.vel.y = 0;

            entity.obstruct(Sides.BOTTOM)
        }
    } else if (entity.vel.y < 0) {


        console.log("Colliding with chance from below", match)

        const chance1 = {
            x1: 48,
            x2: 64,
            y1: 128,
            y2: 144
        }

        const chance2 = {
            x1: 144, x2: 160, y1: 128, y2: 144
        }
        const chance3 = {
            x1: 192, x2: 208, y1: 128, y2: 144
        }

        const chance4 = {
            x1: 240, x2: 256, y1: 128, y2: 144
        }
        const chance5 = {
            x1: 192, x2: 208, y1: 64, y2: 80
        }

        if (match.x1 == chance1.x1 && match.x2 == chance1.x2 && match.y1 == chance1.y1) {
            const link = document.getElementById('about-link');
            link.style.display = (link.style.display === 'block') ? 'none' : 'block';

        }

        if (match.x1 == chance2.x1 && match.x2 == chance2.x2 && match.y1 == chance2.y1) {
            const link = document.getElementById('education-link');
            link.style.display = (link.style.display === 'block') ? 'none' : 'block';

        }
        if (match.x1 >= 190 && match.x2 == chance3.x2 && match.y1 == chance3.y1) {

            const link = document.getElementById('portfolio-link');
            link.style.display = (link.style.display === 'block') ? 'none' : 'block';

        }

        if (match.x1 == chance4.x1 && match.x2 == chance4.x2 && match.y1 == chance4.y1) {
            const link = document.getElementById('skills-link');
            link.style.display = (link.style.display === 'block') ? 'none' : 'block';

        }

        if (match.x1 == chance5.x1 && match.x2 == chance5.x2 && match.y1 == chance5.y1) {
            const link = document.getElementById('socials-link');
            link.style.display = (link.style.display === 'block') ? 'none' : 'block';

        }






        if (entity.pos.y < match.y2) {
            entity.pos.y = match.y2;
            entity.vel.y = 0;

            entity.obstruct(Sides.TOP)
        }
    }
}





export const chance = [handleX, handleY]