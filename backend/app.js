const express = require('express');
const cors = require('cors');
require('dotenv').config();
const giftRoutes = require('./giftRoutes');
const searchRoutes = require('./searchRoutes');
const authRoutes = require('./authRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);
app.use(express.static('frontend/dist'));
app.get('*', (_req, res) => res.sendFile(require('path').resolve('frontend/dist/index.html')));

module.exports = app;
