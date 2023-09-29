// Load a station from the database
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const RollerStationModel = requireOption(objectrepository, 'RollerStationModel');

    return function(req, res, next) {
        RollerStationModel.findOne({ _id: req.params.rollerstationid }, (err, rollerstation) => {
            if (err || !rollerstation) {
                return next(err);
            }

            res.locals.rollerstation = rollerstation;
            return next();
        });
    };
};