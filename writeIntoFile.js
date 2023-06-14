const fs=require('fs');

var count=1;
const fileName="logs.log";
// fs.writeFile(fileName,""+count,(err)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log("log added to file");
// });
// count++;
setInterval(()=>{
    fs.appendFile(fileName,"\n"+count,(err)=>{
        if(err){
            console.log(err);
        }
        console.log("log added to the file");
    });
    count++;
},1000);