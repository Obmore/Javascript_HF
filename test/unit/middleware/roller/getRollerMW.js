// Load a roller from the database

const expect = require('chai').expect;
const mongoose = require('mongoose');
const Roller = require('../../../../models/roller'); // Import Roller model
const rollerMiddleware = require('../../../../middleware/roller/getRollerMW'); // Import your middleware module


describe('Roller Middleware', function () {
    let objectrepository;

    before(function (done) { // Hozzáadva a "done" callback-et
        mongoose.connect('mongodb+srv://Bendzsi:alma@cluster0.eh2vu4q.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            objectrepository = { RollerModel: Roller };
            done(); // A csatlakozás befejezése után hívjuk meg a "done()" függvényt
        }).catch(err => done(err)); // Hibakezelés a "done()" callback-el
    });

    after(function (done) { // Hozzáadva a "done" callback-et
        mongoose.disconnect().then(() => {
            done(); // A lecsatlakozás befejezése után hívjuk meg a "done()" függvényt
        }).catch(err => done(err)); // Hibakezelés a "done()" callback-el
    });

    it('should call next with an error if roller is not found', function (done) {
        const req = { params: { rollerid: 'nonexistent-id' } };
        const res = {};
        const next = err => {
            expect(err).to.be.instanceOf(Error);
            done();
        };

        const middleware = rollerMiddleware(objectrepository);

        middleware(req, res, next);
    });
});









