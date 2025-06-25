document.addEventListener("DOMContentLoaded", function () {
    const colorPicker = document.getElementById('box');
    const rgbInput = document.getElementById('rgb');
    const hslInput = document.getElementById('hsl');
    const hexInput = document.getElementById('hex');

    colorPicker.addEventListener('input', function () {
        const color = colorPicker.value.toUpperCase();
        hexInput.value = hexToFormattedHex(color);
        rgbInput.value = hexToRgb(color);
        hslInput.value = hexToHsl(color);
    });

    function hexToFormattedHex(hex) {
        return `HEX (${hex})`;
    }

    function hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return `RGB (${r}, ${g}, ${b})`;
    }

    function hexToHsl(hex) {
        let r = 0, g = 0, b = 0;
        if (hex.length == 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length == 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max == min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        h = Math.round(h * 360);
        s = Math.round(s * 100);
        l = Math.round(l * 100);
        return `HSL (${h}, ${s}%, ${l}%)`;
    }
});
