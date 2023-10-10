
const expect = require('chai').expect;
const mongoose = require('mongoose');
const RollerStation = require('../../../../models/rollerstation'); // Import Roller station model
const Roller = require('../../../../models/roller'); // Import Roller model
const getRollerStationMiddleware = require('../../../../middleware/rollerstation/getRollerStationMW'); // Import your middleware module

describe('Get Roller Station Middleware', function () {
    let objectrepository;

    before(async function () {
        objectrepository = { RollerStationModel: RollerStation, RollerModel: Roller };
        await mongoose.connect('mongodb+srv://Bendzsi:alma@cluster0.eh2vu4q.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    after(async function () {
        await mongoose.disconnect();
    });

    it('should set the roller station on req.locals if a valid Roller Station ID is provided', async function () {
        const rollerStation = new RollerStation({ name: 'My Roller Station' });
        await rollerStation.save();

        const req = { params: { rollerstationid: rollerStation._id } };
        const res = {};

        const middleware = getRollerStationMiddleware(objectrepository);

        await middleware(req, res, () => {});

        expect(req.locals.rollerstation).to.deep.equal(rollerStation);
    });

    it('should call next with an error if a non-existent Roller Station ID is provided', async function () {
        const req = { params: { rollerstationid: 'nonexistent-id' } };
        const res = {};
        const next = err => {
            expect(err).to.be.instanceOf(Error);
        };

        const middleware = getRollerStationMiddleware(objectrepository);

        await middleware(req, res, next);
    });

    it('should call next with an error if an invalid Roller Station ID is provided', async function () {
        const req = { params: { rollerstationid: 'invalid-id' } };
        const res = {};
        const next = err => {
            expect(err).to.be.instanceOf(Error);
        };

        const middleware = getRollerStationMiddleware(objectrepository);

        await middleware(req, res, next);
    });

    it('should call next with an error if a Roller Station ID is not provided', async function () {
        const req = {};
        const res = {};
        const next = err => {
            expect(err).to.be.instanceOf(Error);
        };

        const middleware = getRollerStationMiddleware(objectrepository);

        await middleware(req, res, next);
    });
});



