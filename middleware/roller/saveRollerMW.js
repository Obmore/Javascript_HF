// Using POST params update or save a roller to the database
// If res.locals.roller is there, it's an update otherwise this middleware creates an entity
// Redirects to /rollerofstation/:rollerstation_id after success

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const RollerModel = requireOption(objectrepository, 'RollerModel');

    return function(req, res, next) {
        if (
            typeof req.body.type === 'undefined' ||
            typeof req.body.id === 'undefined' ||
            typeof req.body.brand === 'undefined' ||
            typeof req.body.price === 'undefined' ||
            typeof req.body.available === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.roller === 'undefined') {
            res.locals.roller = new RollerModel();
        }

        if (Number.isNaN(parseInt(req.body.id, 10))) {
            res.locals.error = 'Invalid datas';
            return next();
        }
        if (Number.isNaN(parseInt(req.body.price, 10))) {
            res.locals.error = 'Invalid datas';
            return next();
        }

        res.locals.roller.type = req.body.type;
        res.locals.roller.id = parseInt(req.body.id, 10);
        res.locals.roller.brand = req.body.brand;
        res.locals.roller.price = parseInt(req.body.price, 10);
        if (req.body.available == 'on') {
            res.locals.roller.available = true;
        } else {
            res.locals.roller.available = false;
        }
        res.locals.roller._rental = res.locals.rollerstation._id;
        
        res.locals.roller
            .save()
            .then(() => {
                return res.redirect(`/roller/${res.locals.rollerstation._id}`);
            })
            .catch(Error => {
                res.locals.error = 'Invalid datas';
                return next();
            });
    };
};






