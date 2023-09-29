/**
 * Using POST params update or save a rollerstation to the database
 * If res.locals.rollerstation is there, it's an update otherwise
 * this middleware creates an entity
 * Redirects to /rollerstation after success
 */
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

        //TODO check types
        // ????

        res.locals.rollerstation.save(err => {
            if (err) {
                return next(err);
            }
            return res.redirect('/rollerstation');
        });
    };
};
