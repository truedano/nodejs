const path = require('path');
const fs = require('fs');
const QRCode = require('magic-qr-code');
const Canvas = require('canvas');
const show_size=240;

module.exports = function(){
    this.stringToQrcode = function(string){
        return QRCode.encode(string);
    };

    this.draw = function(data, size = show_size) {
        let marginSize = 1;
        let dataLength = data.length;
        let dataLengthWithMargin = dataLength + 2 * marginSize;
        let canvas = Canvas.createCanvas(size, size);
        let ctx = canvas.getContext('2d');
        let pointSize = Math.floor(size / dataLengthWithMargin);
        if (pointSize === 0) {
            throw new Error('cannot draw this QR Code');
        }
        let margin = Math.floor((size - (pointSize * dataLength)) / 2);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = 'black';
        for (let i = 0; i < dataLength; ++i) {
            for (let j = 0; j < dataLength; ++j) {
                if (data[i][j]) {
                    let x = j * pointSize + margin;
                    let y = i * pointSize + margin;
                    ctx.fillRect(x, y, pointSize, pointSize);
                }
            }
        }
        return canvas;
    };

    this.ouputFile = function(canvas,filename){
        var dirname = path.dirname(filename);
        if (fs.existsSync(dirname)) {
            console.log(dirname+' exist.');
        }else{
            fs.mkdirSync(dirname);
        }
        let pngBuffer = canvas.toBuffer();
        fs.writeFileSync(filename, pngBuffer);
    };
};
