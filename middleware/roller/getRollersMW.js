// Load rollers from the database
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const RollerModel = requireOption(objectrepository, 'RollerModel');

    return function(req, res, next) {
        if (typeof res.locals.rollerstation === 'undefined') {
            return next();
        }
        RollerModel.find({ _rental: res.locals.rollerstation._id })
            .then(rollers => {
                res.locals.rollers = rollers;
                return next();
            })
            .catch(err => {
                return next(err);
            });
    };
};
