//// Load roller stations from the database
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const RollerStationModel = requireOption(objectrepository, 'RollerStationModel');

    return function(req, res, next) {
        RollerStationModel.find({}, (err, rollerstation) => {
            if (err) {
                return next(err);
            }
            res.locals.rollerstation = rollerstation;
            return next();
        });
    };
};