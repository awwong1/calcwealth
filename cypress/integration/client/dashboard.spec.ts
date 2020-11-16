/// <reference types="cypress" />

export default context("Dashboard User Interface", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000").as("index");
  });

  it("should contain the header string", () => {
    cy.get("@index").contains("Tracking your Net Worth");
  });

  it("should update the selected currency", () => {
    cy.get("@index")
      .get("select")
      .select("USD")
      .contains("US Dollar")
      .get("select")
      .select("HKD");
    cy.get("@index").contains("HK$");
  });

  it("should update on asset change", () => {
    cy.get("@index")
      .get("input") // get input element
      .first() // get first line item `chequing`
      .focus() // focus the element (editable Component switch)
      .focused() // allow switch to new focused, editable element
      .type("123.45"); // add 123.45 string

    cy.get("@index") // from DOM root
      .get("dl") // get all the stat groups
      .first() // get the Net Worth stat group
      .click() // Unfocus the input field
      .contains("Net Worth") // Make sure it is the netWorth field
      .next()
      .contains("CA$123.45"); // description list term contains currency formatted value

    cy.get("@index") // from DOM root
      .get("dl") // get all the stat groups
      .eq(1) // get the Total Assets stat group
      .contains("Total Assets") // Make sure it is the total assets field
      .next()
      .contains("CA$123.45"); // description list term contains currency formatted value

    cy.get("@index") // from DOM root
      .get("dl") // get all the stat groups
      .eq(2) // get the Total liabilities stat group
      .contains("Total Liabilities") // Make sure it is the total liabilities field
      .next()
      .contains("CA$0.00"); // description list term contains currency formatted value
  });

  it("should update on liability change", () => {
    cy.get("@index")
      .get("input") // get input element
      .last() // get last line item `investmentLoan`
      .focus() // focus the element (editable Component switch)
      .focused() // allow switch to new focused, editable element
      .type("98765"); // add 123.45 string

    cy.get("@index") // from DOM root
      .get("dl") // get all the stat groups
      .first() // get the Net Worth stat group
      .click() // Unfocus the input field
      .contains("Net Worth") // Make sure it is the netWorth field
      .next()
      .contains("-CA$98,765.00"); // description list term contains currency formatted value

    cy.get("@index") // from DOM root
      .get("dl") // get all the stat groups
      .eq(1) // get the Total Assets stat group
      .contains("Total Assets") // Make sure it is the total assets field
      .next()
      .contains("CA$0.00"); // description list term contains currency formatted value

    cy.get("@index") // from DOM root
      .get("dl") // get all the stat groups
      .eq(2) // get the Total liabilities stat group
      .contains("Total Liabilities") // Make sure it is the total liabilities field
      .next()
      .contains("CA$98,765.00"); // description list term contains currency formatted value
  });
});
