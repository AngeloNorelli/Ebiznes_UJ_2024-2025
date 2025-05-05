describe('Testy API - /products', () => {
  let productId;
  it('Powinien dodać nowy produkt', () => {
    cy.request('POST', 'http://localhost:8080/products', {
      name: 'Nowy Produkt',
      price: 100,
      stock: 10,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('ID');
      productId = response.body.ID;
      expect(response.body.name).to.eq('Nowy Produkt');
    });
  });
  
  it('Powinien zwrócić listę produktów', () => {
    cy.request('GET', 'http://localhost:8080/products').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  it('Powinien zwrócić produkt po ID', () => {
    cy.request(`GET`, `http://localhost:8080/products/${productId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('ID', productId);
      expect(response.body).to.have.property('name', 'Nowy Produkt');
    });
  });

  it('Powinien zwrócić error dla produktu z błędnym ID', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/products/invalid_id',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property('message', 'Product not found');
    });
  });

  it('Powinien zaktualizować produkt', () => {
    cy.request('PUT', `http://localhost:8080/products/${productId}`, {
      name: 'Zaktualizowany Produkt',
      price: 150,
      stock: 5,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('ID', productId);
      expect(response.body).to.have.property('name', 'Zaktualizowany Produkt');
    });
  });

  it('Powinien zwrócić produkty po filtrze', () => {
    cy.request('POST', 'http://localhost:8080/products', {
      name: 'Droższy Produkt',
      price: 150,
      stock: 1,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('ID');
      expect(response.body.name).to.eq('Droższy Produkt');
    });

    cy.request('GET', 'http://localhost:8080/products/filtered?min_price=120&max_price=160').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
      expect(response.body[0]).to.have.property('name', 'Droższy Produkt');
    });
  });

  it('Powinien usunąć produkt', () => {
    cy.request('DELETE', `http://localhost:8080/products/${productId}`).then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.request({
      method: 'GET',
      url: `http://localhost:8080/products/${productId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property('message', 'Product not found');
    });
  });
});