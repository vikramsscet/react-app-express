const express = require('express');
const fileHandler = require('./apis/filehandling');
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express....' });
  
});

app.get('/api/state', (req, res) =>{
  fileHandler("./dbfiles/someData.json").then(data=>{
    res.send(data);
  }).catch(err => {
    res.send(err);
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`));