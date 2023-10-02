//// Load roller stations from the database
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const RollerStationModel = requireOption(objectrepository, 'RollerStationModel');

    return function(req, res, next) {
        RollerStationModel.find({})
            .then(rollerstations => {
                res.locals.rollerstations = rollerstations;
                return next();
            })
            .catch(err => {
                return next(err);
            });
    };
};