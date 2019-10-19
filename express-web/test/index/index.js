const { request, test, app } = require('../index');
const assert = require('assert');

test.before(() => {});

test.describe('index/index tests', () => {
    test.it('visit / should be ok', (done) => {
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
