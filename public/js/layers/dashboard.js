export function createDashboardLayer(font, time) {
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