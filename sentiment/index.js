const natural = require('natural');

const tokenizer = new natural.WordTokenizer();

function tokenizeSentimentText(text) {
  return tokenizer.tokenize(text || '');
}

module.exports = { tokenizeSentimentText };
