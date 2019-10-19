const { request, test, app } = require('../index');
const assert = require('assert');
const mod = require('../../module/demo/route/demo');

test.before(() => {});


test.describe('get /demo/demo/', () => {
    test.it('get /demo/demo/ correct', (done) => {
        request(app)
            .get('/demo/demo/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});

test.describe('get /demo/demo/hello', () => {
    test.it('get /demo/demo/hello correct', (done) => {
        request(app)
            .get('/demo/demo/')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});

test.describe('post /demo/demo/foo', () => {
    test.it('post /demo/demo/foo?id=1 correct', (done) => {
        request(app)
            .post('/demo/demo/foo?id=1')
            .send('name', 'hello')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const obj = JSON.parse(res.text);
                if (Object.keys(obj).includes('id') && Object.keys(obj).includes('name')) {
                    done();
                } else {
                    done(new Error('key id not exists'));
                }
            });
    });
});


test.after(() => {});
