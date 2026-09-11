const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('./db');

const router = express.Router();
const secret = process.env.JWT_SECRET || 'giftlink-development-secret';
const tokenFor = user => jwt.sign({ id: user._id.toString(), email: user.email }, secret, { expiresIn: '2h' });

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password are required' });
  const db = await connectToDatabase();
  if (await db.collection('users').findOne({ email })) return res.status(409).json({ error: 'Email is already registered' });
  const user = { name, email, password: await bcrypt.hash(password, 10), createdAt: new Date() };
  const result = await db.collection('users').insertOne(user);
  res.status(201).json({ token: tokenFor({ ...user, _id: result.insertedId }), user: { id: result.insertedId, name, email } });
});

router.post('/login', async (req, res) => {
  const db = await connectToDatabase();
  const user = await db.collection('users').findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password || '', user.password))) return res.status(401).json({ error: 'Invalid email or password' });
  res.json({ token: tokenFor(user), user: { id: user._id, name: user.name, email: user.email } });
});

router.put('/users/:id', async (req, res) => {
  const db = await connectToDatabase();
  const updates = {};
  if (req.body.name) updates.name = req.body.name;
  if (req.body.email) updates.email = req.body.email;
  await db.collection('users').updateOne({ _id: require('mongodb').ObjectId.createFromHexString(req.params.id) }, { $set: updates });
  res.json({ message: 'User information updated' });
});

module.exports = router;
