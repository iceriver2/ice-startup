const { request, test, app } = require('../index');
const assert = require('assert');

test.before(() => {});

test.describe('get index/index', () => {
    test.it('get / correct', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
    test.it('post / wrong', (done) => {
        request(app)
            .post('/')
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
});

test.after(() => {});
