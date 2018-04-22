var fs = require('fs');

const getJsonDataFromFile = function(file){
    return new Promise((res,rej)=>{
        fs.readFile(file, function(err, data) {
            if (err){
                rej(err);
            } 
            res(JSON.parse(data));
        });
    })
    
}

module.exports = getJsonDataFromFile;