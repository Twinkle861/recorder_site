//jshint esversion:6
let fs = require('fs');  //filesystem
const express = require('express');
// const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const files = require(__dirname+"/disfile.js") //__dirname gives the full path of the directory

var name="";
var playfilenme="";
const path="C:\\Users\\twinkle\\Downloads"; //from where to load videos
//C;//user//twinkle
// console.log(process.env.OneDrive);
// const text = process.env.PATH; //path
// const myArray = text.split(";");
// console.log(myArray.indexOf('C:\\Users'));
// console.log(process.env.PATH);//display path

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.use(express.static(__dirname + '/public'));

// console.log(files());

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    name = req.body.name.trim();
    res.redirect("/login");
});

app.get("/login",function(req,res){
    var filename = files();
    // res.send("hey "+ name);
    res.render('frontPage',
                {nme:name,
                 file:filename   
            })
});

app.post("/delete",function(req,res){
    const delname = req.body.filename;
    // console.log(delname);
    const filenme=path+"\\"+delname;
    fs.rm(filenme, { recursive:true }, (err) => {
        if(err){
            // File deletion failed
            console.error(err.message);
            return;
        }
        console.log("File deleted successfully");
    })
    res.redirect("/login");
});

app.post("/play",function(req,res){
    const delname = req.body.filename;
    playfilenme=path+"\\"+delname;
    // const filenme1="C:\\Users\\twinkle\\Videos\\Captures\\abc.mp4";
    console.log(delname);
    res.render('play',{
        file:playfilenme
    });

});

app.get('/play', function(req, res) {
    var ext=playfilenme.split('.').pop();
    // console.log(ext);   

    const path = playfilenme;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/${ext}',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/${ext}',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
  });

app.listen(3000,function(){
    console.log("server started");
});