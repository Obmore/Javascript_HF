// Using POST params update or save a rollerstation to the database
// If res.locals.rollerstation is there, it's an update otherwise
// this middleware creates an entity
// Redirects to /rollerstation after success

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const RollerStationModel = requireOption(objectrepository, 'RollerStationModel');

    return function(req, res, next) {
        if (
            typeof req.body.address === 'undefined' ||
            typeof req.body.id === 'undefined' ||
            typeof req.body.capacity === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.rollerstation === 'undefined') {
            res.locals.rollerstation = new RollerStationModel();
        }

        res.locals.rollerstation.address = req.body.address;
        res.locals.rollerstation.id = req.body.id;
        res.locals.rollerstation.capacity = req.body.capacity;

        res.locals.rollerstation
            .save()
            .then(() => {
                return res.redirect('/rollerstation');
            })
            .catch(err => {
                return next(err);
            });
    };
};








