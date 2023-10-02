// Load a station from the database

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const RollerStationModel = requireOption(objectrepository, 'RollerStationModel');

    return function(req, res, next) {
        RollerStationModel.findOne({ _id: req.params.rollerstationid })
            .then(rollerstation => {
                if (!rollerstation) {
                    return next(new Error('Roller station not found'));
                }

                res.locals.rollerstation = rollerstation;
                return next();
            })
            .catch(err => {
                return next(err);
            });
    };
};
