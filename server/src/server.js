const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const tripRoutes = require('./routes/tripRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Security & Parsing Middleware
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'TripWise AI Backend Server' });
});

// Trip Routes Registration
app.use('/api/trips', tripRoutes);

// Global 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Endpoint ${req.originalUrl} not found.`,
    },
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Exception:', err);
  res.status(500).json({
    success: false,
    error: {
      code: 'SERVER_ERROR',
      message: 'An unexpected internal server error occurred.',
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 TripWise AI Backend Server running on http://localhost:${PORT}`);
});
