const express = require('express');
var mongoApi = require('./apis/MongoDBOperations');
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express....' });
  
});

app.get('/api/state', (req, res) =>{
  var con = mongoApi.createConnection();
  con.getConnection().then(dbo=>{
    return mongoApi.readCollection(dbo, "navigation");
  }).then(navData=>{
    con.closeConnection();
    res.send(navData);
  }).catch(err=>{
    res.send(err);
  });
});
app.post('/api/user/add',(req,res)=>{
  var body = '';
        req.on('data', function (data) {
            body += data;
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) { 
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                request.connection.destroy();
            }
        });
        req.on('end', function () {
            var formData = JSON.parse(body);
            var con = mongoApi.createConnection();

            async function f(){
                let promise = new Promise((resolve, reject)=>{
                    var dbObj;
                    con.getConnection().then(dbo=>{
                      dbObj = dbo;
                      return mongoApi.readCollection(dbo,'user',"email",formData.email);
                    }).then(data=>{
                      
                      if(data==null){
                        resolve(mongoApi.writeToCollection(dbObj, "user", formData));
                      }else{
                        resolve(data);
                      }
                    }).catch(err=>{
                      reject(err);
                    });
                });
                let result = await promise;
                res.send(result);
            }
            f();
        });
})

app.listen(port, () => console.log(`Listening on port ${port}`));