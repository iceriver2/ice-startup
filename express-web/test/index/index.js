const { request, test, app } = require('../index');
const assert = require('assert');

test.before(() => {});

test.describe('visit /', () => {
    test.it('should ok', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
});

test.after(() => {});
