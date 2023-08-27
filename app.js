const express=require('express');
const app=express();
const http=require('http');
const server =http.createServer(app);
const {start}=require('./getInitialLines');
const fileName="logs.log";

const io=require('socket.io')(server);
const {socket}=require('socket.io');

const fs=require('fs');
const buffer=new Buffer.alloc(1024);

const events=require('events');
const eventEmitter=new events.EventEmitter;

const path=require('path');
app.get('/log',(req,res)=>{
    res.sendFile('./client/index.html',{root:path.join(__dirname)});
});

io.on('connection',(socket)=>{
    start(fileName).then(ele=>{
        var store=ele;
        socket.emit('log-receive',ele);
        fs.watchFile(fileName,{"interval":1000},(curr,prev)=>{
            fs.open(fileName,(err,fd)=>{
                if(err){
                    console.log(err);
                }
                fs.read(fd,buffer,0,buffer.length,prev.size,(err,bytes)=>{
                    if(err){
                        console.log(err);
                    }
                    const data=buffer.slice(0,bytes).toString().split("\n");
                    const logs=data.slice(1);
                    logs.forEach(element => {
                        if(store.length==10){
                            store.shift();
                        }
                        store.push(element);
                    });
                    eventEmitter.emit('log-update',store);
                });
            });
        });
    });
    eventEmitter.on('log-update',(ele)=>{
        socket.emit('log-receive',ele);
    });
});
const port=5000;
server.listen(port,()=>{
    console.log(`server listening at port ${port}`);
});