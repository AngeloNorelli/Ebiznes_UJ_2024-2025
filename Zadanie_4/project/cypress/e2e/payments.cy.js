describe('Testy API - /payments', () => {
  let productId;

  before(() => {
    cy.request('POST', 'http://localhost:8080/products', {
      name: 'Testowy Produkt',
      price: 100,
      stock: 10,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('ID');
      expect(response.body.name).to.eq('Testowy Produkt');
      expect(response.body.price).to.eq(100);
      productId = response.body.ID;
    });  
  });

  it('Powinie dodać nową płatność', () => {
    cy.request('POST', 'http://localhost:8080/payments', {
      amount: 100,
      method: 'credit_card',
      items: [
        {
          product_id: productId,
          quantity: 1,
        },
      ],
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('message', 'Payment created successfully');
      expect(response.body).to.have.property('cart');
      expect(response.body).to.have.property('payment');
    });
  });

  it('Powinien zwrócić listę płatności', () => {
    cy.request('GET', 'http://localhost:8080/payments').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });
});