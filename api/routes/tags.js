const Note = require('../controllers/tags')

module.exports = api => {
  api.route('/tags').get(Note.list)
};

