var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var database = "vikramTempDB";
function createConnection(){
    var db, dbo;
    return {
        getConnection(){
            if(!dbo){
                return new Promise((res,rej)=>{
                    MongoClient.connect(url, function(err, db) {
                        db = db;
                        if (err){
                            rej(err);
                        }
                        dbo = db.db(database);
                        res(dbo);
                    });
                });
            }
            return Promise.resolve(dbo);
        },
        closeConnection(){
            if(db){
                db.close();
            }
        }
    }
}
function readCollection(dbo, collection, property, value){
    var query = {};
    if(property && value){
        query[`${property}`] = value;
    }
    return new Promise((res,rej)=>{
        dbo.collection(collection).findOne(query, function(err, result) {
            if (err){
                rej(err);
            }
            res(result);
        });
    });
}
function readAllDataFromCollection(dbo, collection){
    return new Promise((res,rej)=>{
        dbo.collection(collection).find({}).toArray(function(err, result) {
            if (err){
                rej(err);
            }
            res(result);
        });
    });
}

function writeToCollection(dbo, collectionName, data){
    console.log("collectionName-->",collectionName);
    return new Promise((resolve, reject)=>{
        dbo.collection(collectionName).insertOne(data, function(err, res) {
            if (err) {
                reject(err);
            }
            resolve(`User ${data.fName} added successfully...`);
        });
    });
}
function deleteBy(dbo, collectionName, property, value){
    console.log("property :- ", property, " value :- ",value)
    var query = { [`${property}`]: value};
    console.log("query : ",query);
    return new Promise((res,rej)=>{
        dbo.collection(collectionName).deleteOne(query, function(err, result) {
            if (err){
                console.log("err--->",err);
                rej(err);
            }
            res(result);
        });
    });
}

module.exports = {
    createConnection,
    readCollection,
    readAllDataFromCollection,
    writeToCollection,
    deleteBy
}