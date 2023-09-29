// We have to collect the middlewares

const authMW = require('../middleware/auth/authMW');
const checkPassMW = require('../middleware/auth/checkPassMW');
const logoutMW = require('../middleware/auth/logoutMW');
const renderMW = require('../middleware/renderMW');

const getRollerStationsMW = require('../middleware/rollerstation/getRollerStationsMW');
const getRollerStationMW = require('../middleware/rollerstation/getRollerStationMW');
const delRollerStationMW = require('../middleware/rollerstation/delRollerStationMW');
const saveRollerStationMW = require('../middleware/rollerstation/saveRollerStationMW');

const getRollersMW = require('../middleware/roller/getRollersMW');
const getRollerMW = require('../middleware/roller/getRollerMW');
const delRollerMW = require('../middleware/roller/delRollerMW');
const saveRollerMW = require('../middleware/roller/saveRollerMW');

// For the DB
const RollerStationModel = require('../models/rollerstation');
const RollerModel = require('../models/roller');

// Definition of the objectRepooooo
module.exports = function(app) {
    const objRepo = {
        RollerStationModel: RollerStationModel,
        RollerModel: RollerModel
    };

    // Routes:
    app.use(
        '/rollerstation/new',
        authMW(objRepo),
        saveRollerStationMW(objRepo),
        renderMW(objRepo, 'rollerstationeditnew')
    );
    app.use(
        '/roller/edit/:rollerstationid',
        authMW(objRepo),
        getRollerStationMW(objRepo),
        saveRollerStationMW(objRepo),
        renderMW(objRepo, 'rollerstationeditnew')
    );
    app.get(
        '/rollerstation/del/:rollerstationid',
        authMW(objRepo),
        getRollerStationMW(objRepo),
        delRollerStationMW(objRepo)
    );
    app.get(
        '/rollerstation',
        authMW(objRepo),
        getRollerStationsMW(objRepo),
        renderMW(objRepo, 'rollerstationlista')
    );

    app.use(
        '/roller/:rollerstationid/new',
        authMW(objRepo),
        getRollerStationMW(objRepo),
        saveRollerMW(objRepo),
        renderMW(objRepo, 'rollereditnew')
    );
    app.use(
        '/roller/:rollerstationid/edit/:rollerid',
        authMW(objRepo),
        getRollerStationMW(objRepo),
        getRollerMW(objRepo),
        saveRollerMW(objRepo),
        renderMW(objRepo, 'rollereditnew')
    );
    app.get(
        '/roller/:rollerstationid/del/:rollerid',
        authMW(objRepo),
        getRollerStationMW(objRepo),
        getRollerMW(objRepo),
        delRollerMW(objRepo),
        renderMW(objRepo, 'rollereditnew')
    );
    app.get(
        '/roller/:rollerstationid',
        authMW(objRepo),
        getRollerStationMW(objRepo),
        getRollersMW(objRepo),
        renderMW(objRepo, 'rollersofrollerstation')
    );

    app.use('/logout', 
    logoutMW(objRepo)
    );
};