/// <reference types="cypress" />

export default context("Net Worth API Endpoint", () => {
  beforeEach(() => {
    cy.fixture("networth.json").as("payload");
  });

  it("should validate the headers", () => {
    cy.get("@payload").then((payload) => {
      cy.request("POST", "http://localhost:3000/api/networth", payload)
        .its("headers")
        .its("content-type")
        .should("include", "application/json");
    });
  });

  it("should validate the status code", () => {
    cy.get("@payload").then((payload) => {
      cy.request("POST", "http://localhost:3000/api/networth", payload)
        .its("status")
        .should("equal", 200);
    });
  });

  it("should validate the response body", () => {
    cy.get("@payload").then((payload) => {
      cy.request("POST", "http://localhost:3000/api/networth", payload)
        .its("body")
        .should("deep.equal", {
          totalAssets: 2120427.0,
          totalLiabilities: 908297.0,
          netWorth: 1212130.0,
        });
    });
  });
});
