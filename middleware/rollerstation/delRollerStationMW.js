// Removes a station from the database

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const RollerStationModel = requireOption(objectrepository, 'RollerStationModel');
    const RollerModel = requireOption(objectrepository, 'RollerModel');

    return function(req, res, next) {
        if (typeof res.locals.rollerstation === 'undefined') {
            return next();
        }

        // Delete rollers
        RollerModel.deleteMany({ _rental: res.locals.rollerstation._id })
            .then(() => {
                // Delete station
                return RollerStationModel.findOneAndDelete({ _id: res.locals.rollerstation._id });
            })
            .then(() => {
                return res.redirect('/rollerstation');
            })
            .catch(err => {
                return next(err);
            });
    };
};
