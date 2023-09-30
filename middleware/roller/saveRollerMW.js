
// Using POST params update or save a roller to the database
// If res.locals.roller is there, it's an update otherwise this middleware creates an entity
// Redirects to /roller/:rollerstation_id after success

const Roller = require('../../models/roller');
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const RollerModel = requireOption(objectrepository, 'RollerModel');

    return function(req, res, next) {
        if (
            typeof req.body.type === 'undefined' ||
            typeof req.body.id === 'undefined' ||
            typeof req.body.brand === 'undefined' ||
            typeof res.locals.price === 'undefined' ||
            typeof res.locals.available === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.roller === 'undefined') {
            res.locals.roller = new RollerModel();
        }

        if (Number.isNaN(parseInt(req.body.price, 10))) {
            return next(new Error('Az árat egy számmal kell megadni!'));
        }
        
        res.locals.roller.type = req.body.type;
        res.locals.roller.id = req.body.id;
        res.locals.roller.brand = req.body.brand;
        res.locals.roller.price = parseInt(req.body.price, 10);
        res.locals.roller.available = req.body.available;
        res.locals.roller._rental = res.locals.nagymama._id;

        res.locals.roller.save(err => {
            if (err) {
                return next(err);
            }
            return res.redirect(`/roller/${res.locals.rollerstation._id}`);
        });
    };
};