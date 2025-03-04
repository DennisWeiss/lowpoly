// Helpers

/**
 * generate a unique ID of specified length
 * @param {number} length length of id
 */
export function uuid(length = 6) {
    let charCodes = [];
    let string = '';

    for (let i = 0; i < 10; i++) {
        charCodes.push(48 + i);
        charCodes.push(97 + i);
    }
    for (let i = 0; i < 16; i++) {
        charCodes.push(107 + i);
    }

    for (let i = 0; i < length; i++) {
        let charIndex = Math.floor(Math.random() * charCodes.length);
        string = string + String.fromCharCode(charCodes[charIndex]);
    }

    return string;
}

/**
 * create a copy of a primitive
 * @param {any} obj 
 */
export const clone = function(obj) {
    if (typeof obj === 'object') {
        return Object.assign({}, obj);
    }
    else if (typeof obj === 'array') {
        return obj.slice();
    }
    return obj;
    
};

/**
 * By Ken Fyrstenberg Nilsen
 *
 * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
 *
 * If image and context are only arguments rectangle will equal canvas
*/
export function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill    
    if (nw < w) ar = w / nw;                             
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}