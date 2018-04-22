var mongoApi = require('./apis/MongoDBOperations');
const fileHandler = require('./apis/filehandling');
function setup(){
    var con = mongoApi.createConnection();
    var dbobj;
    return new Promise((res,rej)=>{
        con.getConnection().then(dbo=>{
            dbobj = dbo;
            return mongoApi.readCollection(dbo, "navigation");
        }).then(navData=>{
            if(navData){
                con.closeConnection();
                return Promise.reject();
            }else{
                return fileHandler("./dbfiles/someData.json");
            }
        }).then(data => {
            console.log(data);
            console.log(dbobj);
            return mongoApi.writeToCollection(dbobj, "navigation", data);
        }).then(response=>{
            con.closeConnection();
            res(response);
        }).catch(err=>{
            con.closeConnection();
            rej(err);
        })
    });      
}
module.exports = function(grunt) {

    grunt.log.write('Hello world! Welcome to grunt....!!\n');
    grunt.registerTask('initialSetup', function(){
        var done = this.async();
        try{
            setup().then(d => {
                done();
            }).catch(err=>{
                console.log("err---> ",err);
                done();
            })
        }catch(err){
            console.log(err);
        }
    });
};