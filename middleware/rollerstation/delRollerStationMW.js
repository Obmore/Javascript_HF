// Removes a station from the database

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.rollerstation === 'undefined') {
            return next();
        }
        res.locals.rollerstation.remove(err => {
            if (err) {
                return next(err);
            }
            return res.redirect('/rollerstation');
        });
    };
};