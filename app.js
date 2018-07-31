var fs = require('fs');
var TextEncoder=require("text-encoding").TextEncoder;
var d1=require("zlibjs/bin/inflate.min");
var d2=require("zlibjs/bin/deflate.min")
var exePath=process.cwd();
var compressPath=exePath;
var inputFileName=null
if (process.argv.length > 2){
    inputFileName = process.argv[2];
}

var Deflate= d2.Zlib.Deflate;
var Inflate= d1.Zlib.Inflate;

function Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
        c = array[i++];
        switch(c >> 4)
        {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
            // 0xxxxxxx
            out += String.fromCharCode(c);
            break;
            case 12: case 13:
            // 110x xxxx   10xx xxxx
            char2 = array[i++];
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
            break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }

    return out;
}

fs.readFile(inputFileName,"utf-8",function(err,fileContent){

    var byteArray=new TextEncoder().encode(fileContent);
    var deflate= new Deflate(byteArray)
    var compressed = deflate.compress();

    fs.writeFile(inputFileName+"c",compressed,function(err){
        if(err){
            console.log(err);
        }else{
            console.log("file writes sucess!!")
        }
    });
});







