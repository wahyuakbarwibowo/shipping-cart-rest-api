const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Shipping Cart');
});

app.listen(port, () => {
  console.log(`Shipping Cart API running at http://localhost${port}`);
});