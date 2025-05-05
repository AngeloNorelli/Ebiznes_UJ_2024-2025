describe('Testy API - /categories', () => {
  let categoryId;
  let productId;

  before(() => {
    cy.request('POST', 'http://localhost:8080/products', {
      name: 'Testowy Produkt',
      price: 100,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('ID');
      expect(response.body.name).to.eq('Testowy Produkt');
      expect(response.body.price).to.eq(100);
      productId = response.body.ID;
    });
  });

  it('Powinien dodać nową kategorię', () => {
    cy.request('POST', 'http://localhost:8080/categories', {
      name: 'Nowa Kategoria',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('ID');
      expect(response.body.name).to.eq('Nowa Kategoria');

      categoryId = response.body.ID;
    });
  });

  it('Powinien zwrócić listę kategorii', () => {
    cy.request('GET', 'http://localhost:8080/categories').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('Powinien zwrócić kategorię po ID', () => {
    cy.request('GET', `http://localhost:8080/categories/${categoryId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('ID', categoryId);
      expect(response.body.name).to.eq('Nowa Kategoria');
    });
  });

  it('Powinien zwrócić error dla kategorii z błędnym ID', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/categories/invalid_id',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property('message', 'Category not found');
    });
  });

  it('Powinien dodać produkt do kategorii', () => {
    cy.request('POST', `http://localhost:8080/categories/${categoryId}/products`, {
      product_id: productId,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('ID');
    });

    cy.request('GET', `http://localhost:8080/categories/${categoryId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.products).to.be.an('array');
      expect(response.body.products[0]).to.have.property('ID', productId + 1);
    });
  });

  it('Powinien usunąć produkt z kategorii', () => {
    cy.request('DELETE', `http://localhost:8080/categories/${categoryId}/products/${productId + 1}`).then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.request('GET', `http://localhost:8080/categories/${categoryId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.products).to.be.an('array').and.to.have.length(0);
    });
  });
});