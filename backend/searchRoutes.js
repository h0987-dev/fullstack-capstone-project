const express = require('express');
const { connectToDatabase } = require('./db');
const router = express.Router();

router.get('/', async (req, res) => {
  const db = await connectToDatabase();
  const query = (req.query.q || '').trim();
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (query) filter.$or = [{ title: { $regex: query, $options: 'i' } }, { description: { $regex: query, $options: 'i' } }];
  res.json(await db.collection('gifts').find(filter).toArray());
});
module.exports = router;
