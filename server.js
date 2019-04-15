// Import
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const config = require('./config.json');

// Initialize
const app = express();
const port = 3e3;
const upload = multer();

// Routs
app.get('/api', (req, res) => {
  return res.back(`localhost`);
});

app.post(`/api/upload`, upload.single('d'), (req, res) => {
  let key = req.body.key;
  let name = req.body.name;

  // Check secret
  if (key !== config.secret)
    return res.end(`Unauthorized.`);
  // Upload file
  fs.writeFileSync(`${config.path}/${name}.png`, req.file.buffer);
  return res.end(`${config.url}/${name}.png`);
});
