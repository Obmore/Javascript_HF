// Check the password (from POST), if it's the right one, create a session for the user and redirect to /rollerstation
// if the password is wrong, pass down a 'error' key on res.locals to indicate error

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof req.body.password === 'undefined') {
            return next();
        }

        if (typeof req.body.username === 'undefined') {
            return next();
        }

        if (req.body.password == 'segway' && req.body.username == 'Roller') {
            req.session.belepve = true;
            return req.session.save(err => res.redirect('/rollerstation'));
        }

        res.locals.error = 'Invalid username or password!';
        return next();
    };
};
