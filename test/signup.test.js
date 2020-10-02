import { expect, server, BASE_URL } from './setup'

describe('POST /login', () => {
    it('logins signsup and gets a token', (done) => {
        server
            .post(`${BASE_URL}/signup`)
            .send({
                email: '1@1.com',
                password: '123456',
                confirmPassword: '123456',
                userName: '1',
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                expect(res.status).to.equal(201)
                done()
            })
    })
})
