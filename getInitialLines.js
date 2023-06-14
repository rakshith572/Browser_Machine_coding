const fs=require('fs');
const buffer=new Buffer.alloc(1024);
const start=(fileName)=>{
    return new Promise((resolve,reject)=>{
        var store=[];
        fs.open(fileName,(err,fd)=>{
            if(err){
                reject(err);
            }
            fs.read(fd,buffer,0,buffer.length,0,(err,bytes)=>{
                if(err){
                    reject(err);
                }
                const data=buffer.slice(0,bytes).toString().split("\n");
                const logs=data.slice(-10);
                logs.forEach(element => {
                    store.push(element);
                });
                resolve(store);
            });
        });
    });
}
module.exports={start};