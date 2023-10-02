// Destroy current session and go to main page

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        req.session.destroy(err => {
            res.redirect('/login');
        });
    };
};
