// Load a station from the database

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const RollerStationModel = requireOption(objectrepository, 'RollerStationModel');
    const RollerModel = requireOption(objectrepository, 'RollerModel'); // Add RollerModel

    return function(req, res, next) {
        RollerStationModel.findOne({ _id: req.params.rollerstationid })
            .then(rollerstation => {
                if (!rollerstation) {
                    return next(new Error('Roller station not found'));
                }

                // Use RollerModel to count the number of associated rollers
                RollerModel.countDocuments({ _rental: rollerstation._id })
                    .then(count => {
                        // Set the capacity based on the count
                        rollerstation.capacity = count;
                        res.locals.rollerstation = rollerstation;
                        return next();
                    })
                    .catch(err => {
                        return next(err);
                    });
            })
            .catch(err => {
                return next(err);
            });
    };
};

