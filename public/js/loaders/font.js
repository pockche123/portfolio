



export function loadFont() {
    return loadImage('./img/font.png')
    .then(image => {
        const fontSprite = new SpriteSheet(image);

        return fontSprite;

        // const size = 8;
        // const rowLen = image.width;
        // for (let [index, char] of [...CHARS].entries()) {
        //     const x = index * size % rowLen;
        //     const y = Math.floor(index * size / rowLen) * size;
        //     fontSprite.define(char, x, y, size, size);
        // }

        // return new Font(fontSprite, size);
    });
}
