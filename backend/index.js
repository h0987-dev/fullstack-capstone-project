const natural = require('natural');
const app = require('./app');

app.get('/api/health', (_req, res) => res.json({ status: 'ok', tokenizer: Boolean(natural.WordTokenizer) }));

if (require.main === module) app.listen(process.env.PORT || 5000, () => console.log(`GiftLink API listening on port ${process.env.PORT || 5000}`));
module.exports = app;
