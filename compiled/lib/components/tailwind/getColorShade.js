var shades = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];
export default (function (color, offset) {
    if (offset === void 0) { offset = 1; }
    if (!color) {
        return false;
    }
    if (offset === 0)
        return color;
    var currentColor = color === 'white' ? ['gray', '100'] : color.split('-');
    var shadeOffset = offset;
    if (color === 'white') {
        if (shadeOffset < 1)
            return color;
        if (shadeOffset === 1)
            return 'gray-100';
        currentColor = ['gray', '100'];
        if (typeof shadeOffset === 'number')
            shadeOffset = offset - 1;
    }
    if (currentColor.length === 1) {
        currentColor.push('400');
    }
    if (typeof shadeOffset === 'string') {
        return currentColor[0] + "-" + shadeOffset;
    }
    var shadeIndex = Math.min(Math.max(shades.indexOf(currentColor[1]) + shadeOffset, 0), shades.length - 1);
    var newShade = shades[shadeIndex];
    return currentColor[0] + "-" + newShade;
});
//# sourceMappingURL=getColorShade.js.map