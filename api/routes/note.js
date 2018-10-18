const Note = require('../controllers/note')

module.exports = api => {
    api.route('/note/:tag').get(Note.get)
    api.route('/note/').post(Note.post)
    api.route('/note/:tagid').put(Note.put)
    api.route('/note/:tagid').delete(Note.delete)
};
