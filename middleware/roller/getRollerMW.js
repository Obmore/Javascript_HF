// Load a roller from the database using the :rollerid param

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const RollerModel = requireOption(objectrepository, 'RollerModel');

    return function(req, res, next) {
        RollerModel.findOne(
            {
                _id: req.params.rollerid
            },
            (err, roller) => {
                if (err || !roller) {
                    return next(err);
                }
                res.locals.roller = roller;
                return next();
            }
        );
    };
};