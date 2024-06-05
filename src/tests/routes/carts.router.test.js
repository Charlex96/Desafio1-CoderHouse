
import chai from 'chai';
import supertest from 'supertest';

const { expect } = chai;
const request = supertest("http://localhost:8080");

describe('/api/carts tests', () => {
    before(() => {
        this.cartMock = {
            userId: 'user1',
            products: []
        };
    });

    it('should create a cart successfully', async () => {
        const { _body, statusCode } = await request.post('/api/carts').send(this.cartMock);
        expect(_body).to.exist;
        expect(statusCode).to.be.equal(201);
        expect(_body.payload).to.have.property('_id');
    });

    it('should return all carts with status and payload as array', async () => {
        const response = await request.get('/api/carts');
        expect(response).to.have.property('status');
        expect(response._body).to.have.property('payload');
        expect(response._body.payload).to.be.a('Array');
    });

    it('should add a product to the cart successfully', async () => {
        const cartResponse = await request.post('/api/carts').send(this.cartMock);
        const cartId = cartResponse._body.payload._id;
        const productMock = {
            productId: 'product1',
            quantity: 1
        };

        const { _body, statusCode } = await request.put(`/api/carts/${cartId}/products/product1`).send(productMock);
        expect(statusCode).to.be.equal(200);
        expect(_body.payload.products).to.have.lengthOf(1);
    });

});
