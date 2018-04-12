var fs = require('fs');

const getJsonDataFromFile = function(file){
    return new Promise((res,rej)=>{
        fs.readFile(file, function(err, data) {
            if (err){
                rej(err);
            } 
            console.log(JSON.parse(data));
            res(JSON.parse(data));
        });
    })
    
}

module.exports = getJsonDataFromFile;