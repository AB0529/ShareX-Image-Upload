// Import
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const config = require('./config.json');

const app = express();
const port = config.port;
const upload = multer();

app.get('/api', (req, res) => {
  return res.send(`Working`);
});

app.post('/api/upload', upload.single('d'), (req, res) => {
  if (req.body.key !== config.secret)
    return res.end(`Unauthorized.`);

  fs.writeFileSync(`./Images/${req.body.name}.png`, req.file.buffer);
  return res.end(`http://localhost:${port}/Images/${req.body.name}.png`);

});

app.listen(port, () => console.log(`App listening on port ${port}`));
