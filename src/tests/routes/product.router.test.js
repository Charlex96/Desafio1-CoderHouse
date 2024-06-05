
import chai from 'chai';
import supertest from 'supertest';

const { expect } = chai;
const request = supertest("http://localhost:8080");

describe('/api/products tests', () => {
    before(() => {
        this.productMock = {
            name: 'Product1',
            description: 'Description1',
            price: 100,
            code: 'P001',
            stock: 10
        };
    });

    it('should create a product successfully', async () => {
        const { _body, statusCode } = await request.post('/api/products').send(this.productMock);
        expect(_body).to.exist;
        expect(statusCode).to.be.equal(201);
        expect(_body.payload).to.have.property('_id');
    });

    it('should return all products with status and payload as array', async () => {
        const response = await request.get('/api/products');
        expect(response).to.have.property('status');
        expect(response._body).to.have.property('payload');
        expect(response._body.payload).to.be.a('Array');
    });

    it('should return 400 when trying to create a product with an existing code', async () => {
        const { statusCode } = await request.post('/api/products').send(this.productMock);
        expect(statusCode).to.be.equal(400);
    });

});
