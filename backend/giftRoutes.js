const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('./db');

const router = express.Router();
router.get('/', async (req, res) => {
  const db = await connectToDatabase();
  const filter = req.query.category ? { category: req.query.category } : {};
  res.json(await db.collection('gifts').find(filter).sort({ createdAt: -1 }).toArray());
});
router.get('/:id', async (req, res) => {
  const db = await connectToDatabase();
  const gift = await db.collection('gifts').findOne({ _id: new ObjectId(req.params.id) });
  if (!gift) return res.status(404).json({ error: 'Gift not found' });
  res.json(gift);
});
router.post('/:id/comments', async (req, res) => {
  const db = await connectToDatabase();
  const comment = { author: req.body.author || 'Guest', text: req.body.text, createdAt: new Date() };
  await db.collection('gifts').updateOne({ _id: new ObjectId(req.params.id) }, { $push: { comments: comment } });
  res.status(201).json(comment);
});
module.exports = router;
