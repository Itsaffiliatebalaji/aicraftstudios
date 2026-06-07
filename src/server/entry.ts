import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (client build)
app.use(express.static(path.join(__dirname, '../dist/client')));

// Simple API endpoint
app.post('/api/contact', (req, res) => {
  res.json({ success: true, message: 'Inquiry submitted successfully' });
});

// Serve index.html for all other routes (SPA fallback)
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../dist/client/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not found');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
