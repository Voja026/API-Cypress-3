let datas = require('../../fixtures/data');

    datas.forEach(data => {
    
        describe(`Test of TasteDive API ${data.inquiry}`, () => {
            beforeEach(() => {
                cy.requestApi(data.query.q, data.query.type, data.query.limit).then(response => {
                    cy.wrap(response).as('response')
                    })
                })
            
            it(`have ${data.expected.status} status`, () => {
                cy.get('@response').its('status').should('eq', 200)
            })
    
            it(`Response have lenght ${data.query.q.length}`, () => {
                cy.get("@response").then(response => {
                    expect(response.body).has.property('Similar')
                    expect(response.body.Similar)
                        .has.property("Info")
                        .is.an("array")
                        .has.lengthOf(data.query.q.length);
                    })
                })
                it(`has ${data.expected.format} format`, () => {
                    cy.get("@response")
                        .its("headers")
                        .its('content-type').should('include', data.expected.format);
                    });
                })
            })
        