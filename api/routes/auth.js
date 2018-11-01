const Auth = require('../controllers/auth');

module.exports = api => {
    api.route('/user/create').post(Auth.create)
    api.route('/user/login').post(Auth.login)
};
