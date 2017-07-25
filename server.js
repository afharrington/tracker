const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;

const app = express();
app.use(express.static(__dirname + '/public'));

app.use('*', (req, res) => {
   res.sendFile(__dirname + '/public/index.html');
});

app.listen(port);
console.log('Server started');
