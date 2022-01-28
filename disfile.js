//jshint esversion:6

// module.exports = read;
const fs = require('fs');
const path = require('path');
// EXTENSION='.mp4';
EXTENSION=['.mp4','.txt','.webm'];
// const dirPath = path.join(__dirname);
// var files;

// fs.readdirSync(dirPath,(err,file)=>{
//     files=file;
//     console.log(files);
// });
// console.log("a" + files);
module.exports = function (){
    files =  fs.readdirSync('C:\\Users\\twinkle\\Downloads');
    const targetFiles = files.filter(file => {
        // return path.extname(file).toLowerCase() === EXTENSION;
        return EXTENSION.includes(path.extname(file).toLowerCase());
    });
    // console.log(targetFiles);
    return targetFiles;
}
