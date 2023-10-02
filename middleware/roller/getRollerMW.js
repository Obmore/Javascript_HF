// Load a roller from the database

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const RollerModel = requireOption(objectrepository, 'RollerModel');

    return function(req, res, next) {
        RollerModel.findOne({ _id: req.params.rollerid }).exec()
            .then(roller => {
                if (!roller) {
                    return next(new Error('Roller not found'));
                }
                res.locals.roller = roller;
                return next();
            })
            .catch(err => {
                return next(err);
            });
    };
};