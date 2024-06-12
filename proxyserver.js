const express = require('express');
const https = require('https');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const checkUrlAccessibility = (url, callback) => {
  https.get(url, (res) => {
    if (res.statusCode >= 200 && res.statusCode < 400) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  }).on('error', (err) => {
    callback(err);
  });
};

app.get('/', (req, res) => {
  res.send('Hello from URL Status Server!');
});

app.post('/check-url', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  checkUrlAccessibility(url, (error, isAccessible) => {
    if (error) {
      return res.status(500).json({ error: 'Error checking accessibility' });
    }
    res.json({ url, isAccessible });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the app instance

