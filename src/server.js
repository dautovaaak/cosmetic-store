const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/registration', (req, res) => {
  const { username, password } = req.body;

  res.json({ message: 'User registered successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
