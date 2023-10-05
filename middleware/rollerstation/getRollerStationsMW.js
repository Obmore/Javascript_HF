//// Load roller stations from the database

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const RollerStationModel = requireOption(objectrepository, 'RollerStationModel');
    const RollerModel = requireOption(objectrepository, 'RollerModel'); // Add RollerModel

    return function(req, res, next) {
        RollerStationModel.find({})
            .then(rollerstations => {
                // Loop through each roller station
                Promise.all(rollerstations.map(async rollerstation => {
                    // Use RollerModel to count the number of associated rollers
                    const count = await RollerModel.countDocuments({ _rental: rollerstation._id });
                    // Set the capacity based on the count
                    rollerstation.capacity = count;
                }))
                .then(() => {
                    res.locals.rollerstations = rollerstations;
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