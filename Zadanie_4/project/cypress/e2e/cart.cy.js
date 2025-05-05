describe('Testy API - /cart', () => {
  let cartId;
  let productId;
  let itemId;
  
  before(() => {
    cy.request('POST', 'http://localhost:8080/products', {
      name: 'Testowy Produkt',
      price: 100,
      stock: 10,
    }).then((response) => {
      productId = response.body.ID;
    });
  });

  it('Powinien stworzyć nowy koszyk', () => {
    cy.request('POST', 'http://localhost:8080/carts').then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('ID');
      cartId = response.body.ID;
    });
  });

  it('Powinien zwrócić listę produktów w koszyku', () => {
    cy.request('GET', `http://localhost:8080/carts/${cartId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('ID', cartId);
    });
  });

  it('Powinien zwrócić error dla koszyka z błędnym ID', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/carts/invalid_id',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property('message', 'Cart not found');
    });
  });

  it('Powinien dodać produkt do koszyka', () => {
    cy.request('POST', `http://localhost:8080/carts/${cartId}/products`, {
      product_id: productId,
      quantity: 2,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('ID', cartId);
    });

    cy.request('GET', `http://localhost:8080/carts/${cartId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.items).to.be.an('array');
      expect(response.body.items.length).to.be.greaterThan(0);
      expect(response.body.items[0]).to.have.property('ID');
      expect(response.body.items[0]).to.have.property('product_id', productId);
      expect(response.body.items[0]).to.have.property('quantity', 2);

      itemId = response.body.items[0].ID;
    });
  });

  it('Powinien zaktualizować ilość produktu w koszyku', () => {
    cy.request('PUT', `http://localhost:8080/carts/${cartId}/items/${itemId}`, {
      product_id: productId,
      quantity: 5,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('ID', cartId);
    });

    cy.request('GET', `http://localhost:8080/carts/${cartId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.items).to.be.an('array');
      expect(response.body.items.length).to.be.greaterThan(0);
      expect(response.body.items[0]).to.have.property('product_id', productId);
      expect(response.body.items[0]).to.have.property('quantity', 5);
    });
  });
});