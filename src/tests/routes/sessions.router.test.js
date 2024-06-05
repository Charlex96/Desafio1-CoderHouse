
import chai from 'chai';
import supertest from 'supertest';

const { expect } = chai;
const request = supertest("http://localhost:8080");

describe('/api/sessions tests', () => {
    it('should login a user successfully', async () => {
        const loginMock = {
            email: 'test@example.com',
            password: 'password'
        };
        const { _body, statusCode } = await request.post('/api/sessions/login').send(loginMock);
        expect(statusCode).to.be.equal(200);
        expect(_body).to.have.property('token');
    });

    it('should return 400 for invalid login credentials', async () => {
        const invalidLoginMock = {
            email: 'test@example.com',
            password: 'wrongpassword'
        };
        const { statusCode } = await request.post('/api/sessions/login').send(invalidLoginMock);
        expect(statusCode).to.be.equal(400);
    });

    it('should logout a user successfully', async () => {
        const { statusCode } = await request.post('/api/sessions/logout');
        expect(statusCode).to.be.equal(200);
    });

});
