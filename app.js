const express=require("express");
const fs=require("fs");

const path=require("path");
const port=80;
const app=express();
const http=require('http').createServer(app);

const bodyparser=require("body-parser")

const { checkServerIdentity } = require("tls");
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded());


app.set('view engine' ,'ejs');
app.set('views' ,path.join(__dirname ,'views'));

app.get('/',(req,res)=>{
    res.render('index.ejs');
})

const io=require('socket.io')(http);

io.on('connection',(socket)=>{
    socket.on('message', (data)=>{
        socket.broadcast.emit('message_broadcast',data)
    });
    console.log('a user connected....');
});



http.listen(port,()=>{
    console.log('the connection is working');
});
