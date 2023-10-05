// Removes a roller from the database, the entity used here is: res.locals.roller
// Redirects to /rollerofstation/:rollerstation_id after delete

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const RollerModel = requireOption(objectrepository, 'RollerModel');

    return function(req, res, next) {
        if (typeof res.locals.roller === 'undefined') {
            return next();
        }

        RollerModel.findOneAndDelete(res.locals.roller)
            .then(() => {
                return res.redirect(`/roller/${res.locals.rollerstation._id}`);
            })
            .catch(err => {
                return next(err);
            });
    };
};
