const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'portfolio')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'portfolio', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Codefusion portfolio running on http://0.0.0.0:${PORT}`);
});
