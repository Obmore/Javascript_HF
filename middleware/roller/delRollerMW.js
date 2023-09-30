
// Removes a roller from the database, the entity used here is: res.locals.roller
// Redirects to /roller/:rollerstation_id after delete

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.roller === 'undefined') {
            return next();
        }
        res.locals.roller.remove(err => {
            if (err) {
                return next(err);
            }
            return res.redirect(`/roller/${res.locals.rollerstation._id}`);
        });
    };
};