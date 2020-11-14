/// <reference types="cypress" />

export default context("Exchange API Endpoint", () => {
  beforeEach(() => {
    cy.request("http://localhost:3000/api/exchange").as("rate");
  });

  it("should validate the header", () => {
    cy.get("@rate")
      .its("headers")
      .its("content-type")
      .should("include", "application/json");
  });

  it("should validate the status code", () => {
    cy.get("@rate").its("status").should("equal", 200);
  });

  it("should validate the payload keys", () => {
    cy.get("@rate")
      .its("body")
      .should("include.keys", ["rates", "base", "date"])
      .its("rates")
      .should("include.keys", [
        "CAD",
        "USD",
        "EUR",
        "JPY",
        "CNY",
        "HKD",
        "MXN",
        "GBP",
        "CHF",
        "INR",
      ]);
  });
});
